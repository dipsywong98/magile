import React, { FunctionComponent, useEffect, useState } from 'react'
import { usePoker99 } from './withGameNetwork'
import { GameAction, GameActionType, PlayCardPayload } from './GameAction'
import { ChooseCardFor, Deck } from './components/Deck'
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
    console.error('HANDLE ERROR')
    setError(e.message)
  }
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
  const chooseCardFor = (
    throttledRenderedId !== null && throttledRenderedId !== undefined && state.turn === throttledRenderedId && state.stage.length === 0
      ? state.playerDeck[throttledRenderedId].length <= state.playerHp[throttledRenderedId]
      ? ChooseCardFor.FIRST_PLAY
      : ChooseCardFor.DISCARD
      : ChooseCardFor.RESPOND_PLAY
  )
  const handleCardChoose = async (payload: PlayCardPayload) => {
    if(chooseCardFor === ChooseCardFor.DISCARD) {
      await discardCard(payload)
    } else {
      await playCard(payload)
    }
  }
  return (
    <div style={{ pointerEvents: 'all' }}>
      {state.started && myPlayerId !== undefined &&
      <Deck
        cards={state.playerDeck[throttledRenderedId ?? myPlayerId]}
        onCardsChoose={handleCardChoose}
        chooseCardFor={chooseCardFor}
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
