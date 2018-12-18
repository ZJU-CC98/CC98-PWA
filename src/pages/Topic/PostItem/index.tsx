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
  isTrace?: boolean
}

export default ({ postInfo, userInfo, isHot, isTrace = false }: Props) => {
  const [currentPost, setCurrentPost] = useState<IPost>(postInfo)
  if (postInfo.isDeleted) {
    postInfo.content = '该贴已被my CC98, my home'
  }
  const refreshPost = async () => {
    const res = await getSinglePost(postInfo.topicId, postInfo.floor - 1)
    res.fail().succeed(data => {
      if (data.length && data.length === 1) {
        if (data[0].isDeleted) {
          data[0].content = '该贴已被my CC98, my home'
          if (userInfo) {
            userInfo.portraitUrl = ''
          }
        }
        setCurrentPost(data[0])
      }
    })
  }

  return (
    <Wrapper>
      <Header postInfo={currentPost} userInfo={userInfo} isHot={isHot} />
      <Content postInfo={currentPost} />
      <Actions
        postInfo={currentPost}
        userInfo={userInfo}
        isTrace={isTrace}
        refreshPost={refreshPost}
      />
      <Awards
        key={currentPost.awards ? currentPost.awards.length : Date.now()}
        awards={currentPost.awards}
      />

      <Divider />
    </Wrapper>
  )
}
