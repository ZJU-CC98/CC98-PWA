import React, { useState, useEffect } from 'react'
import { css } from 'emotion'

import { TextField } from '@material-ui/core'

import BoardGroup from './BoardGroup'
import BoardItem from './BoardItem'

import { getBoardsInfo } from '@/services/board'
import { IBoardGroup, IBoard } from '@cc98/api'

const searchInput = css`
  display: flex;
  align-items: center;
  height: 70px;
`

export default () => {
  const [boardList, setBoardList] = useState<IBoardGroup[]>([])
  const [childBoards, setChildBoards] = useState<IBoard[]>([])

  useEffect(() => {
    ; (async () => {
      const boardsInfo = await getBoardsInfo()
      boardsInfo.fail().succeed(boards => {
        setBoardList(boards)

        const childBoards = boards
          .map(baseBoard => baseBoard.boards)
          .reduce((prev, cur) => cur.concat(prev))

        setChildBoards(childBoards)
      })
    })()
  }, [])

  const [searchTerm, setSearchTerm] = useState('')
  const filteredBoards = childBoards.filter(board => board.name.indexOf(searchTerm) !== -1)

  return (
    <>
      <div className={searchInput}>
        <TextField
          label="搜索版面名称"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          fullWidth
        />
      </div>
      {searchTerm && filteredBoards.map(board => <BoardItem key={board.id} data={board} />)}

      {!searchTerm && boardList.map(data => <BoardGroup key={data.id} data={data} />)}
    </>
  )
}
