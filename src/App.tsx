import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

// FIXME: delete after migrate to v4
// https://material-ui.com/css-in-js/basics/#migration-for-material-ui-core-users
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider, install } from '@material-ui/styles'

install()

import { getTheme } from '@/theme'

import TopBar from '@/components/TopBar'
import DrawerMenu from '@/components/DrawerMenu'
import BackGround from '@/components/BackGround'
import Router from '@/router'

const App = () => (
  <BackGround>
    <TopBar />
    <DrawerMenu />
    <Router />
  </BackGround>
)

const Root = () => {
  const { theme, mode } = useModel(settingModel, ['theme', 'mode'])

  return (
    <MuiThemeProvider theme={getTheme(theme, mode)}>
      <ThemeProvider theme={getTheme(theme, mode)}>
        <App />
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

export default Root
