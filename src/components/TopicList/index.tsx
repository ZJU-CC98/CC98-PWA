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

const Img = styled.img`
  width: 60%;
  max-width: 600px;
`
const CenterDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

/**
 * 空列表占位，表示 InfList 什么都没有
 */
const EmtpyList = () => (
  <CenterDiv>
    <Img src={img404} />
  </CenterDiv>
)

interface InfProps {
  service: InfService<ITopic[]>
  place: Place
}

const InfTopicList: React.FunctionComponent<InfProps> = ({ service, place }) => {
  const [topics, state, callback] = useInfList(service, { fail: navigateHandler })
  const { isLoading, isEnd } = state

  return (
    <>
      {isEnd && topics.length === 0 && <EmtpyList />}
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
