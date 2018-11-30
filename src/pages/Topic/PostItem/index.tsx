import React from 'react'
import styled from 'styled-components'

import { Paper, Typography } from '@material-ui/core'

import Header from './Header'
import Actions from './Actions'

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
  // userInfo: IUser | null
}

export default ({ postInfo }: Props) => {
  if (postInfo.isDeleted) {
    return null
  }

  const userInfo = null as IUser | null

  const content = postInfo.contentType === 0 ? UBB(postInfo.content) : postInfo.content

  return (
    <Wrapper>
      <Header postInfo={postInfo} userInfo={userInfo} />
      <Content>{content}</Content>
      <Actions postInfo={postInfo} />
    </Wrapper>
  )
}
