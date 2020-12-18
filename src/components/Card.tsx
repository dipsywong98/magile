import React, { FunctionComponent } from 'react'
import { ICard } from '../types'
import { makeStyles, Paper } from '@material-ui/core'
import { cardImages } from '../assets'
import { CheckCircleOutline } from 'mdi-material-ui'
import { green, red } from '@material-ui/core/colors'
import { CancelOutlined } from '@material-ui/icons'
import { useGamenetI18n } from 'gamenet-material'

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
  card: ICard, onClick?: () => void, disabled?: boolean, style?: Record<string, unknown>, selected?: boolean, isDelete?: boolean
}> = (
  {
    style,
    card,
    onClick,
    disabled,
    selected,
    isDelete
  }) => {
  const classes = useStyle()
  const {i18n} = useGamenetI18n()

  return (
    <Paper
      elevation={4}
      style={{
        pointerEvents: disabled ? 'none' : 'auto',
        backgroundImage: `url(${cardImages[card]})`,
        backgroundSize: 'cover',
        position: 'relative',
        ...style
      }}
      className={classes.root} onClick={!disabled ? onClick : undefined}>
      <h2 style={{ fontFamily: 'Big Shoulders Inline Text, inherit', margin: 0, color: 'white', textShadow: '5px 3px 8px black' }}>
        {i18n[card]}
      </h2>
      {selected && <div style={{position: 'absolute', top: 0, right: 0}}>
        {isDelete ? <CancelOutlined style={{ color: red[500] }} fontSize='large'/> : <CheckCircleOutline style={{ color: green[500] }} fontSize='large'/>}
      </div>}
    </Paper>
  )
}
