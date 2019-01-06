import React from 'react'
import styled from 'styled-components'

import useFetcher from '@/hooks/useFetcher'

import { navigateHandler } from '@/services/utils/errorHandler'
import { getBoardInfo, getBoardStopPostUser } from '@/services/board'

import QuietRoomList from './QuietRoomList'
import QuietRoomHead from '../components/BoardItemHead'

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

interface Props {
  /**
   * 版面 ID
   */
  id: string
}

export default ({ id }: Props) => {
  const [board] = useFetcher(() => getBoardInfo(id), {
    fail: navigateHandler,
  })

  if (board === null) {
    return null
  }

  return (
    <WrapperDiv>
      <QuietRoomHead itemName="小黑屋" BoardInfo={board} />
      <QuietRoomList
        service={(from: number) => getBoardStopPostUser(id, from)}
        boardId={board.id}
      />
    </WrapperDiv>
  )
}
