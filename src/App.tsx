import React from 'react'

import useContainer from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'

// FIXME: delete after migrate to v4
// https://material-ui.com/css-in-js/basics/#migration-for-material-ui-core-users
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import { install } from '@material-ui/styles'
install()

import { dark, light } from './theme'

import TopBar from '@/components/TopBar'
import DrawerMenu from '@/components/DrawerMenu'
import BackGround from '@/components/BackGround'
import Router from './router'

const App = () => (
  <BackGround>
    <TopBar />
    <DrawerMenu />
    <Router />
  </BackGround>
)

const Root = () => {
  const {
    state: { theme },
  } = useContainer(settingInstance)

  return (
    <MuiThemeProvider theme={theme === 'light' ? light : dark}>
      <ThemeProvider theme={theme === 'light' ? light : dark}>
        <App />
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

export default Root
