// GameAction.ts

import { GameActionTypes, GenericBoardGameAction } from 'gamenet'
import { ICard, IMode } from './types'
import { NetworkAction } from 'smnet'

export enum GameActionType {
  PLAY_CARD,
  END,
  DISCARD_CARD,
}

export interface PlayCardPayload {
  cards: ICard[]
  mode?: IMode
}

export type GameAction = (({
  type: GameActionType.DISCARD_CARD
  payload: PlayCardPayload
} | {
  type: GameActionType.PLAY_CARD
  payload: PlayCardPayload
} | {
  type: GameActionType.END
} | {
  type: GameActionTypes
  payload: never
}) & NetworkAction) | GenericBoardGameAction
