import boardInstance, { BoardInfoStore } from '@/model/board'
import { Subscribe } from '@cc98/state'
import React from 'react'
import Component from './BoardData'
interface Props {
  id: string
}
export default (props: Props) => (
  <Subscribe to={[boardInstance]}>
    {
      (store: BoardInfoStore) =>{
        console.log(store.state)
        return (store.state.tagData.length !== 0 ?
          <Component tags={store.state.tagData} id={props.id} /> : null)
      }
    }
  </Subscribe>
)
