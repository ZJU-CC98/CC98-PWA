import React from 'react'

import { css, cx } from 'emotion'
import { navigate } from '@reach/router'

import { PostInfoStore } from '@/model/post'
import UBB from '@cc98/ubb-react'

import Utils from './PostUtils'

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core'

import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Quote from '@material-ui/icons/RotateLeft'
import DislikeIcon from '@material-ui/icons/ThumbDown'
import LikeIcon from '@material-ui/icons/ThumbUp'

import resolveMarkdown from './resolveMarkdown'
import { IBasicUser, IPost, IUser } from '@cc98/api'

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
  /**
   * 评分用户信息映射
   */
  awardUserMap: {
    [name: string]: IBasicUser
  }
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
const cursorStyle = css`
  cursor: pointer;
`
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

export default withStyles(styles)(
  class extends React.Component<Props, State> {
    state: State = {
      expanded: false,
      anchorEl: null,
    }

    onExpandClick = () => {
      this.setState({
        expanded: !this.state.expanded,
      })
    }

    // tslint:disable-next-line:no-any
    handleClick = (event: any) => {
      this.setState({ anchorEl: event.currentTarget })
    }
    handleClose = () => {
      this.setState({ anchorEl: null })
    }
    render() {
      const { postInfo, userInfo, classes, isTrace, awardUserMap, postInstance } = this.props
      const { trace, updateSinglePosts, wakeUpEditor } = postInstance
      const { anchorEl } = this.state
      const open = Boolean(anchorEl)
      if (postInfo.isDeleted) {
        return null
      }

      const text =
        postInfo.contentType === 0 ? UBB(postInfo.content) : resolveMarkdown(postInfo.content)

      return (
        <Card square elevation={0} className={root}>
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
              <div
                className={cursorStyle}
                onClick={() => {
                  navigate(`/user/${postInfo.userId}`)
                }}
              >
                {postInfo.isAnonymous
                  ? `匿名${postInfo.userName.toUpperCase()}`
                  : postInfo.userName}
              </div>
            }
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
                  onClick={this.handleClick}
                >
                  <ExpandMoreIcon fontSize="small" />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
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
                          this.props.openDialog(postInfo)
                        }
                        this.handleClose()
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
                  // tslint:disable-next-line:ter-computed-property-spacing
                  dislikeButton[
                    likeStateMap[postInfo.likeState] === 'dislike' ? 'clicked' : 'unclicked'
]
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
                  likeButton[likeStateMap[postInfo.likeState] === 'like' ? 'clicked' : 'unclicked']
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
          {postInfo.awards.length > 5 &&
            Object.keys(awardUserMap).length !== 0 && (
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
                  onClick={this.onExpandClick}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
            )}
          {postInfo.awards.length > 0 &&
            postInfo.awards.length <= 5 &&
            Object.keys(awardUserMap).length !== 0 && (
              <Collapse in={true} timeout="auto" unmountOnExit>
                <CardContent>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>评分人</TableCell>
                        <TableCell>操作内容</TableCell>
                        <TableCell>理由</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {postInfo.awards.length !== 0 &&
                        Object.keys(awardUserMap).length !== 0 &&
                        postInfo.awards.map(award => (
                          <TableRow key={award.id} className={row}>
                            <TableCell className={left}>{award.operatorName}</TableCell>
                            <TableCell className={middle}>{award.content}</TableCell>
                            <TableCell className={right}>{award.reason}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Collapse>
            )}
          {postInfo.awards.length > 5 &&
            Object.keys(awardUserMap).length !== 0 && (
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Table>
                    <TableHead>
                      <TableRow className={row}>
                        <TableCell className={left}>评分人</TableCell>
                        <TableCell className={middle}>操作内容</TableCell>
                        <TableCell className={right}>理由</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {postInfo.awards.length !== 0 &&
                        Object.keys(awardUserMap).length !== 0 &&
                        postInfo.awards.map(award => (
                          <TableRow key={award.id} className={row}>
                            <TableCell className={left}>{award.operatorName}</TableCell>
                            <TableCell className={middle}>{award.content}</TableCell>
                            <TableCell className={right}>{award.reason}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Collapse>
            )}
        </Card>
      )
    }
  }
)

const left = css`
  && {
    min-width: 8rem;
    white-space: nowrap;
    padding: 0 0 0 0;
  }
`
const middle = css`
  && {
    min-width: 5rem;
    white-space: nowrap;
    padding: 0 0 0 0;
  }
`
const right = css`
  && {
    flex-grow: 2;
    padding: 0 0 0 0;
  }
`
const row = css`
  && {
    padding: 0 0 0 0;
    height: 30px;
  }
`
