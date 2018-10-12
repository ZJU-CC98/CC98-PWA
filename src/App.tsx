import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import history from '@/utils/history'

import TopBar from './components/TopBar'

import HotTopic from './pages/HotTopic'
import Topic from './pages/Topic'

import Page404 from './pages/Error/404'
import Page401 from './pages/Error/401'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})

const App: React.SFC = () => (
  <>
    <TopBar />
    <Switch>
      <Route path="/" exact component={HotTopic} />
      <Route path="/hotTopic" exact component={HotTopic} />
      <Route path="/topic/:topicID" component={Topic} />

      <Route path="/404" exact component={Page404} />
      <Route path="/401" exact component={Page401} />
    </Switch>
  </>
)

const Wrapper: React.SFC = () => (
  <MuiThemeProvider theme={theme}>
    <Router history={history}>
      <App />
    </Router>
  </MuiThemeProvider>
)

export default Wrapper

