import React from 'react'
import { navigate } from '@reach/router'
import { css } from 'emotion'

import {
  Avatar,
} from '@material-ui/core'

import basicInstance from '@/model/basicInstance'

import defaultAvatarImg from '@/assets/9.png'
import { IMyInfo } from '@cc98/api';

const root = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;

  /** <List> has style padding-top: 8px */
  padding-bottom: 5px;
  color: rgba(0, 0, 0, 0.54);
`

const avatar =  css`
  && {
    width: 50px;
    height: 50px;
  }
`

const tologIn = () => {
  navigate('/logIn')
}

type Props = {
  isLogIn: boolean
  info: IMyInfo | null
}

const UserInfo: React.SFC<Props> = ({isLogIn, info}) => (
  <div className={root}>
    <Avatar
      className={avatar}
      src={isLogIn ? info && info.portraitUrl : defaultAvatarImg}
      onClick={isLogIn ? () => {} : tologIn}
    />
  </div>
)

const Connect: React.SFC = () => (
  <UserInfo
    isLogIn={basicInstance.state.isLogIn}
    info={basicInstance.state.myInfo}
  />
)

export default Connect
