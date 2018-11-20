import React, { useState } from 'react'
import { css, cx } from 'emotion'

import { Typography, Collapse, IconButton } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import BoardItem from './BoardItem'

import { IBoardGroup } from '@cc98/api'

const root = css`
  margin-bottom: 20px;
`

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 32px;
  padding-right: 15px;
`

const body = css`
  display: flex;
  flex-wrap: wrap;
  margin: 0 12px 10px 12px;
`

const expandOpen = css`
  transform: rotate(180deg);
`

interface Props {
  data: IBoardGroup
}

const notExpandedBoards = [2, 29, 33, 35, 37, 604]

export default (props: Props) => {
  const [isExpanded, setIsExpanded] = useState(notExpandedBoards.indexOf(props.data.id) === -1)
  const { data } = props

  return (
    <div className={root}>
      <div className={header} onClick={() => setIsExpanded(!isExpanded)}>
        <Typography variant="subtitle1" color="primary">
          {data.name}
        </Typography>

        <IconButton color="primary">
          <ExpandMoreIcon className={cx({ [expandOpen]: isExpanded })} />
        </IconButton>
      </div>

      <Collapse in={isExpanded} timeout="auto">
        <div className={body}>
          {data.boards.map(board => (
            <BoardItem key={board.id} data={board} />
          ))}
        </div>
      </Collapse>
    </div>
  )
}
