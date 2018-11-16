import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import { css } from 'emotion'

import { List, ListItem, ListItemText, ListItemIcon, Divider, Tab, Tabs } from '@material-ui/core'
import Whatshot from '@material-ui/icons/Whatshot'

import LoadingCircle from '@/components/LoadingCircle'
import HotTopicItem from './HotTopicItem'

import {
  getHotTopics,
  getMonthlyHotTopics,
  getWeeklyHotTopics,
  getHistoryHotTopics,
} from '@/services/topic'
import { IHotTopic } from '@cc98/api'
import { FetchError } from '@/utils/fetch'
import { Try } from '@/utils/fp/Try'
import { getBoardNameById } from '@/services/board'

const hotTopicList = css`
  && {
    padding-left: 15px;
  }
`

export default () => {
  const [topics, setTopics] = useState<IHotTopic[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [current, setCurrent] = useState('day')
  useEffect(() => {
    ;(async () => {
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

  // tslint:disable-next-line:no-any
  const handleChange = async (e: any, value: string) => {
    setCurrent(value)
    let res: Try<IHotTopic[], FetchError> | null = null
    switch (value) {
      case 'day':
        res = await getHotTopics()
        break
      case 'week':
        res = await getWeeklyHotTopics()
        break
      case 'month':
        res = await getMonthlyHotTopics()
        break
      case 'history':
        res = await getHistoryHotTopics()
        break
    }
    if (res) {
      res.fail().succeed(async data => {
        const res = await Promise.all(
          data.map(async t => {
            t.boardName = await getBoardNameById(t.boardId)

            return t
          })
        )
        setTopics(res)
      })
    }
  }

  return (
    <>
      <Tabs
        value={current}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        fullWidth
      >
        <Tab value="day" label="今日热门" />
        <Tab value="week" label="本周热门" />
        <Tab value="month" label="本月热门" />
        <Tab value="history" label="历史上的今天" />
      </Tabs>

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
    </>
  )
}
