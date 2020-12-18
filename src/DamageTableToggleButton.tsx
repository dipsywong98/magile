import { FunctionComponent, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@material-ui/core'
import { Information } from 'mdi-material-ui'
import React from 'react'
import { useGamenetI18n } from 'gamenet-material'
import { DamageTable } from './DamageTable'


export const DamageTableToggleButton: FunctionComponent = () => {
  const [open, setOpen] = useState(false)
  const { i18n } = useGamenetI18n()
  return (
    <div style={{ position: 'fixed', left: 0, bottom: 0 }}>
      <IconButton onClick={() => setOpen(true)}>
        <Information/>
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle>{i18n.damageTable}</DialogTitle>
        <DialogContent>
          <DamageTable/>
          <DialogContentText>
            {i18n.damageTableHint}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {i18n.close}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
