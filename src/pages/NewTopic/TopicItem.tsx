import React from 'react'
// import { css } from 'emotion'

import { ListItem, ListItemText } from '@material-ui/core'

import { ITopic } from '@cc98/api'

interface Props {
  info: ITopic
  click?: (topicID: number) => void
}

const TopicItem: React.SFC<Props> = ({ info, click }) => (
  <ListItem button onClick={() => click && click(info.id)}>
    <ListItemText primary={info.isAnonymous ? '[匿名]' : info.userName} secondary={info.title} />
  </ListItem>
)

export default TopicItem
