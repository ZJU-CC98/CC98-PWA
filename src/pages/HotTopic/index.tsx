import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'

import { List } from '@material-ui/core'

import LoadingCircle from '@/components/LoadingCircle'
import HotTopicItem from './HotTopicItem'

import { getHotTopics } from '@/services/topic'
import { IHotTopic } from '@cc98/api'

export default () => {
  const [topics, setTopics] = useState<IHotTopic[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ; (async () => {
      setIsLoading(true)
      const res = await getHotTopics()

      res.fail().succeed(hotTopics => {
        setTopics(hotTopics)
        setIsLoading(false)
      })
    })()
  }, [])

  if (isLoading) {
    return <LoadingCircle />
  }

  return (
    <List>
      {topics.map(info => (
        <HotTopicItem key={info.id} info={info} click={() => navigate(`/topic/${info.id}`)} />
      ))}
    </List>
  )
}
