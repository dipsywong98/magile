import React, { FunctionComponent } from 'react'
import { usePoker99, withGameNetwork } from './withGameNetwork'
import { GamePagesSlider, Home, LanguageButton, Room, useGamenetI18n, withGamenetI18n } from 'gamenet-material'
import { Game } from './Game'
import { GameRenderer } from './components/GameRenderer'
import { i18ns } from './i18ns'
import { DialogContent } from '@material-ui/core'

const App: FunctionComponent = withGamenetI18n({ i18ns })(withGameNetwork(() => {
  const network = usePoker99()
  const { i18n } = useGamenetI18n()
  return (
    <GamePagesSlider gameAppState={network.gameAppState} fullPage={[false, false, true]}>
      <Home {...network} gameName={i18n.magile}>
        <DialogContent>
          <h2>{i18n.howToPlay}</h2>
          <div>{i18n.howToPlayContent}</div>
        </DialogContent>
      </Home>
      <Room {...network} />
      <Game/>
      <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 100 }}>
        <LanguageButton/>
      </div>
    </GamePagesSlider>
  )
}))

export default App
