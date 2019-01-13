import React, { useState } from 'react'

import useFetcher from '@/hooks/useFetcher'
import useDelay from '@/hooks/useDelay'
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
  delay?: number
}

export const HotTopicList: React.FC<Props> = ({ service, delay = 0 }) => {
  const [topics] = useFetcher(service, {
    fail: notificationHandler,
  })
  const isResolve = useDelay(delay)

  if (topics === null || !isResolve) {
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
        variant="fullWidth"
      >
        <Tab value="day" label="今日热门" />
        <Tab value="week" label="本周热门" />
        <Tab value="month" label="本月热门" />
        <Tab value="history" label="历史上的今天" />
      </Tabs>

      {current === 'day' && <HotTopicList service={getHotTopics} delay={300} />}
      {current === 'week' && <FinTopicList service={getWeeklyHotTopics} place="hot" delay={300} />}
      {current === 'month' && (
        <FinTopicList service={getMonthlyHotTopics} place="hot" delay={300} />
      )}
      {current === 'history' && (
        <FinTopicList service={getHistoryHotTopics} place="hot" delay={300} />
      )}
    </>
  )
}
