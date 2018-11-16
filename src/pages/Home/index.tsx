import React from 'react'

import HotTopics from './HotTopic'
import RecommendReadings from './Recommend'

const Home: React.FunctionComponent = () => (
  <>
    <RecommendReadings />
    <HotTopics />
  </>
)

export default Home
