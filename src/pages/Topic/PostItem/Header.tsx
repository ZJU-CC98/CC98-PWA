import React from 'react'
import styled from 'styled-components'

import { Avatar, IconButton, Typography } from '@material-ui/core'

import { IPost, IUser } from '@cc98/api'

import { navigate } from '@/utils/history'
import dayjs from 'dayjs'

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 16px;
`

const AvatarArea = styled.div`
  display: flex;
  align-items: center;
`

const AvatarS = styled(Avatar)`
  && {
    margin-right: 12px;
  }
`

const Title = styled(Typography)``

const SubTitle = styled(Typography).attrs({
  color: 'textSecondary',
})``

const Floor = styled(IconButton)`
  && {
    font-size: 1.2;
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
  userInfo: IUser | null
}

export default ({ postInfo, userInfo }: Props) => (
  <FlexDiv>
    <AvatarArea>
      <AvatarS
        onClick={() => navigate(`/user/${postInfo.userId}`)}
        src={userInfo ? userInfo.portraitUrl : undefined}
      >
        匿
      </AvatarS>
      <div>
        <Title>
          {postInfo.isAnonymous ? `匿名${postInfo.userName.toUpperCase()}` : postInfo.userName}
        </Title>
        <SubTitle>{dayjs(postInfo.time).format('YYYY/MM/DD HH:mm')}</SubTitle>
      </div>
    </AvatarArea>

    <Floor>{postInfo.isHot ? '热' : `${postInfo.floor}`}</Floor>
  </FlexDiv>
)
