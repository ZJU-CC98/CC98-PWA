import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'

import history from '@/utils/history'
import theme from './theme'

import TopBar from './components/TopBar'

import HotTopic from './pages/HotTopic'
import Topic from './pages/Topic'
import LogIn from './pages/LogIn'
import Page401 from './pages/Error/401'
import Page404 from './pages/Error/404'


const App: React.SFC = () => (
  <>
    <TopBar />
    <Switch>
      <Route path="/" exact component={HotTopic} />
      <Route path="/hotTopic" exact component={HotTopic} />
      {/* <Route path="/newTopics" exact component={newTopics} */}
      <Route path="/topic/:topicID" component={Topic} />

      <Route path="/logIn" exact component={LogIn} />
      <Route path="/error/401" exact component={Page401} />
      <Route path="/error/404" exact component={Page404} />
      <Route path="/" render={() => (<Redirect to="/error/404" />)} />
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
