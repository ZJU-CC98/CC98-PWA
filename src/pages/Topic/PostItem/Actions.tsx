import React, { useState } from 'react'
import styled from 'styled-components'

import { IconButton, Typography, Menu, MenuItem } from '@material-ui/core'

import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { IPost, ILikeState } from '@cc98/api'
import { putLike, putDislike } from '@/services/post'

import userInstance from '@/containers/user'

import { navigate } from '@/utils/history'
import copy2Clipboard from 'copy-to-clipboard'
import dayjs from 'dayjs'

import Judge from './Judge'

// @babel/plugin-transform-typescript does not support const enums
enum LikeState {
  NONE = 0,
  LIKE = 1,
  DISLIKE = 2,
}

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 是否追踪
   */
  isTrace: boolean
  /**
   * 更新 Post 信息
   */
  refreshPost: () => void
}

const ActionDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`

const Count = styled(Typography).attrs({
  color: 'textSecondary',
})`
  && {
    margin-left: -2px;
    margin-right: 12px;
  }
`

const DividerCol = styled.span`
  margin: 0 4px;
  /* FIXME: remove hardcode color */
  border: solid thin rgba(0, 0, 0, 0.54);
  height: 1rem;
`

const IconActions: React.FunctionComponent<Props> = ({ postInfo, refreshPost }) => {
  const { likeState } = postInfo

  const handleLike = (newLikeState: ILikeState) => () => {
    const putService = newLikeState === 1 ? putLike : putDislike

    putService(postInfo.id).then(res =>
      res.fail().succeed(_ => {
        refreshPost()
      })
    )
  }

  const handleQuote = () => {
    const { floor, userName, time, topicId, content } = postInfo
    const formatTime = dayjs(time).format('YYYY-MM-DD HH:mm')

    // TODO:
    navigate(`/editor/replyTopic/${postInfo.topicId}`)

    // editorInstance.toReplyTopic(
    //   postInfo.topicId,

    // tslint:disable-next-line
    //   `[quote]引用自${floor}楼${userName}在${formatTime}的发言：[color=blue][url=/topic/${topicId}#${floor}]>查看原帖<[/url][/color][/b]\n${content}[/quote]\n`
    // )
  }

  return (
    <ActionDiv>
      <IconButton onClick={handleLike(LikeState.DISLIKE)}>
        <ThumbDownIcon color={likeState === LikeState.DISLIKE ? 'secondary' : 'inherit'} />
      </IconButton>
      <Count>{postInfo.dislikeCount}</Count>
      <DividerCol />
      <IconButton>
        <RotateLeftIcon onClick={handleQuote} />
      </IconButton>
      <DividerCol />
      <IconButton onClick={handleLike(LikeState.LIKE)}>
        <ThumbUpIcon color={likeState === LikeState.LIKE ? 'secondary' : 'inherit'} />
      </IconButton>
      <Count>{postInfo.likeCount}</Count>
    </ActionDiv>
  )
}

const MoreActions = ({ postInfo, isTrace, refreshPost }: Props) => {
  // 控制 Menu 的显示
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleTrace = () => {
    if (isTrace) {
      navigate(`/topic/${postInfo.topicId}`)
    } else {
      if (postInfo.isAnonymous) {
        navigate(`/topic/${postInfo.topicId}/anonymous/trace/${postInfo.id}`)
      } else {
        navigate(`/topic/${postInfo.topicId}/trace/${postInfo.userId}`)
      }
    }
    handleClose()
  }

  const handleShare = () => {
    if (document.location) {
      copy2Clipboard(
        `https://${document.location.host}/topic/${postInfo.topicId}#${postInfo.floor}`
      )
    }
    // TODO: tips: 链接已复制到剪贴板
    handleClose()
  }

  // 控制 评分 的显示
  const [showJudge, setShowJudge] = useState(false)
  const judgeOpen = () => setShowJudge(true)
  const judgeClose = () => setShowJudge(false)

  const handleJudge = () => {
    judgeOpen()
    handleClose()
  }

  const myInfo = userInstance.state.myInfo
  // FIXME: 心灵之约 内无效。。。
  const isMyPost = postInfo.userId === (myInfo && myInfo.id)

  return (
    <>
      {showJudge && (
        <Judge postInfo={postInfo} handleClose={judgeClose} refreshPost={refreshPost} />
      )}
      <IconButton onClick={handleOpen}>
        <ExpandMoreIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleTrace}>{isTrace ? '返回' : '追踪'}</MenuItem>
        {isMyPost && (
          <MenuItem
            onClick={() => {
              navigate(`/editor/edit/${postInfo.id}`)
              handleClose()
            }}
          >
            编辑
          </MenuItem>
        )}
        <MenuItem onClick={handleJudge}>评分</MenuItem>
        <MenuItem onClick={handleShare}>分享</MenuItem>
      </Menu>
    </>
  )
}

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default ({ postInfo, isTrace, refreshPost }: Props) => (
  <FlexDiv>
    <IconActions postInfo={postInfo} isTrace={isTrace} refreshPost={refreshPost} />
    <MoreActions postInfo={postInfo} isTrace={isTrace} refreshPost={refreshPost} />
  </FlexDiv>
)
