import React from 'react'

import { IBoardStopPostUser } from '@cc98/api'
import { Service } from '@/hooks/useInfList'
import useInfList from '@/hooks/useInfList'
import InfiniteList from '@/components/InfiniteList'

import QuietRoomItem from './QuietRoomItem'

interface Props {
  service: Service<IBoardStopPostUser[]>
  boardId: string | number
}

const QuietRoomList: React.FC<Props> = ({ service, boardId }) => {
  const [users, state, callback] = useInfList(service)
  const { isLoading, isEnd } = state

  // TODO: no TPUser's information
  return (
    <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
      {users.map(info => (
        <QuietRoomItem key={info.userId} info={info} boardId={boardId} />
      ))}
    </InfiniteList>
  )
}
export default QuietRoomList
