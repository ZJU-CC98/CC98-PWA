import React, { useState } from 'react'
import styled from 'styled-components'
import { navigate } from '@/utils/history'

import useFetcher from '@/hooks/useFetcher'

import { InfTopicList, FinTopicList } from '@/components/TopicList'

import BoardHead from './BoardHead'
import BoardTags from './BoardTags'

import { getBoardInfo, getBoardTags } from '@/services/board'
import { getTopicsInBoard, getTopTopics } from '@/services/topic'

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
    fail: err => {
      if (err.status === 403) {
        navigate('/error/403')
      } else if (err.status === 401) {
        navigate('/error/401')
      }
    },
    success: data => {
      // 外网不可见的版面
      if (data.internalState === 1) {
        navigate('/error/401')
      }
    },
  })

  const [boardTags] = useFetcher(() => getBoardTags(id))
  const [tagIDs, setTagIDs] = useState<[number, number]>([-1, -1])

  const onTagChange = (tagID: number, index: number) => {
    if (index === 0) {
      setTagIDs([tagID, tagIDs[1]])
    } else {
      setTagIDs([tagIDs[0], tagID])
    }
  }

  return (
    <WrapperDiv>
      {board && <BoardHead data={board} />}

      <BoardTags boardTags={boardTags} onChange={onTagChange} />

      <FinTopicList service={() => getTopTopics(id)} place="inboard" noLoading />

      <InfTopicList
        key={`${tagIDs[0]}-${tagIDs[1]}`}
        service={(from: number) => getTopicsInBoard(id, from, 20, tagIDs[0], tagIDs[1])}
        place="inboard"
      />
    </WrapperDiv>
  )
}
