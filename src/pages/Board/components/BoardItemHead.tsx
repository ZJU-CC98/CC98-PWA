import React from 'react'

import StickyHeadBar from '@/components/StickyBar/StickyHeadBar'

import { IBoard } from '@cc98/api'
import { navigate } from '@/utils/history'

interface Props {
  title: string
  boardInfo: IBoard
}

const RecordHead: React.FC<Props> = ({ title, boardInfo }) => (
  <StickyHeadBar
    title={title}
    subTitle={boardInfo.name}
    subTitleClick={() => navigate(`/board/${boardInfo.id}`)}
  />
)

export default RecordHead
