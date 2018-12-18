import React from 'react'
import styled from 'styled-components'

import useInfList, { Service as InfService } from '@/hooks/useInfList'
import useFetcher, { Service as FinService } from '@/hooks/useFetcher'

import TopicList from './TopicList'
import { Place } from './TopicListItem'
import img404 from '@/assets/error.png'

import InfiniteList from '@/components/InfiniteList'
import LoadingCircle from '@/components/LoadingCircle'

import { navigateHandler } from '@/services/utils/errorHandler'

import { ITopic } from '@cc98/api'

interface InfProps {
  service: InfService<ITopic[]>
  place: Place
}
const Img = styled.img`
  width: 60%;
  max-width: 600px;
`
const Center = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const InfTopicList: React.FunctionComponent<InfProps> = ({ service, place }) => {
  const [topics, state, callback] = useInfList(service, { fail: navigateHandler })
  const { isLoading, isEnd } = state

  return (
    <>
      {place === 'search' && topics.length === 0 && !isLoading && (
        <Center>
          <Img src={img404} />
        </Center>
      )}
      <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
        <TopicList topics={topics} place={place} />
      </InfiniteList>
    </>
  )
}

interface FinProps {
  service: FinService<ITopic[]>
  noLoading?: boolean
  place: Place
}

const FinTopicList: React.FunctionComponent<FinProps> = ({ service, noLoading, place }) => {
  const [topics] = useFetcher(service, { fail: navigateHandler })

  if (topics === null) {
    return noLoading ? null : <LoadingCircle />
  }

  return <TopicList topics={topics} place={place} />
}

export { InfTopicList, FinTopicList }
