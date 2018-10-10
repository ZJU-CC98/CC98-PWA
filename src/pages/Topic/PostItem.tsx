import React from 'react'
import { css, cx } from 'emotion'

import {
  Card, CardContent,
  CardHeader, CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { IPost, IUser } from '@cc98/api'

const root = css`
  margin-top: 6px;
`

const floor = css`
  margin-right: 4px;
  font-size: 14px;
`

const expand = css`
  transform: rotate(0deg);
  transition-property: transform;
  /* transition-duration:  */
`

const expandOpen = css`
  transform: rotate(180deg);
`

type Props = {
  /**
   * 帖子信息
   */
  postInfo: IPost,
  /**
   * 用户信息
   */
  userInfo: IUser | null,
}

type State = {
  /**
   * 签名档是否展开
   */
  expanded: boolean
}

class PostItem extends React.PureComponent<Props, State> {
  state: State = {
    expanded: false,
  }

  onExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const { postInfo, userInfo } = this.props
    return (
      <Card square elevation={0} className={root}>

        <CardHeader
          avatar={
            <Avatar>
              {
                userInfo && userInfo.portraitUrl
                  ? <img src={userInfo.portraitUrl} />
                  : 'H'
              }
            </Avatar>
          }
          title={postInfo.userName}
          subheader={new Date(postInfo.time).toLocaleString()}
          action={
            <IconButton>
              <span className={floor}>{`${postInfo.floor} L`}</span>
            </IconButton>
          }
        />

        <CardContent>
          <Typography> {postInfo.content} </Typography>
        </CardContent>

        <CardActions>
          {userInfo && userInfo.signatureCode && <IconButton
            className={cx(expand, {
              [expandOpen]: this.state.expanded,
            })}
            onClick={this.onExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>}
        </CardActions>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography component="p"> {userInfo && userInfo.signatureCode} </Typography>
          </CardContent>
        </Collapse>

      </Card>
    )
  }
}

export default PostItem
