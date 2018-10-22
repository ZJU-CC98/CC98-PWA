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
    width: 70px;
    height: 70px;
  }
`

const name = css`
  && {
    margin-top: 12px;
  }
`

const tologIn = () => {
  navigate('/logIn')
}

type Props = {
  isLogIn: boolean
  info: IUser | null
}

const UserInfo: React.SFC<Props> = ({ isLogIn, info }) => (
  <div className={root}>
    <Avatar
      className={avatar}
      src={isLogIn ? info && info.portraitUrl : defaultAvatarImg}
      onClick={isLogIn ? () => {} : tologIn}
    />
    <Typography className={name} variant="body1">
      {isLogIn ? info && info.name : '笨蛋⑨'}
    </Typography>
  </div>
)

export default UserInfo
