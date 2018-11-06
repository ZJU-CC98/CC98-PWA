import React from 'react'

import { Subscribe } from '@cc98/state'

import boardInstance from '@/model/board'
import { TopicInfoStore } from '@/model/topic'

import TopicList from './TopicList'
import Topic from '../Topic';

const NewTopic: React.SFC = () =>
  (
    <Subscribe to={[boardInstance, TopicInfoStore]}>
      {(b, t: TopicInfoStore) => {
        if (!t.state.searchMes) {
          t.init(null, 'newtopic')
        }

        return <TopicList boards={b.state.boardData} topicInstance={t} />
      }}
    </Subscribe >)
export default NewTopic
