import React, { useState } from 'react'
import styled from 'styled-components'

import { IconButton, Typography, Menu, MenuItem } from '@material-ui/core'

import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { IPost } from '@cc98/api'

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

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

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
}

const MoreActions: React.FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <ExpandMoreIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>追踪</MenuItem>
        <MenuItem>编辑</MenuItem>
        <MenuItem>分享</MenuItem>
      </Menu>
    </>
  )
}

export default ({ postInfo }: Props) => {
  const [likeState, setLikeState] = useState(postInfo.likeState)

  return (
    <FlexDiv>
      <ActionDiv>
        <IconButton>
          <ThumbDownIcon color={likeState === 2 ? 'secondary' : 'default'} />
        </IconButton>
        <Count>{postInfo.dislikeCount}</Count>
        <DividerCol />
        <IconButton>
          <RotateLeftIcon />
        </IconButton>
        <DividerCol />
        <IconButton>
          <ThumbUpIcon color={likeState === 1 ? 'secondary' : 'default'} />
        </IconButton>
        <Count>{postInfo.likeCount}</Count>
      </ActionDiv>

      <MoreActions />
    </FlexDiv>
  )
}
