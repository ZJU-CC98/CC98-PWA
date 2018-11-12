import React, { useState } from 'react'

import { Subscribe } from '@cc98/state'

import { BoardInfoStore } from '@/model/board'
import { TopicInfoStore } from '@/model/topic'

import Component from './Follow'

export default () => {
  const [topicInstance] = useState(new TopicInfoStore())

  return (
    <Subscribe to={[BoardInfoStore, topicInstance]}>
      {(data: BoardInfoStore) =>
        data.state.boardData.length !== 0 ? (
          <Component boards={data.state.boardData} topicInstance={topicInstance} />
        ) : null
      }
    </Subscribe>
  )
}
