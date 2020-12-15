import React, { FunctionComponent } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core'
import { ICard } from '../types'
import { PlayCardPayload } from '../GameAction'

export const PlayCardAdditionalModal: FunctionComponent<{ open: boolean, onClose: (playCardPayload?: PlayCardPayload) => void, card: ICard, targets: Array<[number, string]> }> = ({ open, onClose, card, targets }) => {
  const chooseIncrease = (increase: boolean) => (): void => {
    // onClose({ card, increase })
  }
  const chooseTarget = (target: number) => (): void => {
    // onClose({ card, target })
  }
  return (
    <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
      <DialogTitle>
        {
          // card.number === 5 ? 'Please choose target' : 'Please choose'
        }
      </DialogTitle>
      <DialogContent>
        {
          // card.number === 10
          //   ? (
          //     <Grid container>
          //       <Grid item><Button onClick={chooseIncrease(false)}> -10 </Button></Grid>
          //       <Grid item><Button onClick={chooseIncrease(true)}> +10 </Button></Grid>
          //     </Grid>
          //   ) :
          //   card.number === 12
          //     ? (
          //       <Grid container>
          //         <Grid item><Button onClick={chooseIncrease(false)}> -20 </Button></Grid>
          //         <Grid item><Button onClick={chooseIncrease(true)}> +20 </Button></Grid>
          //       </Grid>
          //     ) :
          //     card.number === 5
          //       ? (
          //         <Grid container>
          //           {targets.map(([playerId, name]) => <Button key={name} onClick={chooseTarget(playerId)}>{name}</Button>)}
          //         </Grid>
          //       ) :
          //       null
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
