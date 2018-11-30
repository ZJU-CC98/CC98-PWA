import React from 'react'

import useFetcher from '@/hooks/useFetcher'

import LoadingCircle from '@/components/LoadingCircle'

import PostHead from './PostHead'
import PostList from './PostList'

import { getTopicInfo } from '@/services/topic'

import { navigate } from '@/utils/history'

interface Props {
  // 帖子 ID
  topicId?: string
  // 追踪非匿名帖子
  userId?: string
  // 追踪匿名帖子
  postId?: string
}

export default ({ topicId }: Props) => {
  if (!topicId) {
    return
  }

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

  return (
    <>
      <PostHead topicInfo={topicInfo} />
      <PostList topicInfo={topicInfo} />
    </>
  )
}
