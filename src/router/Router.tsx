import React from 'react'
// https://reach.tech/router/api/Router
import { Router, RouteComponentProps, WindowLocation } from '@reach/router'

import BoardList from '@/pages/BoardList'
import Board from '@/pages/Board'
import BoardRecord from '@/pages/Board/BoardRecord'
import BoardQuietRoom from '@/pages/Board/QuietRoom'
import Editor from '@/pages/Editor'
import Home from '@/pages/Home'
import HotTopic from '@/pages/HotTopic'
import MessageDetail from '@/pages/Message/Detail'
import MessageList from '@/pages/Message/List'
import MyFollow from '@/pages/MyFollow'
import Recommedation from '@/pages/Recommedation'
import NewTopic from '@/pages/NewTopic'
import Search from '@/pages/Search'
import Setting from '@/pages/Setting'
import Topic, { TopicReverse } from '@/pages/Topic'
import UserCenter from '@/pages/UserCenter'
import UserCenterEdit from '@/pages/UserCenter/Edit'
import Help from '@/pages/Help'
import History from '@/pages/History'

import LogIn from '@/pages/LogIn'
import Error from '@/pages/Error'

export const Route: React.FC<
  RouteComponentProps & {
    // @types/react 里 createElement 签名很混乱
    component: any
    // component: React.FC<any>
  }
> = props => {
  const { path, component, ...otherProps } = props

  return React.createElement(component, otherProps)
}

export interface ILocation {
  location: WindowLocation
}

const MyRouter: React.FC<ILocation> = ({ location }) => (
  <Router location={location}>
    <Route path="/" component={Home} />

    <Route path="help/*" component={Help} />

    <Route path="hotTopics" component={HotTopic} />
    <Route path="newTopics" component={NewTopic} />

    <Route path="topic/:topicId" component={Topic} />
    <Route path="topic/:topicId/:page" component={Topic} />
    <Route path="topic/:topicId/reverse" component={TopicReverse} />
    <Route path="topic/:topicId/anonymous/trace/:postId" component={Topic} />
    <Route path="topic/:topicId/trace/:userId" component={Topic} />

    <Route path="myFollow" component={MyFollow} />
    <Route path="search" component={Search} />

    <Route path="boardList" component={BoardList} />
    <Route path="board/:id" component={Board} />
    <Route path="board/:id/record" component={BoardRecord} />
    <Route path="board/:id/quietRoom" component={BoardQuietRoom} />

    <Route path="userCenter" component={UserCenter} />
    <Route path="userCenter/edit" component={UserCenterEdit} />
    <Route path="user/:id" component={UserCenter} />

    <Route path="recommedation" component={Recommedation} />

    <Route path="editor/postTopic/:boardId" component={Editor} />
    <Route path="editor/replyTopic/:topicId/" component={Editor} />
    <Route path="editor/replyTopic/:topicId/quote/:floor" component={Editor} />
    <Route path="editor/edit/:postId" component={Editor} />

    <Route path="history" component={History} />

    <Route path="setting" component={Setting} />
    <Route path="messageList" component={MessageList} />
    <Route path="messageDetail/:id" component={MessageDetail} />

    <Route path="logIn" component={LogIn} />
    <Route path="error/*" component={Error} />
    <Route default component={Error} />
  </Router>
)

export default React.memo(({ location }: ILocation) => <MyRouter location={location} />)
