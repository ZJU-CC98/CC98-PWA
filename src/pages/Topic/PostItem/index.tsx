import React from 'react'
import styled from 'styled-components'

import { Paper, Typography } from '@material-ui/core'

import Header from './Header'

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
  margin: 8px 16px;
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

  return (
    <Wrapper>
      <Header postInfo={postInfo} userInfo={userInfo} />

      <Content>{postInfo.contentType === 0 ? UBB(postInfo.content) : 'md'}</Content>
    </Wrapper>
  )
}
