import React, { useState } from 'react'
import { css } from 'emotion'

import { useFetcher } from '@/hooks/useFetcher'

import { TextField } from '@material-ui/core'

import BoardGroup from './BoardGroup'
import BoardItem from './BoardItem'

import { getBoardsInfo } from '@/services/board'
import { IBoard } from '@cc98/api'

const searchInput = css`
  display: flex;
  align-items: center;
  height: 70px;
`

export default () => {
  const [childBoards, setChildBoards] = useState<IBoard[]>([])
  const [boardList] = useFetcher(getBoardsInfo, {
    success: boards => {
      setChildBoards(
        boards.map(baseBoard => baseBoard.boards).reduce((prev, cur) => cur.concat(prev))
      )
    },
  })

  // 版面搜索 state
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBoards, setFilteredBoards] = useState<IBoard[]>([])

  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setFilteredBoards(childBoards.filter(board => board.name.indexOf(searchTerm) !== -1))
  }

  return (
    <>
      <div className={searchInput}>
        <TextField
          label="搜索版面名称"
          value={searchTerm}
          onChange={onSearchTermChange}
          fullWidth
        />
      </div>

      {searchTerm && filteredBoards.map(board => <BoardItem key={board.id} data={board} />)}

      {!searchTerm && boardList && boardList.map(data => <BoardGroup key={data.id} data={data} />)}
    </>
  )
}
