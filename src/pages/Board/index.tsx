import React from 'react'
import { Subscribe } from '@cc98/state'

import boardInstance, { BoardInfoStore } from '@/model/board'

import Component from './BoardList'

export default () => (
  <Subscribe to={[boardInstance]}>
    {(store: BoardInfoStore) =>
      store.state.childBoardData.length !== 0 ? (
        <Component boardList={store.state.boardData} boards={store.state.childBoardData} />
      ) : null
    }
  </Subscribe>
)
