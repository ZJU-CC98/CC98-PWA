import React, { useState } from 'react'
import styled from 'styled-components'

import { Paper, Divider } from '@material-ui/core'

import Header from './Header'
import Content from './Content'
import Actions from './Actions'
import Awards from './Awards'

import { getSinglePost } from '@/services/post'
import { IPost, IUser } from '@cc98/api'

const Wrapper = styled(Paper).attrs({
  square: true,
  elevation: 0,
})`
  && {
    margin-top: 6px;
  }
`

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 用户信息
   */
  userInfo: IUser | undefined
  /**
   * 是否热帖
   */
  isHot?: boolean
  /**
   * 是否追踪
   */
  isTrace: boolean
}

export default ({ postInfo, userInfo, isHot, isTrace }: Props) => {
  if (postInfo.isDeleted) {
    return null
  }
  const [currentPost, setCurrentPost] = useState<IPost>(postInfo)

  const refreshPost = async () => {
    const res = await getSinglePost(postInfo.topicId, postInfo.floor - 1)
    res.fail().succeed(data => {
      if (data.length && data.length === 1) {
        setCurrentPost(data[0])
      }
    })
  }

  return (
    <Wrapper>
      <Header postInfo={currentPost} userInfo={userInfo} isHot={isHot} />
      <Content postInfo={currentPost} />
      <Actions postInfo={currentPost} isTrace={isTrace} refreshPost={refreshPost} />
      <Awards key={currentPost.awards.length} awards={currentPost.awards} />

      <Divider />
    </Wrapper>
  )
}
