import React, { useState } from 'react'
import styled from 'styled-components'

import { Typography, Collapse, IconButton } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import BoardItem from './BoardItem'

import { IBoardGroup } from '@cc98/api'

const WrapperDiv = styled.div`
  margin-bottom: 20px;
`

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 32px;
  padding-right: 15px;
`

const BodyDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 12px;
  margin-bottom: 10px;
`

const ItemDiv = styled.div`
  width: 33%;
`

interface Props {
  data: IBoardGroup
}

const notExpandedBoards = [2, 29, 33, 35, 37, 604]

export default (props: Props) => {
  const [isExpanded, setIsExpanded] = useState(notExpandedBoards.indexOf(props.data.id) === -1)
  const { data } = props

  return (
    <WrapperDiv>
      <HeaderDiv onClick={() => setIsExpanded(!isExpanded)}>
        <Typography variant="subtitle1" color="primary">
          {data.name}
        </Typography>

        <IconButton color="primary">
          {/* 因为简单就内联了 */}
          <ExpandMoreIcon style={{ transform: isExpanded ? 'rotate(180deg)' : undefined }} />
        </IconButton>
      </HeaderDiv>

      <Collapse in={isExpanded} timeout="auto">
        <BodyDiv>
          {data.boards.map(board => (
            <ItemDiv>
              <BoardItem key={board.id} data={board} />
            </ItemDiv>
          ))}
        </BodyDiv>
      </Collapse>
    </WrapperDiv>
  )
}
