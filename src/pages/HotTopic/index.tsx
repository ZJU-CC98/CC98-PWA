import React, { useState } from 'react'

import useFetcher from '@/hooks/useFetcher'

import { List, Tab, Tabs } from '@material-ui/core'

import LoadingCircle from '@/components/LoadingCircle'
import HotTopicItem from './HotTopicItem'

import {
  getHotTopics,
  getWeeklyHotTopics,
  getMonthlyHotTopics,
  getHistoryHotTopics,
} from '@/services/topic'

interface Props {
  service: typeof getHotTopics
}

export const TopicList: React.FunctionComponent<Props> = ({ service }) => {
  const [topics] = useFetcher(service)

  if (topics === null) {
    return <LoadingCircle />
  }

  return (
    <List>
      {topics.map(info => (
        <HotTopicItem key={info.id} info={info} />
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

      {current === 'day' && <TopicList service={getHotTopics} />}
      {current === 'week' && <TopicList service={getWeeklyHotTopics} />}
      {current === 'month' && <TopicList service={getMonthlyHotTopics} />}
      {current === 'history' && <TopicList service={getHistoryHotTopics} />}
    </>
  )
}
