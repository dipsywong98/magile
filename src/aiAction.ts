import { GameState } from './GameState'
import { GameAction, GameActionType } from './GameAction'
import { getCardColor, getCardType, isActionCard, randInt } from './utils'
import { allColors, ICard, ICardColor, ICardType, IDeck, IMode } from './types'

const countByColor = (hand: IDeck, excludeMagile: boolean): Record<ICardColor, number> => {
  return hand
    .map(card => getCardColor(card))
    .filter(color => color !== ICardColor.NONE)
    .filter(color => !excludeMagile || ![ICardColor.LIGHT, ICardColor.DARK].includes(color))
    .reduce<Record<ICardColor, number>>(((previousValue, currentValue) => ({
      ...previousValue,
      [currentValue]: (previousValue[currentValue] ?? 0) + 1
    })), {} as Record<ICardColor, number>)
}

const countByTypeUniqueColor = (hand: IDeck, excludeMagile: boolean): Record<ICardType, number> => {
  return hand
    .filter(card => getCardColor(card) !== ICardColor.NONE)
    .filter((card, k, cards) => cards.indexOf(card) === k)
    .reduce<Record<ICardType, number>>(((record, card) => {
      const type: ICardType = getCardType(card)
      if(type === ICardType.MAGILE && excludeMagile) {
        return record
      }
      if (type === ICardType.MAGILE && !excludeMagile) {
        return {
          [ICardType.MISSILE]: (record[ICardType.MISSILE] ?? 0) + 1,
          [ICardType.MAGE]: (record[ICardType.MAGE] ?? 0) + 1
        } as Record<ICardType, number>
      }
      return {
        ...record,
        [type]: (record[type] ?? 0) + 1
      }
    }), {} as Record<ICardType, number>)
}

const sortDict = <T extends string | number> (dict: Record<T, number>): Array<[T, number]> => {
  return Object.entries<number>(dict).sort((a, b) => (b[1] - a[1])) as Array<[T, number]>
}

const buildPlayCardAction = (cards: ICard[], mode?: IMode): GameAction => {
  return {
    type: GameActionType.PLAY_CARD,
    payload: {
      cards,
      mode
    }
  }
}

const aiDiscard = (state: GameState, turn: number): GameAction => {
  const hand: ICard[] = [...state.playerDeck[turn]]
  const amountToDiscard = hand.length - state.playerHp[turn]
  const discards: ICard[] = []
  if (state.duel) {
    while (discards.length < amountToDiscard && hand.find(isActionCard)) {
      discards.push(hand.splice(hand.findIndex(isActionCard), 1)[0])
    }
  }
  while (discards.length < amountToDiscard) {
    discards.push(hand.splice(randInt(hand.length), 1)[0])
  }
  return {
    type: GameActionType.DISCARD_CARD,
    payload: {
      cards: discards
    }
  }
}

const aiFirstCard = (state: GameState, turn: number): GameAction => {
  const hand: ICard[] = [...state.playerDeck[turn]]
  const byColor: Array<[ICardColor, number]> = sortDict(countByColor(hand, true))
  const byType: Array<[ICardType, number]> = sortDict(countByTypeUniqueColor(hand, state.duel))
  const nextPlayerHp = state.playerHp[(turn + 1) % state.playerHp.length]
  const magileCount = hand.filter(card => getCardType(card) === ICardType.MAGILE).length
  const mode = state.playerHp[turn] !== 1 && nextPlayerHp !== 1 && !(byColor[0][1] + 1 <= byType[0][1] && magileCount < byType[0][1]) ? IMode.HOMO : IMode.HETERO
  if (mode === IMode.HOMO) {
    return buildPlayCardAction([hand.find((card) => getCardColor(card) === byColor[0][0]) as ICard], mode)
  } else {
    return buildPlayCardAction([hand.find((card) => getCardType(card) === byType[0][0]) as ICard], mode)
  }
}

const aiPlayCard = (state: GameState, playerId: number): GameAction => {
  const hand = state.playerDeck[playerId]
  const { mode, ignited, duel } = state
  if (mode === IMode.HOMO) {
    if(!ignited) {
      const stageColor = getCardColor(state.stage[0])
      const cards = hand.filter(card => getCardColor(card) === stageColor)
      if (cards.length > 3) {
        return buildPlayCardAction(cards.slice(0, 3))
      }
      if (cards.length > 0) {
        return buildPlayCardAction([cards[0]])
      }
    }
    if(!duel) {
      const homoIgnite = hand.find(card => card === ICard.HOMO_IGNITE)
      if(homoIgnite) {
        return buildPlayCardAction([homoIgnite])
      }
      const angelGuard = hand.find(card => card === ICard.ANGEL_GUARD)
      if(angelGuard) {
        return buildPlayCardAction([angelGuard])
      }
    }
  } else {
    if(!ignited) {
      const stageColors = state.stage.map(card => getCardColor(card))
      const stageType = getCardType(state.stage[0])
      const playableColors = new Set(allColors.filter(color => !stageColors.includes(color)))
      const cards = hand.filter(card => {
        const cardColor = getCardColor(card)
        if(getCardType(card) === stageType && playableColors.has(cardColor)) {
          playableColors.delete(cardColor)
          return true
        } else {
          return false
        }
      })
      if (cards.length > 3) {
        return buildPlayCardAction(cards.slice(0, 3))
      }
      if (cards.length > 0) {
        return buildPlayCardAction([cards[0]])
      }
    }
    if(!duel) {
      const heteroIgnite = hand.find(card => card === ICard.HETERO_IGNITE)
      if(heteroIgnite) {
        return buildPlayCardAction([heteroIgnite])
      }
      const angelGuard = hand.find(card => card === ICard.ANGEL_GUARD)
      if(angelGuard) {
        return buildPlayCardAction([angelGuard])
      }
    }
  }
  console.warn('AI PLAY CARD REACH EDGE CASE, TAKE HIT', state, playerId)
  return {
    type: GameActionType.TAKE_HIT
  }
}

export const aiAction = (state: GameState, turn: number): GameAction => {
  if (state.playerDeck[turn].length > state.playerHp[turn]) {
    return aiDiscard(state, turn)
  }
  if (state.stage.length === 0) {
    return aiFirstCard(state, turn)
  }
  return aiPlayCard(state, turn)
}
