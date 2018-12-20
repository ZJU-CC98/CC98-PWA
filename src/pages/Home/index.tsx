import React from 'react'

import useFetcher from '@/hooks/useFetcher'

import RecommendReadings from './Recommend'

import { getHomeInfo } from '@/services/global'
import { notificationHandler } from '@/services/utils/errorHandler'

const Home: React.FunctionComponent = () => {
  const [data] = useFetcher(getHomeInfo, {
    fail: notificationHandler,
  })

  if (data === null) {
    return null
  }
  return (
    <>
      {/*<Announcement content={data.announcement} />*/}
      <RecommendReadings recommendationReading={data.recommendationReading} />
    </>
  )
}

export default Home
