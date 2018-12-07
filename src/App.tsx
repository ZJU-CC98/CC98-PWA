import React from 'react'

import useContainer from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'

// FIXME: remove after refactor
import { Provider } from '@cc98/state'

import { MuiThemeProvider } from '@material-ui/core/styles'
import { dark, light } from './theme'

import TopBar from '@/components/TopBar'
import DrawerMenu from '@/components/DrawerMenu'
import BackGround from '@/components/BackGround'
import Router from './router'
import GlobalStyle from './GloablStyle'

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
    <Provider>
      <MuiThemeProvider theme={theme === 'light' ? light : dark}>
        <App />
      </MuiThemeProvider>
      <GlobalStyle />
    </Provider>
  )
}

export default Root
