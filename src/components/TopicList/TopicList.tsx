import React from 'react'
import { css } from 'emotion'

import { List } from '@material-ui/core'

import TopicListItem, { Place } from './TopicListItem'

import { ITopic } from '@cc98/api'

const list = css`
  width: 100%;
`

interface Props {
  topics: ITopic[]
  place: Place
}

const TopicList: React.FunctionComponent<Props> = ({ topics, place }) => (
  <List className={list}>
    {topics.map(info => (
      <TopicListItem key={info.id} data={info} place={place} />
    ))}
  </List>
)

export default TopicList
