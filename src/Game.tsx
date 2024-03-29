import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { usePoker99 } from './withGameNetwork'
import { GameAction, GameActionType, PlayCardPayload } from './GameAction'
import { ChooseCardFor, Deck } from './components/Deck'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { checkAbleToRespond, decodeError } from './utils'
import { useGamenetI18n } from 'gamenet-material'
import { IDeck } from './types'

export const Game: FunctionComponent = () => {
  const {
    state,
    dispatch,
    dispatchAs,
    myPlayerId,
    myLocals,
    hideDeck,
    setHideDeck,
    error,
    setError,
    renderedDeckId
  } = usePoker99()
  const [throttledRenderedId, setTrottledRenderedId] = useState(renderedDeckId)
  const {i18n} = useGamenetI18n()
  const handleError = (e: Error): void => {
    console.error('HANDLE ERROR')
    try {
      setError(decodeError(e, i18n))
    } catch {
      setError(e.message)
    }
  }
  const myTurn = state.turn === myPlayerId || myLocals.includes(state.players[state.turn])
  const dispatchHelper = async (action: GameAction) => {
    try{
      if (state.turn === myPlayerId) {
        await dispatch(action).then(() => setError(''))
      } else if (myLocals.includes(state.players[state.turn])) {
        await dispatchAs(state.turn, action).then(() => setError(''))
      } else {
        throw new Error('Not my turn')
      }
    } catch (e) {
      handleError(e)
      throw e
    }
  }
  const playCard = async (payload: PlayCardPayload) => {
    const action: GameAction = {
      type: GameActionType.PLAY_CARD,
      payload
    }
    await dispatchHelper(action).then(() => {
      if (myLocals.length > 0) {
        setHideDeck(true)
      }
    })
  }
  const discardCard = async (payload: PlayCardPayload) => {
    const action: GameAction = {
      type: GameActionType.DISCARD_CARD,
      payload
    }
    await dispatchHelper(action)
  }
  const takeHit = async () => {
    const action: GameAction = {
      type: GameActionType.TAKE_HIT,
    }
    await dispatchHelper(action)
  }
  useEffect(() => {
    setTimeout(() => {
      setTrottledRenderedId(renderedDeckId)
    }, 500)
  }, [renderedDeckId])
  useEffect(() => {
    setTrottledRenderedId(myPlayerId)
  }, [myPlayerId])
  const ableToRespond = useMemo(() => checkAbleToRespond(state), [state])
  let chooseCardFor = ChooseCardFor.RESPOND_PLAY
  if(state.stage.length === 0) {
    chooseCardFor = ChooseCardFor.FIRST_PLAY
  }
  if(state.started && throttledRenderedId !== undefined && throttledRenderedId !== null && state.playerDeck[throttledRenderedId].length > state.playerHp[throttledRenderedId]) {
    chooseCardFor = ChooseCardFor.DISCARD
  }
  const handleCardChoose = async (payload: PlayCardPayload) => {
    if(chooseCardFor === ChooseCardFor.DISCARD) {
      await discardCard(payload)
    } else {
      await playCard(payload)
    }
  }
  const onReorder = async (cards: IDeck): Promise<void> => {
    await dispatch({
      type: GameActionType.REORDER,
      payload: {
        cards
      }
    }).catch(handleError)
  }
  return (
    <div style={{ pointerEvents: 'all', color: 'white' }}>
      {state.started && myPlayerId !== undefined &&
      <Deck
        cards={state.playerDeck[throttledRenderedId ?? myPlayerId]}
        onCardsChoose={handleCardChoose}
        chooseCardFor={chooseCardFor}
        hide={hideDeck}
        reveal={() => setHideDeck(false)}
        takeHit={takeHit}
        myTurn={myTurn}
        onReorder={onReorder}
        ableToRespond={ableToRespond}
      />}
      <div style={{ maxHeight: '50%' }}>
        {state.logs.slice().reverse().map((s, k) => <div key={k}>{s}</div>)}
      </div>
      <Dialog open={error !== ''} onClose={() => setError('')} aria-labelledby="form-dialog-title">
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError('')} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
