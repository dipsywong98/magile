import { GameState } from './GameState'
import { GameAction, GameActionType } from './GameAction'
import { shuffle } from 'gamenet'


export const aiAction = (state: GameState, turn: number): GameAction => {
  throw new Error('reached an edge case')
}
