import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'

import history from '@/utils/history'
import theme from './theme'

import TopBar from './components/TopBar'

import HotTopic from './pages/HotTopic'
import Topic from './pages/Topic'
import LogIn from './pages/LogIn'
import Page404 from './pages/Error/404'
import Page401 from './pages/Error/401'


const App: React.SFC = () => (
  <>
    <TopBar />
    <Switch>
      <Route path="/" exact component={HotTopic} />
      <Route path="/hotTopic" exact component={HotTopic} />
      <Route path="/topic/:topicID" component={Topic} />

      <Route path="/login" exact component={LogIn} />
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
