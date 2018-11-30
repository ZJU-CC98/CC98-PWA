import React from 'react'
import styled from 'styled-components'

import useFetcher, { Service } from '@/hooks/useFetcher'
import PostItem from './PostItem'

import { IPost } from '@cc98/api'

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

interface Props {
  service: Service<IPost[]>
}

export default ({ service }: Props) => {
  const [posts] = useFetcher(service)

  if (posts === null) {
    return null
  }

  return (
    <WrapperDiv>
      {posts.map((info: IPost) => (
        <PostItem key={info.id} postInfo={info} />
      ))}
    </WrapperDiv>
  )
}
