import React from 'react'
import styled from 'styled-components'

import { Paper, Typography, Divider } from '@material-ui/core'

import Header from './Header'
import Actions from './Actions'
import Awards from './Awards'

import { IPost, IUser } from '@cc98/api'

import UBB from '@cc98/ubb-react'

const Wrapper = styled(Paper).attrs({
  square: true,
  elevation: 0,
})`
  && {
    margin-top: 6px;
  }
`

const Content = styled(Typography).attrs({
  component: 'div',
})`
  && {
    margin: 12px 16px;
    margin-bottom: 4px;
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
}

export default ({ postInfo, userInfo, isHot }: Props) => {
  if (postInfo.isDeleted) {
    return null
  }

  const content = postInfo.contentType === 0
    ? UBB(postInfo.content)
    : postInfo.content // TODO: md support

  return (
    <Wrapper>
      <Header postInfo={postInfo} userInfo={userInfo} isHot={isHot} />
      <Content>{content}</Content>
      <Actions postInfo={postInfo} />
      <Awards awards={postInfo.awards} />

      <Divider />
    </Wrapper>
  )
}
