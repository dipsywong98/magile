import { ICard, ICardColor, ICardType, IMode } from './types'
import { GameState } from './GameState'
import { i18nSub } from 'gamenet-material'

export const basicDamage = (count: number, mode: IMode | null): number => {
  switch (mode) {
    case IMode.HOMO:
      switch (count) {
        case 1:
        case 2:
        case 3:
        case 4:
          return 1
        case 5:
        case 6:
        case 7:
          return 2
        default:
          return 3
      }
    case IMode.HETERO:
      switch (count) {
        case 1:
        case 2:
        case 3:
        case 4:
          return 1
        case 5:
        case 6:
          return 2
        default:
          return 3
      }
    default:
      return 0
  }
}

export const computeDamage = (state: GameState) => {
  const igniteCount = state.stage.filter(card => getCardType(card) === ICardType.IGNITE).length
  const basic = basicDamage(state.stage.filter(card => getCardColor(card) !== ICardColor.NONE).length, state.mode)
  return basic + igniteCount + (state.duel ? 1 : 0)
}

export const getCardType = (card: ICard): ICardType => {
  switch (card) {
    case ICard.EARTH_MAGE:
    case ICard.WATER_MAGE:
    case ICard.FIRE_MAGE:
    case ICard.WIND_MAGE:
    case ICard.THUNDER_MAGE:
      return ICardType.MAGE
    case ICard.EARTH_MISSILE:
    case ICard.WATER_MISSILE:
    case ICard.FIRE_MISSILE:
    case ICard.WIND_MISSILE:
    case ICard.THUNDER_MISSILE:
      return ICardType.MISSILE
    case ICard.LIGHT_MAGILE:
    case ICard.DARK_MAGILE:
      return ICardType.MAGILE
    case ICard.HETERO_IGNITE:
    case ICard.HOMO_IGNITE:
      return ICardType.IGNITE
    case ICard.ANGEL_GUARD:
      return ICardType.ANGEL_GUARD
  }
}

export const areCardsOfTypeOrMagile = (cards: ICard[], type: ICardType): boolean => {
  return cards.reduce<boolean>((prev, curr) => {
    const cardType = getCardType(curr)
    return prev && (cardType === type || cardType === ICardType.MAGILE)
  }, true)
}

export const getCardColor = (card: ICard): ICardColor => {
  switch (card) {
    case ICard.EARTH_MAGE:
    case ICard.EARTH_MISSILE:
      return ICardColor.EARTH
    case ICard.WATER_MAGE:
    case ICard.WATER_MISSILE:
      return ICardColor.WATER
    case ICard.FIRE_MAGE:
    case ICard.FIRE_MISSILE:
      return ICardColor.FIRE
    case ICard.WIND_MAGE:
    case ICard.WIND_MISSILE:
      return ICardColor.WIND
    case ICard.THUNDER_MAGE:
    case ICard.THUNDER_MISSILE:
      return ICardColor.THUNDER
    case ICard.LIGHT_MAGILE:
      return ICardColor.LIGHT
    case ICard.DARK_MAGILE:
      return ICardColor.DARK
    default:
      return ICardColor.NONE
  }
}

export const isActionCard = (card: ICard) => {
  return ![ICardType.MISSILE, ICardType.MAGE].includes(getCardType(card))
}

export const areCardsOfColor = (cards: ICard[], color: ICardColor): boolean => {
  return cards.reduce<boolean>((prev, curr) => {
    return prev && getCardColor(curr) === color
  }, true)
}

export const areCardsOfDifferentColor = (cards: ICard[]): boolean => {
  const seenColor = new Set()
  const filteredCards = cards.filter((card) => getCardColor(card) !== ICardColor.NONE)
  filteredCards.forEach((card) => {
    seenColor.add(getCardColor(card))
  })
  return seenColor.size === filteredCards.length
}

export const hasCardColorNone = (cards: ICard[]): boolean => {
  return !!cards.find((card) => getCardColor(card) === ICardColor.NONE)
}

export const canPlayCard = (state: GameState, card: ICard): boolean => {
  const { mode, duel, ignited } = state
  if (duel) {
    if ([ICardType.MAGILE, ICardType.IGNITE, ICardType.ANGEL_GUARD].includes(getCardType(card))) {
      return false
    }
  }
  if(state.stage.length === 0){
    return !isActionCard(card)
  }
  if (card === ICard.ANGEL_GUARD) {
    return true
  }
  if (ignited) {
    if (![ICardType.IGNITE, ICardType.ANGEL_GUARD].includes(getCardType(card))) {
      return false
    }
  }
  if(mode === IMode.HOMO) {
    return card === ICard.HOMO_IGNITE || getCardColor(card) === getCardColor(state.stage[0])
  }
  if(mode === IMode.HETERO) {
    return card === ICard.HETERO_IGNITE || (areCardsOfTypeOrMagile([card], getCardType(state.stage[0])) && areCardsOfDifferentColor([...state.stage, card]))
  }
  console.warn('canPlayCard EDGECASE!!!', state, card)
  return false
}

export const randInt = (max: number) => {
  return Math.floor(Math.random()*max)
}

export const buildError = (messageKey: string, values?: Record<string, string>, variables?: Record<string, string | string[]>): Error => {
  return new Error(JSON.stringify({messageKey, values: values ?? {}, variables}))
}

export const decodeError = (error: Error, i18n: Record<string, unknown>): string => {
  const {messageKey, values, variables} = JSON.parse(error.message)
  Object.entries((variables??{}) as Record<string, string | string[]>).forEach(([varName, i18nKey]) => {
    if(typeof i18nKey ==='string') {
      values[varName] = i18n[i18nKey]
    } else {
      values[varName] = i18nKey.map(key => i18n[key]).join(', ')
    }
  })
  return i18nSub(i18n[messageKey] as string, { ...values })
}

