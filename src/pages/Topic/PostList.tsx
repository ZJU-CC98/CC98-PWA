import React from 'react'

import useInfList from '@/hooks/useInfList'

import InfiniteList from '@/components/InfiniteList'
import PostItem from './PostItem'

import { getPost } from '@/services/post'
import { IPost, ITopic } from '@cc98/api'

interface Props {
  topicInfo: ITopic
}

export default ({ topicInfo }: Props) => {
  const [posts, state, callback] = useInfList((from: number) => getPost(topicInfo.id, from), {
    step: 10,
  })
  const { isLoading, isEnd } = state

  return (
    <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
      {posts.map((info: IPost) => (
        <PostItem key={info.id} postInfo={info} />
      ))}
    </InfiniteList>
  )
}
