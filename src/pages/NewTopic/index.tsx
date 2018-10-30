import boardInstance from '@/model/board'
import { Subscribe } from '@cc98/state'
import { css } from 'emotion'
import React from 'react'
import TopicList from './TopicList'
const NewTopic: React.SFC = () =>
  (
  <Subscribe to={[boardInstance]}>
    {() => <TopicList boards={boardInstance.state.boardData} />}
  </Subscribe >)
export default NewTopic
