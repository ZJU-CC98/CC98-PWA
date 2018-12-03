import React from 'react'

import useFetcher from '@/hooks/useFetcher'

import LoadingCircle from '@/components/LoadingCircle'

import PostHead from './PostHead'
import PostListHot from './PostListHot'
import PostList from './PostList'

import { getTopicInfo } from '@/services/topic'
import { getPost, getTracePost, getAnonymousTracePost, getHotPost } from '@/services/post'

import { navigate } from '@/utils/history'

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
    fail: err => {
      if (err.status === 403) {
        navigate('/error/403')
      } else if (err.status === 401) {
        navigate('/error/401')
      }
    },
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

  return (
    <>
      <PostHead topicInfo={topicInfo} />
      <PostList service={postService}>
        {!userId && !postId && <PostListHot service={hotPostService} />}
      </PostList>
    </>
  )
}
