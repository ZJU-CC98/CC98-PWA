import React from 'react'

import { Subscribe } from '@cc98/state'

import { BoardInfoStore } from '@/model/board'
import { TopicInfoStore } from '@/model/topic'

import TopicList from './TopicList'

interface State {
  topicInstance: TopicInfoStore,
}
export default class extends React.Component<{}, State> {
  state: State = {
    topicInstance: new TopicInfoStore(),
  }

  render() {
    const { topicInstance } = this.state

    return (
      <Subscribe to={[BoardInfoStore, topicInstance]}>
        {(b: BoardInfoStore) => {
          if (!topicInstance.state.searchMes) {
            topicInstance.init(null, 'newtopic')
          }

          return <TopicList boards={b.state.boardData} topicInstance={topicInstance} />
        }}
      </Subscribe >)
  }
}
