import { css } from 'emotion'
import React from 'react'
import boardInstance from '@/model/board'
import TopicList from './TopicList'
import { Subscribe } from '@cc98/state'
const NewTopic: React.SFC = () =>
  (<Subscribe to={[boardInstance]}>
    {() => <TopicList boards={boardInstance.state.boardData}/>}
  </Subscribe >)
export default NewTopic
