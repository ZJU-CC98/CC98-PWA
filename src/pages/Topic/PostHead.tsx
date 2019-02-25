import React, { useState, useEffect } from 'react'
import muiStyled from '@/muiStyled'

import { IconButton, Typography, Paper } from '@material-ui/core'

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import { ITopic } from '@cc98/api'
import { getBoardNameById } from '@/services/board'

import { navigate, goback } from '@/utils/history'

import PostActions from './PostActions'

const Wrapper = muiStyled(Paper).attrs({
  square: true,
  elevation: 1,
})({
  display: 'flex',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  minHeight: 56,
  padding: '0 16px',
  paddingRight: 0,
  /* z-index of TopBar is 1100 and DrawerMenu is 1200 */
  zIndex: 1105,

  '@media (min-width: 600px)': {
    height: 64,
  },
})

const GobackIcon = muiStyled(IconButton)({
  marginLeft: -12,
  marginRight: 5,
})

const Title = muiStyled(Typography).attrs({
  variant: 'subtitle2',
})({
  margin: '4px 0',
  flexGrow: 2,
  flexShrink: 1,
})

const SubTitle = muiStyled(Typography)({
  minWidth: '4rem',
  maxWidth: '6rem',
  textAlign: 'center',
  marginRight: -5,
  flexShrink: 1.2,
  opacity: 0.5,
})

interface Props {
  topicInfo: ITopic
  refreshFunc: () => void
}

const PostHead: React.FC<Props> = ({ topicInfo, refreshFunc }) => {
  const [boardName, setBoardName] = useState('')

  useEffect(() => {
    getBoardNameById(topicInfo.boardId).then(boardName => setBoardName(boardName))
  }, [topicInfo.boardId])

  return (
    <Wrapper>
      <GobackIcon onClick={goback}>
        <KeyboardBackspaceIcon />
      </GobackIcon>
      <Title>{topicInfo.title}</Title>
      <SubTitle onClick={() => navigate(`/board/${topicInfo.boardId}`)}>{boardName}</SubTitle>
      <PostActions topicInfo={topicInfo} refreshFunc={refreshFunc} />
    </Wrapper>
  )
}

export default PostHead
