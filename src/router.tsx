import React from 'react'
// https://reach.tech/router/api/Router
import { RouteComponentProps, Router } from '@reach/router'

import BoardList from './pages/BoardList'
import Board from './pages/Board'
import Compose from './pages/Compose'
import Page401 from './pages/Error/401'
import Page403 from './pages/Error/403'
import Page404 from './pages/Error/404'
import Home from './pages/Home'
import HotTopic from './pages/HotTopic'
import LogIn from './pages/LogIn'
import MessageDetail from './pages/Message/Detail'
import MessageList from './pages/Message/List'
import MyFollow from './pages/MyFollow'
import NewTopic from './pages/NewTopic'
import Search from './pages/Search'
import Setting from './pages/Setting'
import SignIn from './pages/SignIn'
import Topic from './pages/Topic'
import UserCenter from './pages/UserCenter'
import UserCenterEdit from './pages/UserCenter/Edit'

// TODO: cache
const Route: React.FunctionComponent<
  RouteComponentProps & {
    // @types/react 里 createElement 签名很混乱
    // tslint:disable-next-line:no-any
    component: any
  }
> = props => {
  const { path, component, ...otherProps } = props

  return React.createElement(component, otherProps)
}

const Routes: React.FunctionComponent = () => (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/hotTopics" component={HotTopic} />
    <Route path="/newTopics" component={NewTopic} />
    <Route path="/topic/:topicId" component={Topic} />
    <Route path="/topic/:topicId/anonymous/trace/:postId" component={Topic} />
    <Route path="/topic/:topicId/trace/:userId" component={Topic} />
    <Route path="/boardList" component={BoardList} />
    <Route path="/board/:id" component={Board} />
    <Route path="/userCenter" component={UserCenter} />
    <Route path="/userCenter/edit" component={UserCenterEdit} />
    <Route path="/user/:id" component={UserCenter} />
    <Route path="/setting" component={Setting} />
    <Route path="/messageList" component={MessageList} />
    <Route path="/messageDetail/:id" component={MessageDetail} />
    <Route path="/compose/:targetId/:editType" component={Compose} />
    <Route path="/myFollow" component={MyFollow} />
    <Route path="/search" component={Search} />
    <Route path="/signin" component={SignIn} />

    <Route path="/logIn" component={LogIn} />
    <Route path="/error/401" component={Page401} />
    <Route path="/error/403" component={Page403} />
    <Route path="/error/404" component={Page404} />
    <Route default component={Page404} />
  </Router>
)

export default Routes

// 全局左滑返回
const globalBack = {
  clientX: 0,
  // clientY: 0,
}

document.addEventListener(
  'touchstart',
  (event: TouchEvent) => {
    globalBack.clientX = event.changedTouches[0].clientX
  },
  false
)

document.addEventListener(
  'touchend',
  (event: TouchEvent) => {
    const moveLen = event.changedTouches[0].clientX - globalBack.clientX

    if (globalBack.clientX < 120 && moveLen > 120) {
      window.history.back()
    }
  },
  false
)
