import React, { useState } from 'react'

import { Subscribe } from '@cc98/state'

import { BoardInfoStore } from '@/model/board'
import global, { GlobalContainer } from '@/model/global'
import { PostInfoStore } from '@/model/post'

import Topic from './Topic'

interface Props {
  // 如果是普通帖子 路由为/topic/topicId
  topicId: string
  // 如果是追踪匿名版块 路由为/topic/
  postId: string
  userId: string
}

export default (props: Props) => {
  const [postInstance] = useState(new PostInfoStore())
  const { postId, userId, topicId } = props

  return (
    <Subscribe to={[global, postInstance, BoardInfoStore]}>
      {(g: GlobalContainer, p: PostInfoStore, boardInstance: BoardInfoStore) => {
        const isRender = g.state.myInfo

        return isRender ? (
          <Topic
            topicId={topicId}
            postId={postId}
            userId={userId}
            global={g}
            postInstance={postInstance}
            boardInstance={boardInstance}
          />
        ) : null
      }}
    </Subscribe>
  )
}
