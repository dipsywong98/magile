import React, { FunctionComponent } from 'react'
import { ICard } from '../types'
import { makeStyles, Paper } from '@material-ui/core'
import { cardImages } from '../assets'

const useStyle = makeStyles(() => ({
  root: {
    padding: '16px',
    width: '110px',
    height: '160px',
    borderRadius: '8px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'transform 0.1s ease-in-out',
    transformOrigin: 'center',
    '&:hover': {
      // transform: 'translateY(-50%)'
    }
  }
}))

export const Card: FunctionComponent<{
  card: ICard, onClick?: () => void, disabled?: boolean, style?: Record<string, unknown>, selected?: boolean
}> = (
  {
    style,
    card,
    onClick,
    disabled,
    selected
  }) => {
  const classes = useStyle()

  return (
    <Paper
      elevation={4}
      style={{
        pointerEvents: disabled ? 'none' : 'auto',
        backgroundImage: `url(${cardImages[card]})`,
        backgroundSize: 'cover', ...style
      }}
      className={classes.root} onClick={!disabled ? onClick : undefined}>
      <h2 style={{ fontFamily: 'Big Shoulders Inline Text, inherit', margin: 0 }}>
        {card}
      </h2>
      <div>
        {selected ? 'yes' : 'no'}
        {/*  {hintText(card)}*/}
      </div>
    </Paper>
  )
}
