import React, { useState, useEffect } from 'react'

import { navigate } from '@reach/router'

import TopicItem from '@/components/TopicItem'
import InfiniteList from '@/components/InfiniteList'

import { getTopicsInBoard, getTopTopics } from '@/services/topic'
import { List } from '@material-ui/core'
import { ITopic } from '@cc98/api'

interface Props {
  id: string
  tags: Tag[]
}

interface State {
  from: number
  isLoading: boolean
  isEnd: boolean
}

interface Tag {
  name: string
  id: number
}

export default (props: Props) => {
  const { tags, id } = props
  const tag1 = tags[0]
  const tag2 = tags[1]
  const [state, setState] = useState<State>({
    isLoading: false,
    isEnd: false,
    from: 0,
  })
  const [topics, setTopics] = useState<ITopic[]>([])
  const { isLoading, isEnd } = state

  useEffect(() => {
    ; (async () => {
      await getTopTopicsInBoard()
      await getTopics()
    })()
  }, [])

  async function getTopTopicsInBoard() {
    const newTopicsTry = await getTopTopics(id)
    newTopicsTry.fail().succeed(newTopics => {
      setTopics(prevTopics => prevTopics.concat(newTopics))
    })
  }

  async function getTopics() {
    setState({ ...state, isLoading: true })
    const _newTopicsTry = await getTopicsInBoard(id, state.from, 20, tag1.id, tag2.id)

    // tslint:disable-next-line:no-any
    const newTopicsTry = _newTopicsTry.map((t: any) => {
      if (t.count) {
        return t.topics as ITopic[]
      }

      return t as ITopic[]
    })

    newTopicsTry
      .fail(() => navigate('error/403'))
      .succeed(newTopics => {
        setTopics(prevTopics => prevTopics.concat(newTopics))
        setState({
          isLoading: false,
          isEnd: newTopics.length !== 20,
          from: state.from += newTopics.length,
        })
      })
  }

  return (
    <List style={{ width: '100%' }}>
      <InfiniteList
        isLoading={isLoading}
        isEnd={isEnd}
        callback={() => {
          getTopics()
        }}
      >
        {topics.map(topic => (
          <TopicItem key={topic.id} data={topic} place={'inboard'} />
        ))}
      </InfiniteList>
    </List>
  )
}
