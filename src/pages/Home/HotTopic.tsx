import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import { css } from 'emotion'

import { List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core'
import Whatshot from '@material-ui/icons/Whatshot'

import LoadingCircle from '@/components/LoadingCircle'
import HotTopicItem from '../HotTopic/HotTopicItem'

import { getHotTopics } from '@/services/topic'
import { IHotTopic } from '@cc98/api'

const hotTopicList = css`
  && {
    padding-left: 15px;
  }
`

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
    <List className={hotTopicList}>
      <ListItem>
        <ListItemIcon>
          <Whatshot />
        </ListItemIcon>
        <ListItemText primary="热门话题" />
      </ListItem>
      <Divider />
      {topics.map(info => (
        <HotTopicItem key={info.id} info={info} click={() => navigate(`/topic/${info.id}`)} />
      ))}
    </List>
  )
}
