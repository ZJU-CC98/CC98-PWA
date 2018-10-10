import React from 'react'
// import { css } from 'emotion'

import {
  ListItem, ListItemText,
  // Typography,
} from '@material-ui/core'

import { IHotTopic } from '@cc98/api'

type Props = {
  info: IHotTopic,
  click?: (topicID: number) => void
}

const TopicItem: React.SFC<Props> = ({info, click}) => (
  <ListItem
    button
    onClick={() => click && click(info.id)}
  >
    <ListItemText
      primary={info.boardName}
      secondary={info.title}
    />
  </ListItem>
)

export default TopicItem
