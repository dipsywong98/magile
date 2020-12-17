import React, { FunctionComponent, useEffect, useState } from 'react'
import { usePoker99 } from '../withGameNetwork'
import { GameActionType } from '../GameAction'
import { Card } from './Card'
import { IDeck, IMode } from '../types'
import { computeDamage } from '../utils'
import { Button } from '@material-ui/core'

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
  const status = (() => {
    if (state.started) {
      if(state.winner !== null) {
        return `Loser is ${state.players[state.winner]}`
      }
      if (state.playerDeck[state.turn].length > state.playerHp[state.turn]) {
        return `${state.players[state.turn]} discard card til ${state.playerHp[state.turn]}`
      }
      if (state.stage.length === 0) {
        return `${state.players[state.turn]} initializing transfer`
      } else {
        return `${state.players[state.turn]} responding to ${state.mode === IMode.HOMO ? 'homo' : 'hetero'} transfer. Current damage: ${computeDamage(state)}`
      }
    }
    return undefined
  })()
  const hint = (() => {
    if(state.started) {
      if(state.winner !== null) {
        return `Game Over`
      }
      if(state.duel) {
        return 'DUEL! NO Function card and each hit will deduct 1 more hp!'
      }
      if(state.ignited) {
        return 'IGNITED! Respond only with same ignited or angel guard!'
      }
    }
    return undefined
  })()
  return (
    !state.started
      ? <div
        style={{ backgroundColor: 'green', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, color: 'white' }}
      />
      : <div
        style={{
          backgroundColor: 'green',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          color: 'white',
          boxShadow: state.duel ? 'inset 0 0 100px #ff9d9d' : undefined,
          transition: 'box-shadow 0.3s ease-in-out'
        }}>
      <div style={{display: 'flex', justifyContent: 'space-around', margin: 'auto'}}>
        {
          new Array(state.players.length).fill(0).map((_, k) => mp(k + (myPlayerId ?? 0))).filter(id => id !== (myPlayerId ?? 0)).map(id => (
            <div style={{border: `solid ${state.turn === id ? 'red' : 'transparent'} 2px`, padding: '16px 32px'}}>
              {state.players[id]} : {state.playerHp[id]}
            </div>
          ))
        }
      </div>
        {/*{myPlayerId === undefined && <Name offset={0}/>}*/}
        {prevCardPayload !== null &&
        <div style={{ position: 'absolute', ...center }}>
          <div style={{ transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
            {hint && <h3>{hint}</h3>}
            <h1>{status}</h1>
            {state.winner !== undefined && state.winner !== null && <div>
              <Button variant="contained" color='primary' onClick={again}>again</Button>
            </div>}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {prevCardPayload.map(card => <div style={{ padding: '8px' }}><Card card={card} disabled/></div>)}
            </div>
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
        <h3 style={{ position: 'absolute', bottom: 0, right: '20px' }}>Draw Deck: {state.drawDeck.length}</h3>
      </div>
  )
}
