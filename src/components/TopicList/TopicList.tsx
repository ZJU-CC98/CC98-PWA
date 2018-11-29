import React from 'react'
import styled from 'styled-components'

import { List } from '@material-ui/core'

import TopicListItem, { Place } from './TopicListItem'

import { ITopic } from '@cc98/api'

const ListS = styled(List)`
  && {
    width: 100%;
  }
`

interface Props {
  topics: ITopic[]
  place: Place
}

const TopicList: React.FunctionComponent<Props> = ({ topics, place }) => (
  <ListS>
    {topics.map(info => (
      <TopicListItem key={info.id} data={info} place={place} />
    ))}
  </ListS>
)

export default TopicList
