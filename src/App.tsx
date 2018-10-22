import React from 'react'
// https://reach.tech/router/api/Router
import { Router, RouteComponentProps } from '@reach/router'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from '@cc98/state'

import theme from './theme'

import TopBar from './components/TopBar'

import Home from './pages/Home'
import HotTopic from './pages/HotTopic'
import NewTopic from './pages/NewTopic'
import BoardList from './pages/Board';
import Board from './pages/Board/Board';
import UserCenter from './pages/UserCenter';
import Topic from './pages/Topic'
import LogIn from './pages/LogIn'
import Page401 from './pages/Error/401'
import Page404 from './pages/Error/404'


// TODO: cache
const Route: React.SFC<RouteComponentProps & {
  // @types/react 里 createElement 签名很混乱
  component: any
}> = (props) => (
  React.createElement(props.component, props)
)


const App: React.SFC = () => (
  <>
    <TopBar />
    <Router>
      <Route path="/" component={Home} />
      <Route path="/hotTopic" component={HotTopic} />
      <Route path="/newTopic" component={NewTopic} />
      <Route path="/topic/:topicID" component={Topic} />
      <Route path="/boardList" component={BoardList} />
      <Route path="/board/:id" component={Board} />
      <Route path="/board/:id/:page" component={Board} />
      <Route path="/userCenter" component={UserCenter} />
      <Route path="/user/:id" component={UserCenter} />
      <Route path="/user/name/:name" component={UserCenter} />

      <Route path="/logIn" component={LogIn} />
      <Route path="/error/401" component={Page401} />
      <Route path="/error/404" component={Page404} />
      <Route default component={Page404}/>
    </Router>
  </>
)

const Wrapper: React.SFC = () => (
  <Provider>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>
)

export default Wrapper
