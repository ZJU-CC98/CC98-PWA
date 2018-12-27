import React from 'react'
import styled from 'styled-components'

import IconActions from './Actions/IconActions'
import MemuActions from './Actions/MemuActions'

import { IPost, IUser } from '@cc98/api'

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
   * 是否追踪
   */
  isTrace: boolean
  /**
   * 更新 Post 信息
   */
  refreshPost: () => void
}

const Actions: React.FC<Props> = ({ postInfo, isTrace, refreshPost, userInfo }) => (
  <FlexDiv>
    <IconActions postInfo={postInfo} refreshPost={refreshPost} />
    <MemuActions
      postInfo={postInfo}
      userInfo={userInfo}
      isTrace={isTrace}
      refreshPost={refreshPost}
    />
  </FlexDiv>
)

export default Actions
