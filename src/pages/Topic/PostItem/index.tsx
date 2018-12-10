import React from 'react'
import styled from 'styled-components'

import { Paper, Divider } from '@material-ui/core'

import Header from './Header'
import Content from './Content'
import Actions from './Actions'
import Awards from './Awards'

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

  return (
    <Wrapper>
      <Header postInfo={postInfo} userInfo={userInfo} isHot={isHot} />
      <Content postInfo={postInfo} />
      <Actions postInfo={postInfo} isTrace={isTrace} />
      <Awards awards={postInfo.awards} />

      <Divider />
    </Wrapper>
  )
}
