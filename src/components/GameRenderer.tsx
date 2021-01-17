import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { usePoker99 } from '../withGameNetwork'
import { GameActionType } from '../GameAction'
import { Card } from './Card'
import { IDeck, IMode } from '../types'
import { computeDamage } from '../utils'
import { Button } from '@material-ui/core'
import { i18nSub, useGamenetI18n } from 'gamenet-material'
import { DamageTableToggleButton } from '../DamageTableToggleButton'

export const GameRenderer: FunctionComponent = () => {
  const { state, myPlayerId, dispatch } = usePoker99()
  const [prevCardPayload, setPrevCardPayload] = useState<null | IDeck>(null)
  const [startAnimateCard, setStartAnimateCard] = useState(false)
  const [showAnimateCard, setShowAnimateCard] = useState(false)
  const { i18n } = useGamenetI18n()
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
  }, [state.lastAction, state.stage])
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
      if (state.winner !== null) {
        const player = state.players[state.winner]
        return i18nSub(i18n.loserIs$player, { player })
      }
      const player = state.players[state.turn]
      if (state.playerDeck[state.turn].length > state.playerHp[state.turn]) {
        return i18nSub(i18n.$playerDiscardCardTil$cardCount, { player, cardCount: `${state.playerHp[state.turn]}` })
      }
      if (state.stage.length === 0) {
        return i18nSub(i18n.$playerInitializingTransfer, { player })
      } else {
        const mode = i18n[state.mode ?? IMode.HOMO]
        return i18nSub(i18n.$playerRespondTo$modeTransfer, { player, mode })
      }
    }
    return undefined
  })()
  const damage = useMemo(() => `${computeDamage(state)}`, [state])
  const hint = (() => {
    if (state.started) {
      if (state.playerDeck[state.turn].length > state.playerHp[state.turn]) {
        return i18nSub(i18n.hit$playerWith$damage, { player: state.players[state.turn], damage })
      }
      if (state.winner !== null) {
        return i18n.gameOver
      }
      if (state.duel) {
        return i18n.duelHint
      }
      if (state.ignited) {
        return i18n.ignitedHint
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
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto' }}>
          {
            new Array(state.players.length).fill(0).map((_, k) => mp(k + (myPlayerId ?? 0))).filter(id => id !== (myPlayerId ?? 0)).map(id => (
              <div style={{ border: `solid ${state.turn === id ? 'red' : 'transparent'} 2px`, padding: '16px 32px' }}>
                <div>
                  {state.players[id]}
                </div>
                <div>
                  hp: {state.playerHp[id]}
                </div>
              </div>
            ))
          }
        </div>
        {/*{myPlayerId === undefined && <Name offset={0}/>}*/}
        {prevCardPayload !== null &&
        <div style={{ position: 'absolute', ...center }}>
          <div style={{ transform: 'translate(-50%,-100%)', textAlign: 'center' }}>
            {hint && <h3>{hint}</h3>}
            <h1>{status}</h1>
            {state.winner !== undefined && state.winner !== null && <div>
              <Button variant="contained" color='primary' onClick={again}>{i18n.again}</Button>
            </div>}
            <h3>{state.mode && `${i18n[state.mode]}, `}{i18nSub(i18n.current$damage, { damage })}</h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: 'calc(100vw - 32px)',
              flexWrap: 'wrap',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginBottom: '70px'
            }}>
              {prevCardPayload.map(card => <div style={{ padding: '8px', maxHeight: '70px' }}><Card card={card} disabled/>
              </div>)}
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
        <h3 style={{
          position: 'absolute',
          bottom: 0,
          right: '20px',
          textAlign: 'right',
          border: `solid ${state.turn === (myPlayerId ?? 0) ? 'red' : 'transparent'} 2px`,
          padding: '16px 32px'
        }}>
          <div>
            {i18n.name}: {state.players[myPlayerId ?? 0]}
          </div>
          <div>
            hp: {state.playerHp[myPlayerId ?? 0]}
          </div>
          <div>
            {i18n.drawDeck}: {state.drawDeck.length}
          </div>
        </h3>
        <DamageTableToggleButton/>
      </div>
  )
}
