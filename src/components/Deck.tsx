import React, { FunctionComponent, ReactNode, useEffect, useMemo, useReducer, useState } from 'react'
import { ICard, IMode, IPlayCard } from '../types'
import { Card } from './Card'
import { Grid, IconButton } from '@material-ui/core'
import { Delete, Place, PlayArrow, Remove, Visibility } from '@material-ui/icons'
import { PlayCardPayload } from '../GameAction'
import { Equal, NotEqual } from 'mdi-material-ui'

const DURATION = 0.3

const PlaceHolder: FunctionComponent<{ maxWidth: string }> = ({ maxWidth }) => {
  const [width, setWidth] = useState(maxWidth)
  useEffect(() => {
    setTimeout(() => {
      setWidth('0')
    }, 1)
  }, [])
  return (
    <div style={{
      maxWidth: width,
      minWidth: width,
      transition: `min-width ${DURATION}s ease-in-out`,
      position: 'relative'
    }}/>
  )
}

export enum ChooseCardFor {
  FIRST_PLAY,
  RESPOND_PLAY,
  DISCARD
}

export const Deck: FunctionComponent<{
  cards: ICard[], hide: boolean, reveal: () => void, onCardsChoose: (payload: PlayCardPayload) => Promise<void>, chooseCardFor: ChooseCardFor
}> = ({ cards, hide, reveal, onCardsChoose, chooseCardFor }) => {
  const [playedIndices, setPlayedIndices] = useState<number[]>([])
  const [hovering, setHovering] = useState<number | null>(null)
  const [playGetCardAnimation, setPlayGetCardAnimation] = useState(false)
  const [discardingAnimation, setDiscardingAnimation] = useState(false)
  const [selected, dispatchSelected] = useReducer<(prev: Set<number>, action: { type: string, payload?: number }) => Set<number>>((prev, {
    type,
    payload
  }) => {
    switch (type) {
      case 'add':
        if (payload !== undefined) {
          prev.add(payload)
        }
        return new Set(prev)
      case 'delete':
        if (payload !== undefined) {
          prev.delete(payload)
        }
        return new Set(prev)
      case 'clear':
        return new Set()
      default:
        return prev
    }
  }, new Set<number>())
  const handleCardClick = async (card: ICard, index: number) => {
    if (selected.has(index)) {
      dispatchSelected({ type: 'delete', payload: index })
    } else {
      dispatchSelected({ type: 'add', payload: index })
    }
  }
  const handlePlayCards = (param: unknown) => {
    const mode = param === IMode.HOMO || param === IMode.HETERO ? param : undefined
    setDiscardingAnimation(chooseCardFor === ChooseCardFor.DISCARD)
    onCardsChoose({ cards: cards.filter((_, k) => selected.has(k)), mode })
      .then(() => {
        setHovering(null)
        setPlayedIndices(Array.from(selected))
        dispatchSelected({ type: 'clear' })
        setTimeout(() => {
          setPlayGetCardAnimation(true)
        }, 1)
        setTimeout(() => {
          setPlayGetCardAnimation(false)
          setPlayedIndices([])
          setDiscardingAnimation(false)
        }, 500)
      })
      .catch(e => {
        console.error(e)
      })
  }
  const getPlayedCards = () => {
    const cardsToRender = []
    let j = 0
    for (let i = 0; i < cards.length; i++) {
      if (playedIndices.includes(i)) {
        cardsToRender.push(null)
      } else {
        cardsToRender.push(cards[j])
        j++
      }
    }
    return (playedIndices.length > 0 && discardingAnimation) ? [...cardsToRender, ...cards.slice(cards.length - playedIndices.length)] : cardsToRender
  }
  const playedCards = getPlayedCards()
  const withMaxWidth = (children: ReactNode, index: number, noPad = false) => (
    <div
      style={{
        padding: noPad ? 0 : '8px',
        maxWidth: `calc(100vw / ${playedCards.length + 2})`,
        transition: `max-width 0.1s ease-in-out`
      }}
      onMouseEnter={() => setHovering(index)}
      onTouchStart={() => setHovering(index)}
      onMouseLeave={() => setHovering(null)}
      onTouchEnd={() => setHovering(null)}>
      {children}
    </div>
  )
  return <div style={{
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    transform: hide ? 'translateY(100%)' : 'translateY(50%)',
    transition: `transform ${DURATION}s ease-in-out`,
    pointerEvents: 'none'
  }}>
    <div style={{
      textAlign: 'center',
      transform: 'translateY(-100%)',
      margin: 'auto',
      display: 'block',
      pointerEvents: 'all'
    }}>
      {hide && <IconButton onClick={reveal}>
        <Visibility/>
      </IconButton>}
      {!hide && chooseCardFor === ChooseCardFor.RESPOND_PLAY && <IconButton
        title='play'
        onClick={handlePlayCards}
      >
        <PlayArrow/>
      </IconButton>}
      {!hide && chooseCardFor === ChooseCardFor.FIRST_PLAY && <>
        <IconButton
          title='homo'
          onClick={() => handlePlayCards(IMode.HOMO)}
        >
          <Equal/>
        </IconButton>
        <IconButton
          title='hetero'
          onClick={() => handlePlayCards(IMode.HETERO)}
        >
          <NotEqual/>
        </IconButton>
      </>}
      {!hide && chooseCardFor === ChooseCardFor.DISCARD && <>
        <IconButton
          title='trash'
          onClick={handlePlayCards}
        >
          <Delete/>
        </IconButton>
      </>}

    </div>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'nowrap' }}>
      {
        getPlayedCards().map((card, index) => (
          card === null
            ? <PlaceHolder key={index} maxWidth={`calc(100vw / ${playedCards.length + 2} + 16px)`}/>
            : withMaxWidth(<Card
              card={card}
              onClick={() => handleCardClick(card, index)}
              disabled={hide}
              style={{ transform: (hovering === index || selected.has(index)) ? 'translateY(-20%)' : undefined }}
              selected={selected.has(index)}
            />, index)))
      }
      {playedIndices.length > 0 && !discardingAnimation && <div style={{
        maxWidth: playGetCardAnimation ? `calc((100vw / ${playedCards.length + 2} + 16px) * ${playedIndices.length})` : '0',
        transition: 'max-width 0.3s ease-in-out',
        display: 'flex',
        flexWrap: 'nowrap'
      }}>
        {
          cards.slice(cards.length - playedIndices.length).map((card, index) => (
            withMaxWidth(
              <Card
                card={card}
                onClick={() => handleCardClick(card, index)}
                disabled={hide}
                style={{ transform: !playGetCardAnimation ? 'translateX(100vw)' : undefined }}
                selected={selected.has(index)}
              />
              , index + cards.length, false
            )
          ))
        }
      </div>}
    </div>
  </div>
}
