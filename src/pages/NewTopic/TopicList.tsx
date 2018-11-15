import React from 'react'

import { TopicInfoStore } from '@/model/topic'

import InfiniteList from '@/components/InfiniteList'

import { List, Paper } from '@material-ui/core'

import TopicItem from '@/components/TopicItem'

import { IBoardGroup, ITopic } from '@cc98/api'
import { getBoardNameById } from '@/services/board'

interface Props {
  boards: IBoardGroup[]
  topicInstance: TopicInfoStore
}

export default (props: Props) => {
  const { topicInstance, boards } = props
  const { isLoading, isEnd, topics } = topicInstance.state
  const { getTopics } = topicInstance

  return (
    <Paper>
      <InfiniteList
        isLoading={isLoading}
        isEnd={isEnd}
        callback={() => {
          getTopics(null, 'newtopic')
        }}
      >
        <List>
          {topics.map((info: ITopic) => {
            const boardName = getBoardNameById(boards, info.boardId)
            const topic = { boardName, ...info }

            return <TopicItem key={topic.id} data={topic} place={'newtopic'} />
          })}
        </List>
      </InfiniteList>
    </Paper>
  )
}
