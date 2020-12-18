import React, { FunctionComponent } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { useGamenetI18n } from 'gamenet-material'

export const DamageTable: FunctionComponent = () => {
  const { i18n } = useGamenetI18n()
  return (
    <TableContainer component={Paper}>
      <Table style={{ width: '100%' }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>{i18n.transferMode}</TableCell>
            <TableCell>{i18n.mmmCount}</TableCell>
            <TableCell>{i18n.damage}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell rowSpan={3}>{i18n.homo}</TableCell>
            <TableCell>1 - 4</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>5 - 7</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>8+</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={3}>{i18n.hetero}</TableCell>
            <TableCell>1 - 4</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>5 - 6</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
