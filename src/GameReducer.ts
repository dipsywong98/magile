import { NetworkReducer } from 'smnet'
import { GameState } from './GameState'
import { GameAction, GameActionType, PlayCardPayload } from './GameAction'
import { allColors, ICard, ICardColor, ICardType, IDeck, IMode, IPlayCard, IStateMapper } from './types'
import { compose, GameActionTypes, shuffle } from 'gamenet'
import { cardCount } from './constants'
import {
  areCardsOfColor,
  areCardsOfDifferentColor,
  areCardsOfTypeOrMagile,
  basicDamage, buildError,
  getCardColor,
  getCardType,
  hasCardColorNone
} from './utils'

const getFullDeck = (): IDeck => {
  return Object.entries(cardCount).flatMap(([card, count]) => Array(count).fill(card))
}

const withDrawCard: (playerId: number) => IStateMapper = playerId => state => {
  if (state.playerDeck[playerId].length >= state.playerHp[playerId]) {
    throw buildError('cannotDraw$playerAlreadyHas$countCards', {
      player: state.players[playerId],
      count: `${state.playerHp[playerId]}`
    })
  }
  const card = state.drawDeck[0]
  if (card === undefined) {
    return withDrawCard(playerId)({ ...state, drawDeck: shuffle(state.trashDeck), trashDeck: [] })
  } else {
    const hand = [...state.playerDeck[playerId], card]
    const playerDeck = [...state.playerDeck]
    playerDeck[playerId] = hand
    if (hand.length < state.playerHp[playerId]) {
      return withDrawCard(playerId)({ ...state, playerDeck, drawDeck: state.drawDeck.slice(1) })
    } else {
      return { ...state, playerDeck, drawDeck: state.drawDeck.slice(1) }
    }
  }
}

const withEnsureHp1CardNotFunctionCard: (playerId: number) => IStateMapper = playerId => state => {
  if (state.playerHp[playerId] === 1) {
    const cardType = getCardType(state.playerDeck[playerId][0])
    if (state.playerDeck[playerId].length === 1 && cardType !== ICardType.MAGE && cardType !== ICardType.MISSILE)
      return compose(
        withEnsureHp1CardNotFunctionCard(playerId),
        withDrawCard(playerId),
        withDiscardCard({ cards: state.playerDeck[playerId] }, playerId)
      )(state)
  }
  return state
}

const withInitGame: IStateMapper = (prevState: GameState) => {
  prevState = {
    ...prevState,
    turn: 0,
    direction: 1,
    points: 0,
    drawDeck: [],
    stage: [],
    mode: null,
    trashDeck: [],
    playerDeck: [],
    playerHp: [],
    logs: [],
    lastAction: null,
    ignited: false,
    duel: false,
    winner: null
  }
  const fullDeck = getFullDeck()
  prevState.drawDeck = shuffle(fullDeck)
  for (let id = 0; id < prevState.players.length; id++) {
    prevState.playerDeck[id] = []
    prevState.playerHp[id] = 7
    prevState = withDrawCard(id)(prevState)
  }
  return { ...prevState }
}

const withDiscardCard: IPlayCard = ({ cards }, playerId) => state => {
  const trashDeck = [...state.trashDeck, ...cards]
  const hand = [...state.playerDeck[playerId]]
  cards.forEach((card) => {
    const index = hand.indexOf(card)
    if (index === -1) {
      throw buildError('$playerDoesNotOwnCard$card', { player: state.players[playerId] }, { card })
    }
    hand.splice(index, 1)
  })
  const playerDeck = [...state.playerDeck]
  playerDeck[playerId] = hand
  return { ...state, trashDeck, playerDeck }
}

const withPutToPlayed: IPlayCard = ({ cards }) => (state) => {
  return { ...state, stage: [...state.stage, ...cards] }
}

const withCardNumberValidation: IPlayCard = (_, playerId) => (state) => {
  if (state.playerDeck[playerId].length > state.playerHp[playerId]) {
    throw buildError('playerCardMoreThanHp')
  }
  return state
}

const withCardTypeValidation: IPlayCard = ({ cards }, playerId) => state => {
  if (cards.length === 3) {
    if (cards.map(card => getCardColor(card)).includes(ICardColor.NONE)) {
      throw buildError('cannotMixIgniteAngelWithMagiles')
    }
    if (state.duel) {
      if (cards.map(card => getCardType(card)).includes(ICardType.MAGILE)) {
        throw buildError('cannotPlayFunctionDuringDuel')
      }
    }
  } else if (cards.length === 1) {
    if (state.duel) {
      const cardType = getCardType(cards[0])
      if ([ICardType.MAGILE, ICardType.IGNITE, ICardType.ANGEL_GUARD].includes(cardType)) {
        throw buildError('cannotPlayFunctionDuringDuel')
      }
    }
  } else {
    throw buildError('canPlayOnly1Or3Cards')
  }
  return state
}

const withFirstPlayValidation: IPlayCard = ({ cards, mode }, playerId) => (state) => {
  if (state.stage.length === 0) {
    if (mode === null || mode === undefined) {
      throw buildError('specifyHomoOrHeteroAtFirstTransfer')
    }
    if (mode === IMode.HOMO && state.playerHp[(playerId + 1) % state.players.length] === 1) {
      throw buildError('canOnlyDoHeteroWhenNextIs1hp')
    }
    if (cards.length !== 1) {
      throw buildError('canOnlyPlay1CardWhenAtFirstTransfer')
    }
    if (getCardType(cards[0]) !== ICardType.MAGE && getCardType(cards[0]) !== ICardType.MISSILE) {
      throw buildError('canOnlyPlayNonFunctionWhenAtFirstTransfer')
    }
    return { ...state, mode }
  }
  return state
}

const withPlayHomo: IPlayCard = ({ cards }) => state => {
  if (state.mode === IMode.HOMO && !state.ignited) {
    if (state.stage.length === 0) {
      return { ...state }
    }
    const cardColor = getCardColor(cards[0])
    if (cardColor !== ICardColor.NONE) {
      if (!areCardsOfColor(cards, getCardColor(state.stage[0]))) {
        throw buildError('canOnlyPlay$colorInThisHomoTransfer', {}, { color: cardColor })
      }
      return { ...state }
    }
  }
  return state
}

const withPlayHetero: IPlayCard = ({ cards }) => state => {
  if (state.mode === IMode.HETERO && !state.ignited) {
    if (state.stage.length === 0) {
      return { ...state }
    }
    if (!hasCardColorNone(cards)) {
      const type = getCardType(state.stage[0])
      if (!areCardsOfDifferentColor([...state.stage, ...cards])) {
        const stageColors = state.stage.map(card => getCardColor(card))
        const colorsPlayed = cards.map(card => getCardColor(card)).filter(color => stageColors.includes(color))
        const colorsCanPlay = allColors.filter(color => !stageColors.includes(color))
        throw buildError('$colorsPlayedAnd$colorsCanPlayInThisHetero$typeTransfer', {}, {
          type,
          type2: type,
          colorsPlayed,
          colorsCanPlay
        })
      } else {
        if (!areCardsOfTypeOrMagile(cards, type)) {
          if (state.duel) {
            throw buildError('youMayPlay$typeOnly', {}, {type})
          } else {
            throw buildError('youMayPlay$typeOrMagileOnly', {}, {type})
          }
        } else {
          return { ...state }
        }
      }
    }
  }
  return state
}

const withPlayIgnite: IPlayCard = ({ cards }) => state => {
  if (cards.length === 1) {
    const card = cards[0]
    if (card === ICard.HETERO_IGNITE) {
      if (state.mode === IMode.HETERO) {
        return { ...state, ignited: true }
      } else {
        throw buildError('cannotPlayHeteroIgniteDuringHomoTransfer')
      }
    }
    if (card === ICard.HOMO_IGNITE) {
      if (state.mode === IMode.HOMO) {
        return { ...state, ignited: true }
      } else {
        throw buildError('cannotPlayHomoIgniteDuringHeteroTransfer')
      }
    }
  }
  return state
}

const withPlayAngleGuard: IPlayCard = ({ cards }) => state => {
  if (cards.length === 1) {
    if (cards[0] === ICard.ANGEL_GUARD) {
      return { ...state }
    }
  }
  return state
}

const withStateChangedValidation = (prevState: GameState): IPlayCard => () => state => {
  if (prevState === state) {
    throw buildError('invalidMove')
  }
  return state
}

export const withIncrementTurn: IStateMapper = prevState => {
  const nextPlayerId = (prevState.turn + prevState.players.length + prevState.direction) % prevState.players.length
  return { ...prevState, turn: nextPlayerId }
}

const withPlayCard: (playerId: number, payload: PlayCardPayload) => IStateMapper = (playerId, payload) => prevState => {
  if (prevState.turn !== playerId) {
    throw buildError('notYourTurn')
  }
  const nextState = compose(
    withCheckWin,
    withCheckHit,
    withIncrementTurn,
    withEnsureHp1CardNotFunctionCard(playerId),
    withDrawCard(playerId),
    ...[
      withPutToPlayed,
      withDiscardCard,
      withStateChangedValidation(prevState),
      withPlayAngleGuard,
      withPlayIgnite,
      withPlayHetero,
      withPlayHomo,
      withCardTypeValidation,
      withFirstPlayValidation,
      withCardNumberValidation
    ].map(playCard => playCard(payload, playerId))
  )(prevState)
  return { ...nextState, lastAction: { ...payload, playerId } }
}

export const withCheckWin: IStateMapper = state => {
  const playerIdLose = state.playerHp.findIndex(hp => hp <= 0)
  if (playerIdLose !== -1) {
    return { ...state, winner: playerIdLose }
  }
  return state
}

export const withCheckHit: IStateMapper = prevState => {
  if (ableToResponse(prevState)) {
    return prevState
  } else {
    return withHit(prevState)
  }
}

const ableToResponse = (state: GameState): boolean => {
  const { ignited, duel, turn, mode } = state
  const hand = state.playerDeck[turn]
  if (!duel && !!hand.find(card => card === ICard.ANGEL_GUARD)) {
    return true
  }
  if (mode === IMode.HETERO) {
    if (!duel && !!hand.find(card => card === ICard.HETERO_IGNITE)) {
      return true
    }
    if (ignited) {
      return hand.includes(ICard.HETERO_IGNITE)
    }
    return hand
      .filter(card => getCardColor(card) !== ICardColor.NONE)
      .filter(card => duel ? getCardType(card) !== ICardType.MAGILE : true)
      .filter(card => areCardsOfTypeOrMagile([card], getCardType(state.stage[0])))
      .filter(card => !state.stage.map(card => getCardColor(card)).includes(getCardColor(card))).length > 0
  } else {
    if (!duel && !!hand.find(card => card === ICard.HOMO_IGNITE)) {
      return true
    }
    if (ignited) {
      return hand.includes(ICard.HOMO_IGNITE)
    }
    return hand
      .filter(card => getCardColor(card) === getCardColor(state.stage[0]))
      .length > 0
  }
}

const withHit = (state: GameState): GameState => {
  if (state.mode !== null) {
    const { turn } = state
    const igniteCount = state.stage.filter(card => getCardType(card) === ICardType.IGNITE).length
    const basic = basicDamage(state.stage.filter(card => getCardColor(card) !== ICardColor.NONE).length, state.mode)
    const hit = basic + igniteCount + (state.duel ? 1 : 0)
    const playerHp = [...state.playerHp]
    playerHp[turn] -= hit
    return {
      ...state,
      playerHp
    }
  }
  return state
}

export const withLog: (log: string) => IStateMapper = log => prevState => {
  return { ...prevState, logs: [...prevState.logs, log] }
}

const withCheckDiscardToHp: IPlayCard = (payload, playerId) => state => {
  if (state.playerDeck[playerId].length - payload.cards.length !== state.playerHp[playerId]) {
    const count = `${state.playerDeck[playerId].length - state.playerHp[playerId]}`
    throw buildError('shouldDiscard$countCards', {count})
  }
  return state
}

const withClearStage: IStateMapper = state => {
  return {
    ...state,
    stage: [],
    trashDeck: [...state.stage],
    lastAction: null,
    ignited: false,
    duel: state.duel || state.playerHp[state.turn] <= 3,
    mode: null
  }
}

export const GameReducer: NetworkReducer<GameState, GameAction> = (prevState, action) => {
  const peerId = action.peerId
  if (peerId === undefined) {
    throw new Error('Expect peerId in action')
  }
  const playerId = (): number => {
    const id = prevState.nameDict[prevState.members[peerId]]
    if (id === undefined) {
      throw new Error('game not started')
    }
    return id
  }
  switch (action.type) {
    case GameActionTypes.START:
      return withInitGame(prevState)
    case GameActionType.PLAY_CARD:
      return withPlayCard(playerId(), action.payload)(JSON.parse(JSON.stringify(prevState)))
    case GameActionType.DISCARD_CARD:
      return compose(withClearStage, ...[withDiscardCard, withCheckDiscardToHp].map(step => step(action.payload, playerId())))(JSON.parse(JSON.stringify(prevState)))
    case GameActionType.TAKE_HIT:
      return withCheckWin(withHit(prevState))
    case GameActionType.END:
      return { ...prevState, started: false, ready: {} }
  }
  return prevState
}
