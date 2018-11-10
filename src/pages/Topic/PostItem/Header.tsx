import React, { useState } from 'react'

import { css } from 'emotion'
import { navigate } from '@reach/router'

import { CardHeader, Avatar, IconButton, Menu, MenuItem } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { IPost, IUser } from '@cc98/api'

interface Props {
  classes: ClassNameMap
  postInfo: IPost
  userInfo: IUser | null
  isTrace: boolean
  trace: (topicId: number, userId: number, isTrace: boolean, isAnonymous?: boolean) => void
  openDialog: (info: IPost) => void
}

const cursorStyle = css`
  cursor: pointer;
`
const postOptionStyle = css`
  display: flex;
  justify-content: center;
`
const awardContentRoot = css`
  && {
    padding-bottom: 8px;
    padding-top: 8px;
  }
`
export default (props: Props) => {
  const { classes, postInfo, userInfo, isTrace, trace, openDialog } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

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
        // tslint:disable-next-line:ter-indent
        <div key="options" className={postOptionStyle}>
          <IconButton
            key="option"
            classes={{ root: classes.iconRoot }}
            aria-label="More"
            aria-owns={open ? 'long-menu' : undefined}
            aria-haspopup="true"
            // tslint:disable-next-line:no-any
            onClick={(e: any) => setAnchorEl(e.currentTarget)}
          >
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '5rem',
              },
            }}
          >
            {['评分', isTrace ? '返回' : '追踪', '编辑'].map(option => (
              <MenuItem
                key={option}
                onClick={() => {
                  if (option === '追踪') {
                    if (!postInfo.isAnonymous) {
                      trace(postInfo.topicId, postInfo.userId, true)
                      navigate(`/topic/${postInfo.topicId}/trace/${postInfo.userId}`)
                    } else {
                      trace(postInfo.topicId, postInfo.id, true, true)
                      navigate(`/topic/${postInfo.topicId}/anonymous/trace/${postInfo.id}`)
                    }
                  } else if (option === '返回') {
                    trace(postInfo.topicId, postInfo.userId, false)
                    navigate(`/topic/${postInfo.topicId}`)
                  } else if (option === '编辑') {
                    // to do
                  } else if (option === '评分') {
                    openDialog(postInfo)
                  }
                  setAnchorEl(null)
                }}
                classes={{ root: classes.menuItemRoot }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>,
      ]}
    />
  )
}
