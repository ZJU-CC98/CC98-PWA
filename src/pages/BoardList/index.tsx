import React, { useState } from 'react'
import { css } from 'emotion'

import { useFetcher } from '@/hooks/useFetcher'

import { TextField, IconButton } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'

import BoardGroup from './BoardGroup'
import BoardItem from './BoardItem'

import { getBoardsInfo } from '@/services/board'
import { IBoard } from '@cc98/api'

import { throttle } from 'lodash-es'

const searchInput = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 25px 25px 5px;
`

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput: React.FunctionComponent<Props> = ({ value, onChange }) => (
  <div className={searchInput}>
    <IconButton>
      <SearchIcon color="primary" />
    </IconButton>
    <TextField fullWidth placeholder="搜索版面" value={value} onChange={onChange} />
  </div>
)

const wrapStyle = css`
  margin: 0 10px;
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

  // 版面搜索
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBoards, setFilteredBoards] = useState<IBoard[]>([])

  const onSearchTermChange = throttle((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setFilteredBoards(childBoards.filter(board => board.name.indexOf(e.target.value) !== -1))
  }, 250)

  return (
    <>
      <SearchInput value={searchTerm} onChange={onSearchTermChange} />
      {searchTerm ? (
        <div className={wrapStyle}>
          {filteredBoards.map(board => (
            <BoardItem key={board.id} data={board} />
          ))}
        </div>
      ) : (
        boardList &&
        boardList.map(boardGroup => <BoardGroup key={boardGroup.id} data={boardGroup} />)
      )}
    </>
  )
}
