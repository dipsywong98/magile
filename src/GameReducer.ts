import { NetworkReducer } from 'smnet'
import { GameState } from './GameState'
import { GameAction, GameActionType, PlayCardPayload } from './GameAction'
import { ICard, ICardColor, ICardType, IDeck, IMode, IPlayCard, IStateMapper } from './types'
import { compose, GameActionTypes, shuffle } from 'gamenet'
import { cardCount } from './constants'
import {
  areCardsOfColor,
  areCardsOfDifferentColor,
  basicDamage,
  getCardColor,
  getCardType,
  hasCardColorNone
} from './utils'

const getFullDeck = (): IDeck => {
  return Object.entries(cardCount).flatMap(([card, count]) => Array(count).fill(card))
}

const withDrawCard: (playerId: number) => IStateMapper = playerId => state => {
  if (state.playerDeck[playerId].length >= state.playerHp[playerId]) {
    throw new Error(`cannot draw, ${state.players[playerId]} already has ${state.playerHp[playerId]} cards`)
  }
  const card = state.drawDeck[0]
  if (card === undefined) {
    return withDrawCard(playerId)({ ...state, drawDeck: shuffle(state.trashDeck), trashDeck: [] })
  } else {
    const hand = [...state.playerDeck[playerId], card]
    const playerDeck = [...state.playerDeck]
    playerDeck[playerId] = hand
    console.log('cmp', hand.length, state.playerHp[playerId], playerDeck)
    if (hand.length < state.playerHp[playerId]) {
      return withDrawCard(playerId)({ ...state, playerDeck, drawDeck: state.drawDeck.slice(1) })
    } else {
      return { ...state, playerDeck, drawDeck: state.drawDeck.slice(1) }
    }
  }
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
    duel: false
  }
  console.log('1')
  const fullDeck = getFullDeck()
  console.log('2', fullDeck)
  prevState.drawDeck = shuffle(fullDeck)
  console.log('3', prevState.drawDeck)
  for (let id = 0; id < prevState.players.length; id++) {
    prevState.playerDeck[id] = []
    prevState.playerHp[id] = 7
    console.log('4', id)
    prevState = withDrawCard(id)(prevState)
  }
  console.log(prevState)
  return { ...prevState }
}

const withDiscardCard: IPlayCard = ({ cards }, playerId) => state => {
  const trashDeck = [...state.trashDeck, ...cards]
  const hand = [...state.playerDeck[playerId]]
  cards.forEach((card) => {
    const index = hand.indexOf(card)
    if (index === -1) {
      throw new Error(`${state.players[playerId]} doesnt own card ${card}`)
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
    throw new Error(`Player deck amount is greater than his hp, please discard`)
  }
  return state
}

const withFirstPlayValidation: IPlayCard = ({ cards, mode }, playerId) => (state) => {
  if (state.stage.length === 0) {
    if (mode === null || mode === undefined) {
      throw new Error('please specify homo transfer or hetero transfer as the first to transfer')
    }
    if (cards.length !== 1) {
      throw new Error('please play one card as the first to transfer')
    }
    if (getCardType(cards[0]) !== ICardType.MAGE && getCardType(cards[0]) !== ICardType.MISSILE) {
      throw new Error('cannot play function type as the first to transfer')
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
    if ((cards.length === 1 || cards.length === 3) && areCardsOfColor(cards, getCardColor(state.stage[0]))) {
      return { ...state }
    }
  }
  console.log('not play homo')
  return state
}

const withPlayHetero: IPlayCard = ({ cards }) => state => {
  if (state.mode === IMode.HETERO && !state.ignited) {
    if (state.stage.length === 0) {
      return { ...state }
    }
    if ((cards.length === 1 || cards.length === 3) && !hasCardColorNone(cards) && areCardsOfDifferentColor([...state.stage, ...cards])) {
      return { ...state }
    }
  }
  return state
}

const withPlayIgnite: IPlayCard = ({ cards }) => state => {
  if (cards.length === 1) {
    const card = cards[0]
    if (card === ICard.HETERO_IGNITE && state.mode === IMode.HETERO) {
      return { ...state, ignited: true }
    }
    if (card === ICard.HOMO_IGNITE && state.mode === IMode.HOMO) {
      return { ...state, ignited: true }
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
    throw new Error('invalid move')
  }
  return state
}

export const withIncrementTurn: IStateMapper = prevState => {
  const nextPlayerId = (prevState.turn + prevState.players.length + prevState.direction) % prevState.players.length
  return { ...prevState, turn: nextPlayerId }
}

const withPlayCard: (playerId: number, payload: PlayCardPayload) => IStateMapper = (playerId, payload) => prevState => {
  if (prevState.turn !== playerId) {
    throw new Error('not your turn')
  }
  const nextState = compose(
    withCheckWin,
    withCheckHit,
    withIncrementTurn,
    withDrawCard(playerId),
    ...[
      withPutToPlayed,
      withDiscardCard,
      withStateChangedValidation(prevState),
      withPlayAngleGuard,
      withPlayIgnite,
      withPlayHetero,
      withPlayHomo,
      withFirstPlayValidation,
      withCardNumberValidation
    ].map(playCard => playCard(payload, playerId))
  )(prevState)
  return { ...nextState, lastAction: { ...payload, playerId } }
}

export const withCheckWin: IStateMapper = state => {
  const playerIdLose = state.playerHp.findIndex(hp => hp === 0)
  if(playerIdLose !== -1) {
    return {...state, winner: playerIdLose}
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
    return hand
      .filter(card => getCardColor(card) !== ICardColor.NONE)
      .filter(card => duel ? getCardType(card) !== ICardType.IGNITE : true)
      .filter(card => !ignited && !state.stage.includes(card)).length > 0
  } else {
    if (!duel && !!hand.find(card => card === ICard.HOMO_IGNITE)) {
      return true
    }
    return hand
      .filter(card => !ignited && getCardColor(card) === getCardColor(state.stage[0]))
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
    return { ...state, playerHp, ignited: false, duel: state.duel || playerHp[turn] <= 3, stage: [], trashDeck: [...state.stage], mode: null }
  }
  return state
}

export const withLog: (log: string) => IStateMapper = log => prevState => {
  return { ...prevState, logs: [...prevState.logs, log] }
}

const withCheckDiscardToHp: IPlayCard = (payload, playerId) => state => {
  if(state.playerDeck[playerId].length - payload.cards.length !== state.playerHp[playerId]) {
    throw new Error(`should discard ${state.playerDeck[playerId].length - state.playerHp[playerId]} cards`)
  }
  return state
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
      console.log(playerId())
      return withPlayCard(playerId(), action.payload)(JSON.parse(JSON.stringify(prevState)))
    case GameActionType.DISCARD_CARD:
      console.log(playerId())
      return compose(...[withDiscardCard, withCheckDiscardToHp].map(step => step(action.payload,playerId())))(JSON.parse(JSON.stringify(prevState)))
      // return withDiscardCard(action.payload,playerId())(JSON.parse(JSON.stringify(prevState)))
    case GameActionType.END:
      return { ...prevState, started: false }
  }
  return prevState
}
