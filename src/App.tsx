import React from 'react'
import { Provider, Subscribe } from '@cc98/state'

import { MuiThemeProvider } from '@material-ui/core/styles'
import { dark, light } from './theme'

import global, { GlobalContainer } from '@/model/global'

import TopBar from '@/components/TopBar'
import BackGround from '@/components/BackGround'
import Router from './router'

const App: React.SFC = () => (
  <BackGround>
    <TopBar />
    <Router />
  </BackGround>
)

const Root: React.SFC = () => (
  <Provider>
    <Subscribe to={[global]}>
      {(g: GlobalContainer) => (
        <MuiThemeProvider theme={g.state.theme === 'light' ? light : dark}>
          <App />
        </MuiThemeProvider>
      )}
    </Subscribe>
  </Provider>
)

export default Root
