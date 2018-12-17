import React, { useState } from 'react'

import useFetcher from '@/hooks/useFetcher'
import { FinTopicList } from '@/components/TopicList'

import { List, Tab, Tabs } from '@material-ui/core'

import LoadingCircle from '@/components/LoadingCircle'
import HotTopicItem from './HotTopicItem'

import {
  getHotTopics,
  getWeeklyHotTopics,
  getMonthlyHotTopics,
  getHistoryHotTopics,
} from '@/services/topic'
import { notificationHandler } from '@/services/utils/errorHandler'

interface Props {
  service: typeof getHotTopics
}

export const HotTopicList: React.FunctionComponent<Props> = ({ service }) => {
  const [topics] = useFetcher(service, {
    fail: notificationHandler,
  })

  if (topics === null) {
    return <LoadingCircle />
  }

  return (
    <List>
      {topics.map(data => (
        <HotTopicItem key={data.id} data={data} />
      ))}
    </List>
  )
}

export default () => {
  const [current, setCurrent] = useState('day')

  const handleChange = (_: React.ChangeEvent, value: string) => {
    setCurrent(value)
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

      {current === 'day' && <HotTopicList service={getHotTopics} />}

      {current === 'week' && <FinTopicList service={getWeeklyHotTopics} place="hot" />}
      {current === 'month' && <FinTopicList service={getMonthlyHotTopics} place="hot" />}
      {current === 'history' && <FinTopicList service={getHistoryHotTopics} place="hot" />}
    </>
  )
}
