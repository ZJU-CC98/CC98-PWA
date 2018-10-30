import { css, cx } from 'emotion'
import React from 'react'

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { IPost, IUser } from '@cc98/api'
import UBB from '@cc98/ubb-react'
import { navigate } from '@reach/router'

import remark from 'remark';
import reactRenderer from 'remark-react';

const root = css`
  margin-top: 6px;
  background-color: #ccc;
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

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 用户信息
   */
  userInfo: IUser | null
}

interface State {
  /**
   * 签名档是否展开
   */
  expanded: boolean
}
const CursorStyle = css`
  cursor: pointer;
`
class PostItem extends React.PureComponent<Props, State> {
  state: State = {
    expanded: false,
  }

  onExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  render() {
    const { postInfo, userInfo } = this.props

    if (postInfo.isDeleted) {
      return null
    }
    let text = UBB(postInfo.content)
    if (postInfo.contentType === 1) {
      let parseContent = postInfo.content
        .replace(/\n>[\s\S]*?\n\n/g,
                 v => v.replace(/\n[^\n](?!>)/g,
                                v1 => v1.replace(/\n(?!>)/, '\n>')));

      if (parseContent[0] === '>') {
        const index = parseContent.indexOf('\n\n');
        if (index === -1) {
          parseContent = parseContent.replace(/\n[^\n](?!>)/g,
                                              v1 => v1.replace(/\n(?!>)/, '\n>'));
        } else {
          const substr = parseContent.substr(0, index);
          parseContent = substr.replace(/\n[^\n](?!>)/g,
                                        v1 =>
                                        v1.replace(/\n(?!>)/, '\n>')) +
                                        parseContent.substr(index + 1, parseContent.length);
        }
      }
      parseContent = parseContent.replace(/发言：\*\*\n/g, '发言：**\n\n');
      text = remark().use(reactRenderer).processSync(parseContent).contents
    }

    return (
      <Card square elevation={0} className={root}>
        <CardHeader
          avatar={
            <Avatar
              className={CursorStyle}
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
              className={CursorStyle}
              onClick={() => {
                navigate(`/user/${postInfo.userId}`)
              }}
            >
              {postInfo.userName}
            </div>
          }
          subheader={new Date(postInfo.time).toLocaleString()}
          action={
            <IconButton>
              <span className={floor}>{`${postInfo.floor} L`}</span>
            </IconButton>
          }
        />

        <CardContent>
          <Typography component="div">{text}</Typography>
        </CardContent>

        {/* <CardActions>
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
            <Typography> {userInfo && UBB(userInfo.signatureCode)} </Typography>
          </CardContent>
        </Collapse> */}
      </Card>
    )
  }
}

export default PostItem
