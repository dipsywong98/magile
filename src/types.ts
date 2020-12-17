import { GameState } from './GameState'
import { PlayCardPayload } from './GameAction'

export enum ICard {
  EARTH_MAGE = 'earth_mage',
  WATER_MAGE = 'water_mage',
  FIRE_MAGE = 'fire_mage',
  WIND_MAGE = 'wind_mage',
  THUNDER_MAGE = 'thunder_mage',
  EARTH_MISSILE = 'earth_missile',
  WATER_MISSILE = 'water_missile',
  FIRE_MISSILE = 'fire_missile',
  WIND_MISSILE = 'wind_missile',
  THUNDER_MISSILE = 'thunder_missile',
  LIGHT_MAGILE = 'light_magile',
  DARK_MAGILE = 'dark_magile',
  HOMO_IGNITE = 'homo_ignite',
  HETERO_IGNITE = 'hetero_ignite',
  ANGEL_GUARD = 'angel_guard'
}

export enum IMode {
  HOMO,
  HETERO
}

export type IDeck = ICard[]

export type IStateMapper = (prevState: GameState) => GameState

export type IsCard = (card: ICard) => boolean

export type IPlayCard = (payload: PlayCardPayload, playerId: number) => IStateMapper

export enum ICardType {
  MAGE='mage',
  MISSILE='missile',
  MAGILE='magile',
  IGNITE='ignite',
  ANGEL_GUARD='angel_guard'
}

export enum ICardColor {
  NONE= 'none',
  EARTH= 'earth',
  WATER= 'water',
  FIRE= 'fire',
  WIND= 'wind',
  THUNDER= 'thunder',
  LIGHT= 'light',
  DARK= 'dark'
}

export const allColors: ICardColor[] = [
  ICardColor.EARTH,
  ICardColor.WATER,
  ICardColor.FIRE,
  ICardColor.WIND,
  ICardColor.THUNDER,
  ICardColor.LIGHT,
  ICardColor.DARK,
]
