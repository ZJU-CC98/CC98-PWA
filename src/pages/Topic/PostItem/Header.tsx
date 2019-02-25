import React from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import { Avatar, Typography } from '@material-ui/core'
import Whatshot from '@material-ui/icons/Whatshot'
import red from '@material-ui/core/colors/red'

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

const AvatarS = muiStyled(Avatar)({
  marginRight: 12,
})

const Title = Typography

const SubTitle = muiStyled(Typography).attrs({
  color: 'textSecondary',
})({})

const Floor = muiStyled(Typography).attrs({
  variant: 'button',
  color: 'textSecondary',
})({})

const HotIcon = muiStyled(Whatshot)({
  color: red[400],
})

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

export default ({ postInfo, userInfo, isHot }: Props) => (
  <FlexDiv>
    <AvatarArea>
      <AvatarS
        onClick={() => !postInfo.isAnonymous && navigate(`/user/${postInfo.userId}`)}
        src={userInfo && userInfo.portraitUrl}
      >
        {(postInfo.isAnonymous || postInfo.isDeleted) && '匿'}
      </AvatarS>
      <div>
        {/* {isHot && <a href={`#${postInfo.floor}`} />} */}
        <Title>
          {postInfo.isDeleted
            ? '98Deleter'
            : postInfo.isAnonymous
            ? `匿名${postInfo.userName.toUpperCase()}`
            : postInfo.userName}
        </Title>
        <SubTitle>{dayjs(postInfo.time).format('YYYY/MM/DD HH:mm')}</SubTitle>
        <SubTitle>
          {postInfo.lastUpdateTime &&
            `由 ${postInfo.lastUpdateAuthor || '匿名'} 编辑于 ${dayjs(
              postInfo.lastUpdateTime
            ).format('YYYY/MM/DD HH:mm')}`}
        </SubTitle>
      </div>
    </AvatarArea>

    <Floor>{isHot ? <HotIcon /> : `${postInfo.floor}L`}</Floor>
  </FlexDiv>
)
