import React, { useState } from 'react'

import { css, cx } from 'emotion'

import { PostInfoStore } from '@/model/post'
import UBB from '@cc98/ubb-react'

import Utils from './PostUtils'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core'

import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Quote from '@material-ui/icons/RotateLeft'
import DislikeIcon from '@material-ui/icons/ThumbDown'
import LikeIcon from '@material-ui/icons/ThumbUp'

import Header from './Header'
import Award from './Award'

import resolveMarkdown from './resolveMarkdown'
import { IPost, IUser } from '@cc98/api'

const root = css`
  margin-top: 6px;
  background-color: #ccc;
`

const expand = css`
  transform: rotate(0deg);
  transition-property: transform;
  /* transition-duration:  */
`

const expandOpen = css`
  transform: rotate(180deg);
`

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 用户信息
   */
  userInfo: IUser | null
  /**
   * 是否是追踪模式
   */
  isTrace: boolean
  classes: ClassNameMap
  postInstance: PostInfoStore
  /**
   * 方法
   */
  openDialog: (info: IPost) => void
  closeDialog: () => void
}

interface State {
  /**
   * 签名档是否展开
   */
  expanded: boolean
  // tslint:disable-next-line:no-any
  anchorEl: any
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
const styles: StyleRules = {
  actionsRoot: {
    display: 'flex',
    width: '100%',
    height: '2rem',
  },
  action: {
    flexGrow: 1,
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  hr: {
    border: '#555 solid thin',
    height: '1rem',
  },
  headerAction: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconRoot: {
    padding: '5px',
  },
  menuItemRoot: {
    width: '3rem',
  },
  typographyRoot: {
    wordBreak: 'break-all',
  },
  floor: {
    width: '30px',
    height: '30px',
    fontSize: '0.8rem',
    backgroundColor: '#79b8ca',
  },
  hotFloor: {
    width: '30px',
    height: '30px',
    fontSize: '0.8rem',
    backgroundColor: 'red',
  },
  awardAvatar: {
    width: '25px',
    height: '25px',
  },
  awardAction: {
    height: '30px',
    fontSize: '0.8rem',
    opacity: 0.54,
    borderTop: '#aaaaaa solid thin',
    marginLeft: '16px',
    marginRight: '16px',
  },
  expandButton: {
    width: '80%',
    height: '30px',
  },
  tableRoot: {
    width: '100%',
  },
}

const contentRoot = css`&&{
     img {
      max-width: 100%;
    },
}`

export default withStyles(styles)((props: Props) => {
  const [expanded, setExpanded] = useState(false)
  const { postInfo, classes, postInstance, isTrace, userInfo, openDialog } = props
  const { updateSinglePosts, wakeUpEditor } = postInstance
  if (postInfo.isDeleted) {
    return null
  }

  const text =
    postInfo.contentType === 0 ? UBB(postInfo.content) : resolveMarkdown(postInfo.content)

  return (
    <Card square elevation={0} className={root}>
      <Header
        postInfo={postInfo}
        userInfo={userInfo}
        trace={postInstance.trace}
        isTrace={isTrace}
        classes={classes}
        openDialog={openDialog}
      />
      <CardContent>
        <Typography
          classes={{ root: classes.typographyRoot }}
          className={contentRoot}
          component="div"
        >
          {text}
        </Typography>
      </CardContent>

      <CardActions classes={{ root: classes.actionsRoot }}>
        <IconButton
          classes={{ root: classes.action }}
          disableRipple={true}
          onClick={async () => {
            const res = await Utils.dislike(postInfo.id)
            updateSinglePosts(postInfo.id, res)
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
            const content = await Utils.quote(this.props.postInfo)
            wakeUpEditor(content)
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
            updateSinglePosts(postInfo.id, res)
          }}
        >
          <LikeIcon
            fontSize="small"
            className={
              likeStateMap[postInfo.likeState] === 'dislike'
                ? dislikeButton.clicked
                : dislikeButton.unclicked
            }
          />
          <span
            key="likeIcon"
            style={{ fontSize: '0.9rem', marginLeft: '0.875rem', opacity: 0.54 }}
          >
            {postInfo.likeCount}
          </span>
        </IconButton>
      </CardActions>
      {postInfo.awards.length > 5 && (
        <CardActions classes={{ root: classes.awardAction }}>
          <Button classes={{ root: classes.expandButton }} onClick={this.onExpandClick}>
            （{postInfo.awards.length}
            个评分）
          </Button>
          <IconButton
            className={cx(expand, {
              [expandOpen]: this.state.expanded,
            })}
            style={{ width: '20%' }}
            onClick={() => setExpanded(!expanded)}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      )}
      {postInfo.awards.length > 0 && postInfo.awards.length <= 5 && <Award postInfo={postInfo} />}
      {postInfo.awards.length > 5 && (
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Award postInfo={postInfo} />
        </Collapse>
      )}
    </Card>
  )
})
