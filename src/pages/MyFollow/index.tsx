import React, { useState, useEffect } from 'react'
import { css } from 'emotion'

import TopicItem from '@/components/TopicItem'
import InfiniteList from '@/components/InfiniteList'

import { List, Tab, Tabs } from '@material-ui/core'

import { getFollowBoardsTopics, getFollowUsersTopics } from '@/services/topic'
import { ITopic } from '@cc98/api'
import { getBoardNameById } from '@/services/board'

interface State {
  isLoading: boolean
  isEnd: boolean
  b_topics: ITopic[]
  b_from: number
  u_topics: ITopic[]
  u_from: number
}

const indexStyle = css`
  && {
    min-height: 90vh;
  }
`

export default () => {
  const [state, setState] = useState<State>({
    isLoading: false,
    isEnd: false,
    b_topics: [],
    b_from: 0,
    u_topics: [],
    u_from: 0,
  })
  const [current, setCurrent] = useState('board')
  const { b_topics, u_topics, b_from, u_from, isEnd, isLoading } = state

  useEffect(() => {
    if (current === 'board') {
      getFollowBTopics()
    } else {
      getFolloweeTopics()
    }
  }, [])

  const changeFocus = () => {
    if (current === 'board') {
      getFolloweeTopics()
    } else {
      getFollowBTopics()
    }
    setCurrent(prevCurrent => (prevCurrent === 'board' ? 'user' : 'board'))
  }

  const getFollowBTopics = async () => {
    setState({ ...state, isLoading: true })

    const topicsTry = await getFollowBoardsTopics(b_from)
    topicsTry.map(async topicList => {
      const result = await Promise.all(
        topicList.map(async topic => {
          topic.boardName = await getBoardNameById(topic.boardId)

          return topic
        })
      )
      setState(prevState => ({
        ...prevState,
        b_topics: prevState.b_topics.concat(result),
        b_from: prevState.b_from + topicList.length,
        isLoading: false,
        isEnd: topicList.length !== 20,
      }))
    })
  }

  const getFolloweeTopics = async () => {
    setState({ ...state, isLoading: true })
    const topicsTry = await getFollowUsersTopics(u_from)
    topicsTry.fail().succeed(async topicList => {
      const result = await Promise.all(
        topicList.map(async topic => {
          topic.boardName = await getBoardNameById(topic.boardId)

          return topic
        })
      )
      setState(prevState => ({
        ...prevState,
        u_topics: prevState.u_topics.concat(result),
        u_from: prevState.u_from + topicList.length,
        isLoading: false,
        isEnd: topicList.length !== 20,
      }))
    })
  }

  const topics = current === 'board' ? b_topics : u_topics

  return (
    <div className={indexStyle}>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        fullWidth
        value={current}
        onChange={changeFocus}
      >
        <Tab value="board" label="关注版面" />
        <Tab value="user" label="关注用户" />
      </Tabs>

      <InfiniteList
        isLoading={isLoading}
        isEnd={isEnd}
        callback={current === 'board' ? getFollowBTopics : getFolloweeTopics}
      >
        <List>
          {topics.map(topic => (
            <TopicItem key={topic.id} data={topic} place={'follow'} />
          ))}
        </List>
      </InfiniteList>
    </div>
  )
}
