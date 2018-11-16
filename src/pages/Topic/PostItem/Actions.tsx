import React, { useState } from 'react'

import { css } from 'emotion'
import { navigate } from '@reach/router'

import DislikeIcon from '@material-ui/icons/ThumbDown'
import LikeIcon from '@material-ui/icons/ThumbUp'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Quote from '@material-ui/icons/RotateLeft'
import { CardActions, Divider, IconButton, Menu, MenuItem } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

import copy from 'copy-to-clipboard'
import toast from '../../Compose/Toast'
import Utils from './PostUtils'
import { IPost } from '@cc98/api'

interface Props {
  classes: ClassNameMap
  postInfo: IPost
  isTrace: boolean
  openDialog: (info: IPost) => void
  setPosts: <T extends Partial<IPost>>(postId: number, postUpdate: T) => void
  setQuote: (content: string) => void
}

const likeStateMap = ['none', 'like', 'dislike']
const likeButton = {
  clicked: css`
    color: #dd5e5c;
  `,
  unclicked: css`
    color: inherit;
  `,
}
const dislikeButton = {
  clicked: css`
    color: #6464ff;
  `,
  unclicked: css`
    color: inherit;
  `,
}

export default (props: Props) => {
  const { classes, postInfo, setPosts, setQuote, openDialog, isTrace } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return (
    <CardActions classes={{ root: classes.actionsRoot }}>
      <IconButton
        classes={{ root: classes.action }}
        disableRipple={true}
        onClick={async () => {
          const res = await Utils.dislike(postInfo.id)
          setPosts(postInfo.id, res)
        }}
      >
        <DislikeIcon
          fontSize="small"
          className={
            likeStateMap[postInfo.likeState] === 'dislike'
              ? dislikeButton.clicked
              : dislikeButton.unclicked
          }
        />
        <span
          key="dislikeIcon"
          style={{ fontSize: '0.9rem', marginLeft: '0.875rem', opacity: 0.54 }}
        >
          {postInfo.dislikeCount}
        </span>
      </IconButton>
      <Divider classes={{ root: classes.hr }} />
      <IconButton
        classes={{ root: classes.action }}
        disableRipple={true}
        onClick={async () => {
          const content = Utils.quote(postInfo)
          setQuote(content)
        }}
      >
        <Quote fontSize="small" />
      </IconButton>
      <Divider classes={{ root: classes.hr }} />

      <IconButton
        classes={{ root: classes.action }}
        disableRipple={true}
        disableTouchRipple={true}
        onClick={async () => {
          const res = await Utils.like(postInfo.id)
          setPosts(postInfo.id, res)
        }}
      >
        <LikeIcon
          fontSize="small"
          className={
            likeStateMap[postInfo.likeState] === 'like' ? likeButton.clicked : likeButton.unclicked
          }
        />
        <span key="likeIcon" style={{ fontSize: '0.9rem', marginLeft: '0.875rem', opacity: 0.54 }}>
          {postInfo.likeCount}
        </span>
      </IconButton>
      <Divider classes={{ root: classes.hr }} />

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
        {['评分', isTrace ? '返回' : '追踪', '编辑', '分享'].map(option => (
          <MenuItem
            key={option}
            onClick={() => {
              if (option === '追踪') {
                if (!postInfo.isAnonymous) {
                  navigate(`/topic/${postInfo.topicId}/trace/${postInfo.userId}`)
                } else {
                  navigate(`/topic/${postInfo.topicId}/anonymous/trace/${postInfo.id}`)
                }
              } else if (option === '返回') {
                navigate(`/topic/${postInfo.topicId}`)
              } else if (option === '编辑') {
                // TODO:
              } else if (option === '评分') {
                openDialog(postInfo)
              } else if (option === '分享') {
                // tslint:disable-next-line:max-line-length
                const url = `https://${document.location && document.location.host}/topic/${
                  postInfo.topicId
                }#${postInfo.floor}`
                copy(url)
                toast.success({ content: '链接信息已复制到您的剪切板' })
              }
              setAnchorEl(null)
            }}
            classes={{ root: classes.menuItemRoot }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </CardActions>
  )
}
