import React from 'react'
import { navigate } from '@/utils/history'
import styled from 'styled-components'

import { Avatar, Typography } from '@material-ui/core'

import snowballImg from '@/assets/snowball.png'
import { IUser } from '@cc98/api'

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 12px 0;
  /** <List> has style padding-top: 8px */
  padding-bottom: 5px;
`

const AvatarS = styled(Avatar)`
  && {
    width: 80px;
    height: 80px;
  }
`

const UnLogInAvatar = styled.img.attrs({
  src: snowballImg,
})`
  padding: 3px;
  width: 74px;
  height: 74px;
`

const Username = styled(Typography).attrs({
  variant: 'body1',
})`
  && {
    margin-top: 8px;
    margin-bottom: -8px;
    font-weight: bolder;
    opacity: 0.6;
  }
`

interface Props {
  isLogIn: boolean
  info: IUser | null
}

const UserInfo: React.FunctionComponent<Props> = ({ isLogIn, info }) => (
  <WrapperDiv>
    {isLogIn && (
      <AvatarS src={info ? info.portraitUrl : undefined} onClick={() => navigate('/userCenter')} />
    )}
    {!isLogIn && <UnLogInAvatar onClick={() => navigate('/logIn')} />}
    <Username>{isLogIn ? info && info.name : '未登录'}</Username>
  </WrapperDiv>
)

export default UserInfo
