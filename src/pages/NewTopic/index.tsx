import React, { useState, useEffect } from 'react'

import InfiniteList from '@/components/InfiniteList'

import { List, Paper } from '@material-ui/core'

import TopicItem from '@/components/TopicItem'

import { ITopic } from '@cc98/api'
import { getNewTopics } from '@/services/topic'
import { getBoardNameById } from '@/services/board'

interface State {
  from: number
  isLoading: boolean
  isEnd: boolean
}

export default () => {
  const [state, setState] = useState<State>({
    isLoading: false,
    isEnd: false,
    from: 0,
  })
  const { isLoading, isEnd, from } = state
  const [topics, setTopics] = useState<ITopic[]>([])
  useEffect(() => {
    ;(async () => {
      await callback()
    })()
  }, [])

  async function callback() {
    setState({ ...state, isLoading: true })
    const res = await getNewTopics(from)
    // FIXME 异步获取版面名称
    res.fail().succeed(async data => {
      data.forEach(async (info: ITopic) => {
        info.boardName = await getBoardNameById(info.boardId)
      })

      setTopics(prevData => prevData.concat(data))
      setState({
        isLoading: false,
        isEnd: data.length !== 20,
        from: state.from += data.length,
      })
    })
  }

  return (
    <Paper>
      <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
        <List>
          {topics.map((info: ITopic) => (
            <TopicItem key={info.id} data={info} place={'newtopic'} />
          ))}
        </List>
      </InfiniteList>
    </Paper>
  )
}
