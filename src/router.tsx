import React from 'react'
// https://reach.tech/router/api/Router
import { Router, Location, RouteComponentProps, WindowLocation } from '@reach/router'

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
import Topic from './pages/Topic'
import UserCenter from './pages/UserCenter'
import UserCenterEdit from './pages/UserCenter/Edit'
import About from './pages/About'

const Route: React.FunctionComponent<
  RouteComponentProps & {
    // @types/react 里 createElement 签名很混乱
    // tslint:disable-next-line:no-any
    component: any
    // component: React.FunctionComponent<any>
  }
> = props => {
  const { path, component, ...otherProps } = props

  return React.createElement(component, otherProps)
}

interface ILocation {
  location: WindowLocation
}

const MyRouter: React.FunctionComponent<ILocation> = ({ location }) => (
  <Router location={location}>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
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

    <Route path="/logIn" component={LogIn} />
    <Route path="/error/401" component={Page401} />
    <Route path="/error/403" component={Page403} />
    <Route path="/error/404" component={Page404} />
    <Route default component={Page404} />
  </Router>
)

/**
 * 路由级页面缓存
 */
const _ROUTER_CACHE: WindowLocation[] = []

const CacheRouter: React.FunctionComponent<ILocation> = ({ location }) => {
  if (_ROUTER_CACHE.length > 5) {
    _ROUTER_CACHE.shift()
  }
  _ROUTER_CACHE.push({ ...location })

  return (
    <>
      {_ROUTER_CACHE.map(backLoc => (
        <div
          key={backLoc.href}
          style={{ display: backLoc.href === location.href ? 'block' : 'none' }}
        >
          <MyRouter location={backLoc} />
        </div>
      ))}
    </>
  )
}

const RootRouter: React.FunctionComponent = React.memo(() => (
  <Location>{({ location }) => <CacheRouter location={location} />}</Location>
))

export default RootRouter

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

    if (moveLen > 150) {
      window.history.back()
    }
    if (moveLen < -150) {
      window.history.back()
    }
  },
  false
)
