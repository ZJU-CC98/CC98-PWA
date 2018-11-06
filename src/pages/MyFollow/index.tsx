import React from 'react'

import { Subscribe } from '@cc98/state'

import boardInstance, { BoardInfoStore } from '@/model/board'

import Component from './Follow'

export default () => (
  <Subscribe
    to={[boardInstance]}
  >
    {
      (data: BoardInfoStore) => data.state.boardData.length !== 0 ?
        <Component boards={data.state.boardData} /> : null
    }
  </Subscribe>
)
