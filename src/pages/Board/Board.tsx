import React from 'react'

import { Subscribe } from '@cc98/state'

import boardInstance, { BoardInfoStore } from '@/model/board'

import Component from './BoardData'

interface Props {
  id: string
}
export default (props: Props) => (
  <Subscribe to={[boardInstance]}>
    {
      (store: BoardInfoStore) => store.state.tagData.length !== 0 ?
        <Component tags={store.state.tagData} id={props.id} /> : null
    }
  </Subscribe>
)
