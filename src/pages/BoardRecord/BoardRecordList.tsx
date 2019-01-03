import React from 'react'


import RecordItem from './BoardRecordItem'

import { IBoardEvent } from '@cc98/api'
import { Service } from '@/hooks/useInfList'
import useInfList from '@/hooks/useInfList'
import InfiniteList from '@/components/InfiniteList'

interface Props {
  service: Service<IBoardEvent[]>
}

const RecordList: React.FC<Props> = ({ service }) => {
  const [events, state, callback] = useInfList(service)
  const { isLoading, isEnd } = state

  return (
    <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
      {events.map(info => (
        <RecordItem key={info.id} eventInfo={info} />
      ))}
    </InfiniteList>
  )
}

export default RecordList
