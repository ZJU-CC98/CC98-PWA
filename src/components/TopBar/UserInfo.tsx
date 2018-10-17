import React from 'react'
import { css } from 'emotion'

import {
  Avatar,
  Typography,
} from '@material-ui/core'


import history from '@/utils/history'

const root = css`
  /** <List> has style padding-top: 8px */
  padding-bottom: 5px;
  width: 100%;
  color: rgba(0, 0, 0, 0.54);
`

const avatar =  css`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const logIn = () => {
  history.push('/logIn')
}

const UserInfo: React.SFC = () => (
  <div className={root}>
    <div className={avatar}>
      <Avatar onClick={logIn}>
        9
      </Avatar>
    </div>
  </div>
)

export default UserInfo
