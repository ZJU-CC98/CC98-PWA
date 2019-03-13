import React, { useState, useEffect } from 'react'

import StickyHeadBar from '@/components/StickyBar/StickyHeadBar'
import PostActions from './PostActions'

import historyModel from '@/models/history'

import { ITopic } from '@cc98/api'
import { getBoardNameById } from '@/services/board'

import { navigate } from '@/utils/history'

interface Props {
  topicInfo: ITopic
  refreshFunc: () => void
}

const PostHead: React.FC<Props> = ({ topicInfo, refreshFunc }) => {
  const [boardName, setBoardName] = useState('')

  useEffect(() => {
    getBoardNameById(topicInfo.boardId).then(boardName => setBoardName(boardName))
  }, [topicInfo.boardId])

  useEffect(() => {
    historyModel.PUSH({
      id: topicInfo.id,
      title: topicInfo.title,
      lastViewTime: Date.now(),
    })
  }, [])

  return (
    <StickyHeadBar
      title={topicInfo.title}
      subTitle={boardName}
      subTitleClick={() => navigate(`/board/${topicInfo.boardId}`)}
      action={<PostActions topicInfo={topicInfo} refreshFunc={refreshFunc} />}
    />
  )
}

export default PostHead
