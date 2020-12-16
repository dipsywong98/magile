import React, { useCallback, useEffect, useState } from 'react'
import { usePoker99 } from '../withGameNetwork'
import { PlayCardPayload, GameActionType } from '../GameAction'
import { Card } from './Card'
import { Autorenew, Bomb } from 'mdi-material-ui'
import { Loop } from '@material-ui/icons'

export const GameRenderer = () => {
  const { state, myPlayerId, dispatch } = usePoker99()
  const [prevCardPayload, setPrevCardPayload] = useState<null | (PlayCardPayload & { playerId: number })>(null)
  const [startAnimateCard, setStartAnimateCard] = useState(false)
  const [showAnimateCard, setShowAnimateCard] = useState(false)
  useEffect(() => {
    setShowAnimateCard(true)
    setTimeout(() => {
      setStartAnimateCard(true)
    }, 1)
    setTimeout(() => {
      setPrevCardPayload(state.lastAction)
      setStartAnimateCard(false)
      setShowAnimateCard(false)
    }, 300)
  }, [state.lastAction])
  const m4 = (id: number): number => id % 4
  const origins: Array<Record<string, string>> = [{
    top: '100%',
    left: '50%',
    bottom: '0',
    right: '50%'
  }, {
    left: '0',
    top: '50%',
    right: '100%',
    bottom: '50%'
  }, {
    top: '0',
    left: '50%',
    bottom: '100%',
    right: '50%'
  }, {
    left: '100%',
    top: '50%',
    bottom: '50%',
    right: '0'
  }]
  const center = {
    top: '50%', left: '50%', right: '50%', bottom: '50%'
  }
  const Name = useCallback(({ offset }) => {
    const style = [
      {
        left: '50%',
        bottom: '0',
        transform: 'translateX(-50%)'
      },
      {
        left: '40px',
        top: '50%'
      }, {
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)'
      }, {
        right: '40px',
        top: '50%'
      }]
    const playerId = m4((myPlayerId ?? 0) + offset)
    const isHisTurn = state.turn === playerId
    return <h1
      style={{
        position: 'absolute',
        color: isHisTurn ? 'red' : 'white',
        ...style[offset]
      }}>{state.players[playerId]}{isHisTurn ? ' ←' : ''}</h1>
  }, [myPlayerId, state.dead, state.players, state.turn])
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
        {myPlayerId === undefined && <Name offset={0}/>}
        <Name offset={1}/>
        <Name offset={2}/>
        <Name offset={3}/>
        <h1 style={{ position: 'absolute', left: '50%', top: 'calc(50% - 192px)', transform: 'translateX(-50%)' }}>
          <Bomb/>: {state.points}/99
        </h1>
        {prevCardPayload !== null &&
        <div style={{ position: 'absolute', ...center }}>
          <div style={{ transform: 'translate(-50%,-50%)', width: '142px', height: '192px' }}>
            {prevCardPayload.cards.map(card => <Card card={card} disabled/>)}
          </div>
        </div>}
        {showAnimateCard && state.lastAction !== null && <div style={{
          position: 'absolute',
          ...(startAnimateCard ? center : origins[m4(state.lastAction.playerId - myPlayerId + 4)]),
          transform: state.lastAction !== prevCardPayload ? 'translate(-50%,-50%)' : undefined,
          transition: ['top', 'bottom', 'left', 'right'].map(s => `${s} 0.2s ease-in-out`).join(',')
        }}>
          <div style={{ transform: 'translate(-50%,-50%)', width: '142px', height: '192px' }}>
            {state.stage.map(card => <Card card={card} disabled/>)}
          </div>
        </div>}
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: 'calc(50% - 192px - 4em)',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}>
          {state.winner !== undefined && state.winner !== null && <div>winner is {state.players[state.winner]}
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
