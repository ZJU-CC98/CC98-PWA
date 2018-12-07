import React, { useState } from 'react'
import styled from 'styled-components'

import { IconButton, Typography, Menu, MenuItem } from '@material-ui/core'

import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { IPost, ILikeState } from '@cc98/api'
import { putLike, putDislike } from '@/services/post'

import { EditorUtils } from '@/global/editor'
import userInstance from '@/containers/user'

import { navigate } from '@/utils/history'
import copy2Clipboard from 'copy-to-clipboard'

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

const IconActions = ({ postInfo }: Props) => {
  const [likeState, setLikeState] = useState(postInfo.likeState)

  const handleLikeIcons = (newLikeState: ILikeState) => () => {
    const putService = newLikeState === 1 ? putLike : putDislike

    putService(postInfo.id).then(res =>
      res.fail().succeed(_ => {
        const nextState = newLikeState === likeState ? LikeState.NONE : newLikeState

        // TODO: maybe should use getLikeState service ?
        if (newLikeState === LikeState.LIKE) {
          postInfo.likeCount += likeState === LikeState.LIKE ? -1 : 1
        } else if (newLikeState === LikeState.DISLIKE) {
          postInfo.dislikeCount += likeState === LikeState.DISLIKE ? -1 : 1
        }

        setLikeState(nextState)
      })
    )
  }

  return (
    <ActionDiv>
      <IconButton onClick={handleLikeIcons(LikeState.DISLIKE)}>
        <ThumbDownIcon color={likeState === LikeState.DISLIKE ? 'secondary' : 'inherit'} />
      </IconButton>
      <Count>{postInfo.dislikeCount}</Count>
      <DividerCol />
      <IconButton>
        <RotateLeftIcon
          onClick={() => {
            EditorUtils.quotePost(postInfo.topicId, `[quote]${postInfo.content}[/quote]\n`)
          }}
        />
      </IconButton>
      <DividerCol />
      <IconButton onClick={handleLikeIcons(LikeState.LIKE)}>
        <ThumbUpIcon color={likeState === LikeState.LIKE ? 'secondary' : 'inherit'} />
      </IconButton>
      <Count>{postInfo.likeCount}</Count>
    </ActionDiv>
  )
}

const MoreActions = ({ postInfo }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleTrace = () => {
    if (postInfo.isAnonymous) {
      navigate(`/topic/${postInfo.topicId}/anonymous/trace/${postInfo.id}`)
    } else {
      navigate(`/topic/${postInfo.topicId}/trace/${postInfo.userId}`)
    }
    handleClose()
  }

  const handleShare = () => {
    copy2Clipboard(`https://${document.location.host}/topic/${postInfo.topicId}#${postInfo.floor}`)
    // TODO: tips: 链接已复制到剪贴板
    handleClose()
  }

  const myInfo = userInstance.state.myInfo
  const isMyPost = postInfo.userId === (myInfo && myInfo.id)

  return (
    <>
      <IconButton onClick={handleOpen}>
        <ExpandMoreIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleTrace}>追踪</MenuItem>
        {isMyPost && (
          <MenuItem
            onClick={() => {
              EditorUtils.editorPost(postInfo.id, postInfo.content)
              handleClose()
            }}
          >
            编辑
          </MenuItem>
        )}
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

export default ({ postInfo }: Props) => (
  <FlexDiv>
    <IconActions postInfo={postInfo} />
    <MoreActions postInfo={postInfo} />
  </FlexDiv>
)
