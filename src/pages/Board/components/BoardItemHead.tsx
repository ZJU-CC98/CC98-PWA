import React from 'react'
import muiStyled from '@/muiStyled'

import { IconButton, Typography, Paper } from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { IBoard } from '@cc98/api'

import BoardMenu from './BoardMenu'

import { navigate, goback } from '@/utils/history'

const Wrapper = muiStyled(Paper).attrs({
  square: true,
  elevation: 1,
})({
  display: 'flex',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  minHeight: 56,
  width: '100%',
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
  flexFrow: 2,
  flexShrink: 1,
})

const SubTitle = muiStyled(Typography)({
  display: 'inline-block',
  minWidth: '4rem',
  maxWidth: '6rem',
  textAlign: 'center',
  marginRight: -5,
  flexShrink: 1.2,
  opacity: 0.5,
})

interface Props {
  BoardInfo: IBoard
  /**
   * 当前页面名称
   */
  itemName: string
}

const RecordHead: React.FC<Props> = ({ BoardInfo, itemName }: Props) => (
  <Wrapper>
    <GobackIcon onClick={goback}>
      <KeyboardBackspaceIcon />
    </GobackIcon>
    <Title>{itemName}</Title>
    <SubTitle onClick={() => navigate(`/board/${BoardInfo.id}`)}>{BoardInfo.name}</SubTitle>
    <BoardMenu boardId={BoardInfo.id} />
  </Wrapper>
)

export default RecordHead
