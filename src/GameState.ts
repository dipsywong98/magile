// Poker99State.ts

import { GenericBoardGameState } from 'gamenet'
import { IDeck, IMode } from './types'
import { PlayCardPayload } from './GameAction'

export class GameState extends GenericBoardGameState {
  [key: string]: unknown | undefined

  maxPlayer = 8
  minPlayer = 2
  turn = 0
  direction = 1
  points = 0
  drawDeck: IDeck = []
  playedDeck: IDeck = []
  mode: IMode | null = null
  trashDeck: IDeck = []
  playerDeck: IDeck[] = []
  playerHp: number[] = []
  logs: string[] = []
  lastAction: PlayCardPayload & { playerId: number } | null = null
  ignited = false
  duel = false
}
