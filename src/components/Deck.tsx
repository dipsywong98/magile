import React, { FunctionComponent, ReactNode, useEffect, useReducer, useState } from 'react'
import { ICard, IDeck, IMode } from '../types'
import { Card } from './Card'
import { Button } from '@material-ui/core'
import { Delete, Flag, PlayArrow, Visibility } from '@material-ui/icons'
import { PlayCardPayload } from '../GameAction'
import { Equal, NotEqual } from 'mdi-material-ui'
import { useGamenetI18n } from 'gamenet-material'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { reorderInPlace } from '../utils'

const DURATION = 0.3

const PlaceHolder: FunctionComponent<{ maxWidth: string, style?: Record<string, unknown> }> = ({ maxWidth, style }) => {
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
      position: 'relative',
      ...style
    }}/>
  )
}

export enum ChooseCardFor {
  FIRST_PLAY,
  RESPOND_PLAY,
  DISCARD
}

export const Deck: FunctionComponent<{
  cards: ICard[], hide: boolean, reveal: () => void, onCardsChoose: (payload: PlayCardPayload) => Promise<void>, chooseCardFor: ChooseCardFor, takeHit: () => Promise<void>, myTurn?: boolean, onReorder: (cards: IDeck) => Promise<void>
}> = ({ cards, hide, reveal, onCardsChoose, chooseCardFor, takeHit, myTurn, onReorder }) => {
  const [playedIndices, setPlayedIndices] = useState<number[]>([])
  const [hovering, setHovering] = useState<number | null>(null)
  const [playGetCardAnimation, setPlayGetCardAnimation] = useState(false)
  const [discardingAnimation, setDiscardingAnimation] = useState(false)
  const { i18n } = useGamenetI18n()
  const [selected, dispatchSelected] = useReducer<(prev: boolean[], action: { type: string, payload?: number | boolean[] }) => boolean[]>((prev, {
    type,
    payload
  }) => {
    switch (type) {
      case 'add':
        if (payload !== undefined && !Array.isArray(payload)) {
          prev[payload] = true
        }
        return [...prev]
      case 'delete':
        if (payload !== undefined && !Array.isArray(payload)) {
          prev[payload] = false
        }
        return [...prev]
      case 'clear':
        return []
      case 'override':
        if (Array.isArray(payload)) {
          return [...payload]
        }
        return prev
      default:
        return prev
    }
  }, [])
  const handleCardClick = async (card: ICard, index: number) => {
    if (selected[index]) {
      dispatchSelected({ type: 'delete', payload: index })
    } else {
      dispatchSelected({ type: 'add', payload: index })
    }
  }
  const handlePlayCards = (param: unknown) => {
    const mode = param === IMode.HOMO || param === IMode.HETERO ? param : undefined
    const laterSetDiscardingAnimation = chooseCardFor === ChooseCardFor.DISCARD
    onCardsChoose({ cards: cards.filter((_, k) => selected[k]), mode })
      .then(() => {
        setDiscardingAnimation(laterSetDiscardingAnimation)
        setHovering(null)
        setPlayedIndices(selected.map((b, k: number) => [b, k]).filter(([b]) => b).map(([_, k]) => k as number))
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
    return discardingAnimation ? [...cardsToRender, ...cards.slice(j)] : cardsToRender
  }
  const onDragEnd = (result: DropResult) => {
    const from = result.source.index
    const to = result.destination?.index
    if (from !== undefined && to !== undefined) {
      reorderInPlace(cards, from, to)
      reorderInPlace(selected, from, to)
      dispatchSelected({
        type: 'override',
        payload: selected
      })
      onReorder(cards).catch(console.error)
    }
  }
  const withMaxWidth = (children: ReactNode, index: number, noPad = false) => (
    <div
      style={{
        padding: noPad ? 0 : '8px',
        maxWidth: `calc(100vw / ${cards.length + 2})`,
        transition: `max-width ${DURATION / 3}s ease-in-out`
      }}
      onMouseEnter={() => setHovering(index)}
      onTouchStart={() => setHovering(index)}
      onMouseLeave={() => setHovering(null)}
      onTouchEnd={() => setHovering(null)}>
      {children}
    </div>
  )
  return <div style={{
    position: 'absolute',
    bottom: hide ? '-200px' : '-100px',
    left: 0,
    right: 0,
    zIndex: 1,
    transition: `bottom 0.3s ease-in-out`,
    pointerEvents: 'none'
  }}>
    <div style={{
      textAlign: 'center',
      transform: 'translateY(-80px)',
      margin: 'auto',
      display: 'block',
      pointerEvents: 'all'
    }}>
      {myTurn ? <>
        {hide && <Button variant='contained' onClick={reveal}>
          <Visibility/>
        </Button>}
        {!hide && chooseCardFor === ChooseCardFor.RESPOND_PLAY && <>
          <Button variant='contained'
                  title={i18n.takeHit}
                  color='secondary'
                  onClick={() => window.confirm(i18n.areYouSureYouWantToTakeHit) && takeHit().catch(console.error)}
          >
            <Flag/>
          </Button>
          <Button style={{ marginLeft: '8px' }} variant='contained'
                  title={i18n.respond}
                  color='primary'
                  onClick={handlePlayCards}
          >
            <PlayArrow/>
          </Button>
        </>}
        {!hide && chooseCardFor === ChooseCardFor.FIRST_PLAY && <>
          <Button variant='contained'
                  title={i18n.initializeHomoTransfer}
                  color='primary'
                  onClick={() => handlePlayCards(IMode.HOMO)}
          >
            <Equal/>
          </Button>
          <Button style={{ marginLeft: '8px' }} variant='contained'
                  title={i18n.initializeHeteroTransfer}
                  color='primary'
                  onClick={() => handlePlayCards(IMode.HETERO)}
          >
            <NotEqual/>
          </Button>
        </>}
        {!hide && chooseCardFor === ChooseCardFor.DISCARD && <>
          <Button variant='contained'
                  color='secondary'
                  title={i18n.trash}
                  onClick={handlePlayCards}
          >
            <Delete/>
          </Button>
        </>}
      </> : i18n.notYourTurn}
    </div>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable' direction='horizontal'>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'nowrap' }}>
              {
                getPlayedCards().map((card, index) => (
                  <Draggable index={index} draggableId={index.toString()}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}>{
                        card === null
                          ? <PlaceHolder key={index} maxWidth={`calc(100vw / ${cards.length + 2} + 16px)`}/>
                          : withMaxWidth(<Card
                            card={card}
                            onClick={() => !snapshot.isDragging && handleCardClick(card, index)}
                            disabled={hide}
                            style={{ transform: !snapshot.isDragging && (hovering === index || selected[index]) ? 'translateY(-30%)' : undefined }}
                            selected={selected[index]}
                            isDelete={chooseCardFor === ChooseCardFor.DISCARD}
                          />, index)

                      }</div>)}
                  </Draggable>))
              }
              {provided.placeholder}
              {playedIndices.length > 0 && !discardingAnimation &&
              <Draggable index={cards.length + 1} draggableId='incoming'>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}
                       {...provided.draggableProps}
                       {...provided.dragHandleProps}>
                    <div style={{
                      maxWidth: playGetCardAnimation ? `calc((100vw / ${cards.length + 2} + 16px) * ${playedIndices.length})` : '0',
                      transition: `max-width ${DURATION}s ease-in-out`,
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
                              selected={selected[index]}
                            />
                            , index + cards.length, false
                          )
                        ))
                      }
                    </div>
                  </div>
                )}
              </Draggable>
              }
            </div>
          </div>

        )}
      </Droppable>

    </DragDropContext>
  </div>
}
