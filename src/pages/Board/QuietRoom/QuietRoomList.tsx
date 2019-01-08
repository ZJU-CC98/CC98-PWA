import React from 'react'

import { IBoardStopPostUser } from '@cc98/api'
import { Service } from '@/hooks/useInfList'
import useInfList from '@/hooks/useInfList'
import InfiniteList from '@/components/InfiniteList'

import QuietRoomItem from './QuietRoomItem'

interface Props {
  service: Service<IBoardStopPostUser[]>
  boardId: number
  refreshFunc: () => void
  canManage: boolean
}

const QuietRoomList: React.FC<Props> = ({ service, boardId, refreshFunc, canManage }) => {
  const [users, state, callback] = useInfList(service)
  const { isLoading, isEnd } = state

  return (
    <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
      {users.map(info => (
        <QuietRoomItem
          key={info.userId}
          info={info}
          boardId={boardId}
          refreshFunc={refreshFunc}
          canManage={canManage}
        />
      ))}
    </InfiniteList>
  )
}
export default QuietRoomList
