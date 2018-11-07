import React from 'react'

import { Subscribe } from '@cc98/state'

import { BoardInfoStore } from '@/model/board'
import { TopicInfoStore } from '@/model/topic'

import Component from './Follow'

interface State {
  topicInstance: TopicInfoStore
}
export default class extends React.Component<{}, State> {
  state: State = {
    topicInstance: new TopicInfoStore(),
  }

  render() {
    const { topicInstance } = this.state

    return (
      <Subscribe
        to={[BoardInfoStore, topicInstance]}
      >
        {
          (data: BoardInfoStore) => data.state.boardData.length !== 0 ?
            <Component boards={data.state.boardData} topicInstance={topicInstance} /> : null
        }
      </Subscribe>
    )

  }
}
