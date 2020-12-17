import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { usePoker99 } from '../withGameNetwork'
import { PlayCardPayload, GameActionType } from '../GameAction'
import { Card } from './Card'
import { Autorenew, Bomb } from 'mdi-material-ui'
import { Loop } from '@material-ui/icons'
import { IDeck } from '../types'

const Name: FunctionComponent = (props) => (
  <div {...props}/>
)

export const GameRenderer = () => {
  const { state, myPlayerId, dispatch } = usePoker99()
  const [prevCardPayload, setPrevCardPayload] = useState<null | IDeck>(null)
  const [startAnimateCard, setStartAnimateCard] = useState(false)
  const [showAnimateCard, setShowAnimateCard] = useState(false)
  useEffect(() => {
    setShowAnimateCard(true)
    setTimeout(() => {
      setStartAnimateCard(true)
    }, 1)
    setTimeout(() => {
      setPrevCardPayload(state.stage)
      setStartAnimateCard(false)
      setShowAnimateCard(false)
    }, 300)
  }, [state.lastAction])
  const mp = (id: number): number => (id + state.playerHp.length) % state.playerHp.length
  const center = {
    top: '50vh',
    left: '50vw'
  }
  const again = async (): Promise<void> => {
    await dispatch({
      type: GameActionType.END
    }).catch(console.error)
  }
  return (
    !state.started
      ? <div
        style={{ backgroundColor: 'green', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, color: 'white' }}
      />
      : <div
        style={{ backgroundColor: 'green', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, color: 'white' }}>
        {
          new Array(state.players.length).fill(0).map((_, k) => mp(k + (myPlayerId ?? 0))).filter(id => id !== (myPlayerId ?? 0)).map(id => (
            <div>
              {id}
            </div>
          ))
        }
        {/*{myPlayerId === undefined && <Name offset={0}/>}*/}
        {prevCardPayload !== null &&
        <div style={{ position: 'absolute', ...center }}>
          <div style={{ transform: 'translate(-50%,-50%)', display: 'flex' }}>
            {prevCardPayload.map(card => <div style={{ padding: '8px' }}><Card card={card} disabled/></div>)}
          </div>
        </div>}
        {showAnimateCard && state.lastAction !== null && <div style={{
          display: 'flex',
          position: 'absolute',
          left: '50vw',
          top: startAnimateCard ? '50vh' : state.lastAction.playerId === myPlayerId ? '100vh' : '-100%',
          transition: ['top', 'bottom', 'left', 'right'].map(s => `${s} 0.2s ease-in-out`).join(',')
        }}>
          <div style={{ transform: 'translate(-50%,-50%)', display: 'flex' }}>
            {state.lastAction.cards.map(card => <div style={{ padding: '8px' }}><Card card={card} disabled/></div>)}
          </div>
        </div>}
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: 'calc(50% - 192px - 4em)',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}>
          {state.winner !== undefined && state.winner !== null && <div>loser is {state.players[state.winner]}
            <button onClick={again}>again</button>
          </div>}
          <div>
            Direction: {state.direction === 1 ? <Autorenew fontSize='large'/> : <Loop fontSize='large'/>}
          </div>
        </div>
        <h3 style={{ position: 'absolute', bottom: 0, right: '20px' }}>Draw Deck: {state.drawDeck.length}</h3>
      </div>
  )
}
