import React, { FunctionComponent, useEffect, useState } from 'react'
import { usePoker99 } from './withGameNetwork'
import { PlayCardPayload, GameAction, GameActionType } from './GameAction'
import { Deck } from './components/Deck'
import { ICard } from './types'
// import { PlayCardAdditionalModal } from './components/PlayCardAdditionalModal'
import { usePromise } from './usePromise'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

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
  const handleError = (e: Error): void => {
    setError(e.message)
  }
  const playCard = async (payload: PlayCardPayload) => {
    const action: GameAction = {
      type: GameActionType.PLAY_CARD,
      payload
    }
    if (state.turn === myPlayerId) {
      await dispatch(action).then(() => setError(''))
    } else if (myLocals.includes(state.players[state.turn])) {
      await dispatchAs(state.turn, action).then(() => setError(''))
    } else {
      throw new Error('Not my turn')
    }
    if (myLocals.length > 0) {
      setHideDeck(true)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setTrottledRenderedId(renderedDeckId)
    }, 500)
  }, [renderedDeckId])
  const again = async (): Promise<void> => {
    await dispatch({
      type: GameActionType.END
    }).catch(handleError)
  }
  const [modalCard, setModalCard] = useState<null | ICard>(null)
  const [{ resolve, reject }, makePromise] = usePromise<void>()

  const handleModalClose = (payload?: PlayCardPayload) => {
    if (payload !== undefined) {
      playCard(payload).then(resolve).catch(handleError).catch(reject)
    } else {
      reject?.(new Error('the operation is cancelled'))
    }
    setModalCard(null)
  }
  return (
    <div style={{ pointerEvents: 'all' }}>
      {state.started && myPlayerId !== undefined &&
      <Deck
        cards={state.playerDeck[throttledRenderedId ?? myPlayerId]}
        onCardClick={console.log as any}
        hide={hideDeck}
        reveal={() => setHideDeck(false)}
      />}
      <div style={{ maxHeight: '50%' }}>
        {state.winner !== undefined && state.winner !== null && <div>winner is {state.players[state.winner]}
          <button onClick={again}>again</button>
        </div>}
        {state.logs.slice().reverse().map((s, k) => <div key={k}>{s}</div>)}
      </div>
      {/*<PlayCardAdditionalModal*/}
      {/*  open={modalCard !== null}*/}
      {/*  card={modalCard ?? { suit: ISuit.SPADE, number: 0 }}*/}
      {/*  onClose={handleModalClose}*/}
      {/*  targets={targets}*/}
      {/*/>*/}
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
