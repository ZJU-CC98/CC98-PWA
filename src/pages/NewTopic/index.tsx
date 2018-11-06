import React from 'react'

import { Subscribe } from '@cc98/state'

import boardInstance from '@/model/board'

import TopicList from './TopicList'

const NewTopic: React.SFC = () =>
  (
  <Subscribe to={[boardInstance]}>
    {() => <TopicList boards={boardInstance.state.boardData} />}
  </Subscribe >)
export default NewTopic
