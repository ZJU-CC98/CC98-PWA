import boardInstance, { BoardInfoStore } from '@/model/board'
import { Subscribe } from '@cc98/state'
import React from 'react'
import Component from './BoardList'
interface Props {
  id: string
}
export default (props: Props) => (
  <Subscribe to={[boardInstance]}>
    {
      (store: BoardInfoStore) =>
        store.state.childBoardData.length !== 0 ?
          <Component boards={store.state.childBoardData} /> : null
    }
  </Subscribe>
)
