import React, { createContext, FunctionComponent, useContext, useEffect } from 'react'
import { BoardGameContextInterface, useBoardGameNetwork } from 'gamenet'
import { GameState } from './GameState'
import { GameReducer } from './GameReducer'
import { GameAction } from './GameAction'
import { aiAction } from './aiAction'

const Poker99Context = createContext<BoardGameContextInterface<GameState, GameAction> | null>(null)

export const withGameNetwork = (Component: FunctionComponent): FunctionComponent => {
  const WithGameNetwork: FunctionComponent = props => {
    const network = useBoardGameNetwork(GameReducer, new GameState(), undefined, 'magile')
    const {myAis, state,dispatchAs} = network
    useEffect(() => {
      if (aiAction !== undefined && myAis.includes(state.players[state.turn]) && state.started && state.winner === null) {
        const cb = (): void => {
          const action = aiAction(state, state.turn)
          // action.peerId = Object.keys(state.members).filter(peerId => state.members[peerId] === state.players[state.turn])[0]
          dispatchAs(state.turn, action).catch(console.error)
        }
        const n = window.setTimeout(cb, 1000)
        return () => {
          window.clearTimeout(n)
        }
      }
    }, [dispatchAs, myAis, state])
    return (
      <Poker99Context.Provider value={network}>
        <Component {...props} />
    </Poker99Context.Provider>
  )
  }
  WithGameNetwork.displayName = 'WithGameNetwork'
  return WithGameNetwork
}

export const usePoker99 = (): BoardGameContextInterface<GameState, GameAction> => {
  const network: BoardGameContextInterface<GameState, GameAction> | null = useContext(Poker99Context)
  if (network === null) {
    throw new Error('please wrap it using withGameNetwork before calling this hook')
  }
  return network
}
