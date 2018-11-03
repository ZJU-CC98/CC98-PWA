import { navigate } from '@reach/router'
import { css } from 'emotion'
import React from 'react'

import { Avatar, Typography } from '@material-ui/core'

import defaultAvatarImg from '@/assets/9.png'
import { IUser } from '@cc98/api'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
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

const styles: StyleRules = {
  root: {
    marginTop: '6px',
    opacity: 0.6,
    fontWeight: 'bolder',
    marginLeft: '16px',
    marginRight: '16px',
  },
}
const name = css`
  && {
    margin-top: 6px;
    opacity:0.6;
    font-weight:bolder;
    margin-left:16px;
    margin-right:16px;
  }
`

const tologIn = () => {
  navigate('/logIn')
}

interface Props {
  isLogIn: boolean
  info: IUser | null
}

export default withStyles(styles)(
  ({ isLogIn, info, classes }: Props & { classes: ClassNameMap }) => (
    <div className={root}>
      <Avatar
        className={avatar}
        src={isLogIn ? info && info.portraitUrl : defaultAvatarImg}
        onClick={isLogIn ? () => navigate('/userCenter') : tologIn}
      />
      <Typography classes={{ body1: classes.root }} variant="body1">
        {isLogIn ? info && info.name : '未登录'}
      </Typography>
    </div >
  )
)
