import React, { useState } from 'react'
import styled from 'styled-components'

import useFetcher from '@/hooks/useFetcher'

import { Button } from '@material-ui/core'

import EditIcon from '@material-ui/icons/Edit'
import ReverseArrow from '@material-ui/icons/RotateRight'

import FixFab from '@/components/FixFab'
import LoadingCircle from '@/components/LoadingCircle'

import PostHead from './PostHead'
import PostListHot from './PostListHot'
import PostList from './PostList'

import { getTopicInfo } from '@/services/topic'
import {
  getPost,
  getReversePost,
  getTracePost,
  getAnonymousTracePost,
  getHotPost,
} from '@/services/post'
import { navigateHandler } from '@/services/utils/errorHandler'

import { navigate } from '@/utils/history'

const EndPlaceholder = styled.div`
  height: 64px;
`

interface Props {
  // 帖子 ID
  topicId: string
  // 追踪非匿名帖子
  userId?: string
  // 追踪匿名帖子
  postId?: string
  // 是否逆向
  reverse?: string
  // 刷新参数
  refresh?: string
}

export default ({ topicId, userId, postId, reverse, refresh }: Props) => {
  const [topicInfo] = useFetcher(() => getTopicInfo(topicId), {
    fail: navigateHandler,
  })
  console.log('refresh params = ' + reverse)

  // 用于刷新
  const [postListKey, setPostListKey] = useState(0)

  if (!topicInfo) {
    return <LoadingCircle />
  }

  // 根据 URL 参数选择获取 post 的 service
  const postService = reverse
    ? (from: number) => getReversePost(topicInfo.id, from, topicInfo.replyCount)
    : userId
    ? (from: number) => getTracePost(topicInfo.id, userId, from)
    : postId
    ? (from: number) => getAnonymousTracePost(topicInfo.id, postId, from)
    : (from: number) => getPost(topicInfo.id, from)

  const hotPostService = () => getHotPost(topicInfo.id)

  // 是否处于追踪状态
  const isTrace = !!userId || !!postId
  // 是否处于反转状态
  const isReverse = !!reverse

  return (
    <>
      <PostHead topicInfo={topicInfo} />
      {isReverse && (
        <Button fullWidth color="primary" onClick={() => setPostListKey(postListKey + 1)}>
          <ReverseArrow />
        </Button>
      )}
      <PostList key={postListKey} service={postService} isTrace={isTrace}>
        {!isTrace && <PostListHot service={hotPostService} />}
      </PostList>
      <FixFab bottom={65}>
        <ReverseArrow
          onClick={() =>
            isReverse
              ? navigate(`/topic/${topicInfo.id}`)
              : navigate(`/topic/${topicInfo.id}/reverse`)
          }
        />
      </FixFab>
      <FixFab>
        <EditIcon onClick={() => navigate(`/editor/replyTopic/${topicInfo.id}`)} />
      </FixFab>
      <EndPlaceholder />
    </>
  )
}
