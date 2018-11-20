import React from 'react'

import { TopicList } from '../HotTopic'
import RecommendReadings from './Recommend'

import { getHotTopics } from '@/services/topic'

const Home: React.FunctionComponent = () => (
  <>
    <RecommendReadings />
    <TopicList service={getHotTopics} />
  </>
)

export default Home
