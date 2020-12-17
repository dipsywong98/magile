import { ICard, ICardColor, ICardType, IMode } from './types'

export const basicDamage = (count: number, mode: IMode): number => {
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

  }
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
