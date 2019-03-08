import React, { useState } from 'react'
import styled from 'styled-components'

import useFetcher from '@/hooks/useFetcher'

import { TextField, IconButton } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'

import BoardGroup from './BoardGroup'
import BoardItem from './BoardItem'

import { getBoardsInfo } from '@/services/board'
import { navigateHandler } from '@/services/utils/errorHandler'
import { IBoard } from '@cc98/api'

import { throttle } from 'lodash-es'

import SearchInput from '@/components/SearchInput'
import StickyBar from '@/components/StickyBar'

const WrapperDiv = styled.div`
  margin: 0 10px;
`

const EmptyDiv = styled.div`
  height: 100px;
`

export default () => {
  const [childBoards, setChildBoards] = useState<IBoard[]>([])
  const [boardList] = useFetcher(getBoardsInfo, {
    success: boards => {
      setChildBoards(
        boards.map(baseBoard => baseBoard.boards).reduce((prev, cur) => cur.concat(prev))
      )
    },
    fail: navigateHandler,
  })

  // 版面搜索
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBoards, setFilteredBoards] = useState<IBoard[]>([])

  const onSearchTermChange = throttle((value: string) => {
    setSearchTerm(value)
    setFilteredBoards(childBoards.filter(board => board.name.indexOf(value) !== -1))
  }, 250)

  return (
    <>
      <StickyBar>
        <SearchInput placeholder="搜索版面" onChange={onSearchTermChange} />
      </StickyBar>
      {searchTerm ? (
        <WrapperDiv>
          {filteredBoards.map(board => (
            <BoardItem key={board.id} data={board} />
          ))}
        </WrapperDiv>
      ) : (
        <>
          {boardList &&
            boardList.map(boardGroup => <BoardGroup key={boardGroup.id} data={boardGroup} />)}
          <EmptyDiv />
        </>
      )}
    </>
  )
}
