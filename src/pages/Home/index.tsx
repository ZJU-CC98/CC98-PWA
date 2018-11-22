import React from 'react'

import { HotTopicList } from '../HotTopic'
import RecommendReadings from './Recommend'

import { getHotTopics } from '@/services/topic'

const Home: React.FunctionComponent = () => (
  <>
    <RecommendReadings />
    <HotTopicList service={getHotTopics} />
  </>
)

export default Home
