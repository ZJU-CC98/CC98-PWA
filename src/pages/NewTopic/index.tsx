import React, { useState } from 'react'

import { Subscribe } from '@cc98/state'

import { BoardInfoStore } from '@/model/board'
import { TopicInfoStore } from '@/model/topic'

import TopicList from './TopicList'

export default () => {
  const [topicInstance] = useState(new TopicInfoStore())

  return (
    <Subscribe to={[BoardInfoStore, topicInstance]}>
      {(b: BoardInfoStore) => {
        if (!topicInstance.state.searchMes) {
          topicInstance.init(null, 'newtopic')
        }

        return <TopicList boards={b.state.boardData} topicInstance={topicInstance} />
      }}
    </Subscribe>
  )
}
