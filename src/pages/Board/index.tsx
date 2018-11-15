import React, { useState, useEffect } from 'react'

import { IBaseBoard, IBoard } from '@cc98'
import { getBoardsInfo } from '@/services/board'
import Component from './BoardList'
interface State {
  boardData: IBaseBoard[]
  childBoardData: IBoard[]
}
export default () => {
  const [state, setState] = useState(null)

  useEffect(() => {
    ; (async () => {
      await getBoardsInfo()
    })()
  }, [])

  return <>{state && <Component boardList={state.boardData} boards={state.childBoardData} />}</>
}
