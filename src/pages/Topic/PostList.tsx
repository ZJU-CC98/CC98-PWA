import React from 'react'

import useInfList, { Service } from '@/hooks/useInfList'

import InfiniteList from '@/components/InfiniteList'
import PostItem from './PostItem'

import { IPost } from '@cc98/api'

interface Props {
  service: Service<IPost[]>
}

export default ({ service }: Props) => {
  const [posts, state, callback] = useInfList(service, {
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
