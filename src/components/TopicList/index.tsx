import React from 'react'

import useInfList, { Service as InfService } from '@/hooks/useInfList'
import useFetcher, { Service as FinService } from '@/hooks/useFetcher'

import TopicList from './TopicList'
import { Place } from './TopicListItem'

import InfiniteList from '@/components/InfiniteList'
import LoadingCircle from '@/components/LoadingCircle'

import { ITopic } from '@cc98/api'

interface InfProps {
  service: InfService<ITopic[]>
  place: Place
}

const InfTopicList: React.FunctionComponent<InfProps> = ({ service, place }) => {
  const [topics, state, callback] = useInfList(service)
  const { isLoading, isEnd } = state

  return (
    <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
      <TopicList topics={topics} place={place} />
    </InfiniteList>
  )
}

interface FinProps {
  service: FinService<ITopic[]>
  noLoading?: boolean
  place: Place
}

const FinTopicList: React.FunctionComponent<FinProps> = ({ service, noLoading, place }) => {
  const [topics] = useFetcher(service)

  if (topics === null) {
    return noLoading ? null : <LoadingCircle />
  }

  return <TopicList topics={topics} place={place} />
}

export { InfTopicList, FinTopicList }
