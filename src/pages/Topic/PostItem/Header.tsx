import React from 'react'

import { css } from 'emotion'
import { navigate } from '@/utils/history'

import { CardHeader, Avatar, IconButton } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { IPost, IUser } from '@cc98/api'

interface Props {
  classes: ClassNameMap
  postInfo: IPost
  userInfo: IUser | null
}

const cursorStyle = css`
  cursor: pointer;
`
const postOptionStyle = css`
  display: flex;
  justify-content: center;
`

export default (props: Props) => {
  const { classes, postInfo, userInfo } = props

  return (
    <CardHeader
      classes={{ action: classes.headerAction }}
      avatar={
        <Avatar
          className={cursorStyle}
          onClick={() => {
            navigate(`/user/${postInfo.userId}`)
          }}
          src={userInfo ? userInfo.portraitUrl : undefined}
        >
          匿
        </Avatar>
      }
      title={
        <div className={cursorStyle}>
          {postInfo.isAnonymous ? `匿名${postInfo.userName.toUpperCase()}` : postInfo.userName}
        </div>}
      subheader={new Date(postInfo.time).toLocaleString()}
      action={[
        <IconButton key="floor" classes={{ root: classes.iconRoot }}>
          <Avatar classes={{ root: postInfo.isHot ? classes.hotFloor : classes.floor }}>
            {postInfo.isHot ? '热' : `${postInfo.floor}`}
          </Avatar>
        </IconButton>,
      ]}
    />
  )
}
