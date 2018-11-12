import React, { useState } from 'react'
import { css } from 'emotion'

import { TextField } from '@material-ui/core'

import BaseBoard from './BaseBoardItem'
import BoardItem from './BoardItem'

import { IBaseBoard, IBoard } from '@cc98/api'

const searchInput = css`
  display: flex;
  align-items: center;
  height: 70px;
`

interface Props {
  boards: IBoard[]
  boardList: IBaseBoard[]
}

export default (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('')

  const { boardList, boards } = props

  const filteredBoards = boards.filter(board => board.name.indexOf(searchTerm) !== -1)

  return (
    <>
      {/* TODO: 放右下角 */}
      <div className={searchInput}>
        <TextField
          label="搜索版面名称"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          fullWidth
        />
      </div>

      {searchTerm ? filteredBoards.map(board => <BoardItem key={board.id} data={board} />) : null}

      {searchTerm ? null : boardList.map(data => <BaseBoard key={data.id} data={data} />)}
    </>
  )
}
