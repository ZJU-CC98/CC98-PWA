import React from 'react'

import { InfTopicList } from '@/components/TopicList'

import { getNewTopics } from '@/services/topic'

export default () => <InfTopicList service={getNewTopics} place="newtopic" />
