import React from 'react'
import { navigate } from '@reach/router'
import { css } from 'emotion'

import { Avatar, Typography } from '@material-ui/core'

import defaultAvatarImg from '@/assets/9.png'
import { IUser } from '@cc98/api'

const root = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 12px 0;

  /** <List> has style padding-top: 8px */
  padding-bottom: 5px;
`

const avatar = css`
  && {
    width: 80px;
    height: 80px;
  }
`

const username = css`
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

const UserInfo: React.SFC<Props> = ({ isLogIn, info }) => (
  <div className={root}>
    <Avatar
      className={avatar}
      src={isLogIn ? info && info.portraitUrl : defaultAvatarImg}
      onClick={isLogIn ? () => navigate('/userCenter') : () => navigate('/logIn')}
    />
    <Typography className={username} variant="body1">
      {isLogIn ? info && info.name : '未登录'}
    </Typography>
  </div>
)

export default UserInfo
