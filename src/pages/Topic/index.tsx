import React from 'react'
import styled from 'styled-components'

import useFetcher from '@/hooks/useFetcher'

import EditIcon from '@material-ui/icons/Edit'

import FixFab from '@/components/FixFab'
import LoadingCircle from '@/components/LoadingCircle'

import PostHead from './PostHead'
import PostListHot from './PostListHot'
import PostList from './PostList'

import { getTopicInfo } from '@/services/topic'
import { getPost, getTracePost, getAnonymousTracePost, getHotPost } from '@/services/post'
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
}

export default ({ topicId, userId, postId }: Props) => {
  const [topicInfo] = useFetcher(() => getTopicInfo(topicId), {
    fail: navigateHandler,
  })

  if (!topicInfo) {
    return <LoadingCircle />
  }

  // 根据 URL 参数选择获取 post 的 service
  const postService = userId
    ? (from: number) => getTracePost(topicInfo.id, parseInt(userId, 10), from)
    : postId
    ? (from: number) => getAnonymousTracePost(topicInfo.id, parseInt(postId, 10), from)
    : (from: number) => getPost(topicInfo.id, from)

  const hotPostService = () => getHotPost(topicInfo.id)

  // 是否出于追踪状态
  const isTrace = !!userId || !!postId

  return (
    <>
      <PostHead topicInfo={topicInfo} />
      <PostList service={postService} isTrace={isTrace}>
        {!userId && !postId && <PostListHot service={hotPostService} isTrace={isTrace} />}
      </PostList>
      <FixFab>
        <EditIcon onClick={() => navigate(`/editor/replyTopic/${topicInfo.id}`)} />
      </FixFab>
      <EndPlaceholder />
    </>
  )
}
