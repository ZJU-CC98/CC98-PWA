import React from 'react'

import useFetcher from '@/hooks/useFetcher'

// import Announcement from './Announcement'
import RecommendReadings from './Recommend'

import { getHomeInfo } from '@/services/global'
import { notificationHandler } from '@/services/utils/errorHandler'

const Home: React.FC = () => {
  const [homeInfo] = useFetcher(getHomeInfo, {
    fail: notificationHandler,
  })

  if (homeInfo === null) {
    return null
  }

  return (
    <>
      {/* <Announcement content={homeInfo.announcement} /> */}
      <RecommendReadings recommendationReading={homeInfo.recommendationReading} />
    </>
  )
}

export default Home
