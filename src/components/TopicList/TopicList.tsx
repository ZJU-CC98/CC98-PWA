import React from 'react'
import muiStyled from '@/muiStyled'

import { List } from '@material-ui/core'

import TopicListItem, { Place } from './TopicListItem'

import { ITopic } from '@cc98/api'

const ListS = muiStyled(List)({
  width: '100%',
})

interface Props {
  topics: ITopic[]
  place: Place
}

const TopicList: React.FC<Props> = ({ topics, place }) => (
  <ListS>
    {topics.map(info => (
      <TopicListItem key={info.id} data={info} place={place} />
    ))}
  </ListS>
)

export default TopicList
