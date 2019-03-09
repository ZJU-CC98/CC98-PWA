import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import { Typography, Button, IconButton, Collapse } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import BoardItem from './BoardItem'

import { IBoardGroup } from '@cc98/api'

const WrapperDiv = styled.div`
  margin: 24px 8px;
`

const Title = muiStyled(Typography).attrs({
  variant: 'subtitle1',
  color: 'primary',
})({
  margin: '0 8px',
  textAlign: 'right',
})

interface Props {
  boardsInfo: IBoardGroup
}

const notExpandedBoards = [2, 29, 33, 35, 37, 604]

export default ({ boardsInfo }: Props) => {
  const hasCover = useMemo(() => {
    return notExpandedBoards.indexOf(boardsInfo.id) === -1
  }, [boardsInfo.id])
  const [isExpanded, setIsExpanded] = useState(hasCover)

  return (
    <WrapperDiv>
      <Title onClick={() => setIsExpanded(!isExpanded)}>
        {boardsInfo.name}
        <IconButton color="primary" style={{ marginRight: -4 }}>
          <ExpandMoreIcon
            style={{
              transform: isExpanded ? undefined : 'rotate(90deg)',
              transition: 'transform 0.5s',
            }}
          />
        </IconButton>
      </Title>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        {boardsInfo.boards.map(board => (
          <BoardItem key={board.id} boardInfo={board} hasCover={hasCover} />
        ))}
      </Collapse>
    </WrapperDiv>
  )
}
