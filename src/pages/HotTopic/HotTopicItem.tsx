import React, { useState, useEffect } from 'react'
import { navigate } from '@/utils/history'

import { TopicItem } from '@/components/TopicList/TopicListItem'

import { IHotTopic } from '@cc98/api'
import { getBoardNameById } from '@/services/board'

interface Props {
  /**
   * 帖子信息
   */
  data: IHotTopic
}

export default ({ data }: Props) => {
  const [boardName, setBoardName] = useState('')

  useEffect(() => {
    getBoardNameById(data.boardId).then(boardName => setBoardName(boardName))
  }, [])

  return (
    <TopicItem
      onClick={() => navigate(`/topic/${data.id}`)}
      title={data.title}
      subtitle={data.authorName ? data.authorName : '[匿名]'}
      info1={boardName}
      info2={`回贴:${data.replyCount}`}
    />
  )
}
