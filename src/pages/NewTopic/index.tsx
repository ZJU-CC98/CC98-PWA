import React from 'react'

import TopicList from '@/components/TopicList'

import { getNewTopics } from '@/services/topic'

export default () => <TopicList service={getNewTopics} />
