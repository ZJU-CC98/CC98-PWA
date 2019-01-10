import React, { useState } from 'react'
import styled from 'styled-components'

import useFetcher from '@/hooks/useFetcher'

import { Select, MenuItem, Input, InputLabel, FormControl } from '@material-ui/core'

import { getBoardsInfo } from '@/services/board'
import { navigateHandler } from '@/services/utils/errorHandler'
import { IBoard } from '@cc98/api'

const FormDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`

const FormControlS = styled(FormControl)`
  && {
    min-width: 40%;
  }
`

interface Props {
  handleBoardChange: (boardId: number) => void
}

export default ({ handleBoardChange }: Props) => {
  const [basePoint, setBasePoint] = useState('')
  const [childPoint, setChildPoint] = useState('')
  const [childBoards, setChildBoards] = useState<IBoard[]>([])
  const [boardList] = useFetcher(getBoardsInfo, {
    success: boards => {
      setChildBoards(
        boards.map(baseBoard => baseBoard.boards).reduce((prev, cur) => cur.concat(prev))
      )
    },
    fail: navigateHandler,
  })

  const handleBaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBasePoint(event.target.value.toString())
    if (boardList) {
      const childBoards = boardList[parseInt(event.target.value, 10)].boards
      setChildBoards(childBoards)
    }
  }

  const handleChildBoardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChildPoint(event.target.value.toString())
    handleBoardChange(childBoards[parseInt(event.target.value, 10)].id)
  }

  return (
    <>
      <FormDiv>
        <FormControlS>
          <InputLabel htmlFor="base-board">板块</InputLabel>
          <Select
            value={basePoint}
            onChange={handleBaseChange}
            input={<Input name="base-board" id="base-board" />}
          >
            <MenuItem value="" />
            {boardList &&
              boardList.map((boardGroup, index) => (
                <MenuItem key={index} value={index}>
                  {boardGroup.name}
                </MenuItem>
              ))}
          </Select>
        </FormControlS>
        <FormControlS>
          <InputLabel htmlFor="child-board">版面</InputLabel>
          <Select
            value={childPoint}
            onChange={handleChildBoardChange}
            input={<Input name="base-board" id="child-board" />}
          >
            {childBoards &&
              childBoards.map((board, index) => (
                <MenuItem key={index} value={index}>
                  {board.name}
                </MenuItem>
              ))}
          </Select>
        </FormControlS>
      </FormDiv>
    </>
  )
}
