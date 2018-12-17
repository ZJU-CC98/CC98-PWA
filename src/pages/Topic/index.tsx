import React from 'react'
import styled from 'styled-components'

import useFetcher from '@/hooks/useFetcher'

import { Fab } from '@material-ui/core'

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
const Center = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`

interface Props {
  // 帖子 ID
  topicId: string
  // 追踪非匿名帖子
  userId?: string
  // 追踪匿名帖子
  postId?: string
  // 是否逆向
  reverse?: boolean
  // 刷新
  refresh?: number
}

export default ({ topicId, userId, postId, reverse, refresh }: Props) => {
  const [topicInfo] = useFetcher(() => getTopicInfo(topicId), {
    fail: navigateHandler,
  })

  if (!topicInfo) {
    return <LoadingCircle />
  }

  // 根据 URL 参数选择获取 post 的 service
  const postService = reverse
    ? (from: number) => getReversePost(topicInfo.id, from, topicInfo.replyCount)
    : userId
    ? (from: number) => getTracePost(topicInfo.id, parseInt(userId, 10), from)
    : postId
    ? (from: number) => getAnonymousTracePost(topicInfo.id, parseInt(postId, 10), from)
    : (from: number) => getPost(topicInfo.id, from)

  const hotPostService = () => getHotPost(topicInfo.id)

  // 是否出于追踪状态
  const isTrace = !!userId || !!postId
  // 是否处于反转状态
  const isReverse = !!reverse
  let rsh = refresh || 1

  return (
    <>
      <PostHead topicInfo={topicInfo} />
      {isReverse && (
        <Center>
          <Fab size="small" color="primary">
            <ReverseArrow
              onClick={() => navigate(`/topic/${topicInfo.id}/reverse/true/${++rsh}`)}
            />
          </Fab>
        </Center>
      )}
      <PostList service={postService} isTrace={isTrace} isReverse={isReverse}>
        {!userId && !postId && <PostListHot service={hotPostService} isTrace={isTrace} />}
      </PostList>
      <FixFab bottom={65}>
        <ReverseArrow
          onClick={() =>
            isReverse
              ? navigate(`/topic/${topicInfo.id}`)
              : navigate(`/topic/${topicInfo.id}/reverse/true/${rsh}`)
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
