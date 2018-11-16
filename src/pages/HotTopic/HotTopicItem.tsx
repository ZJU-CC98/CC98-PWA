import React from 'react'
import styled from 'react-emotion'

import { IHotTopic } from '@cc98/api'
import { ListItem, ListItemText } from '@material-ui/core'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

interface Props {
  info: IHotTopic
  click?: (topicID: number) => void
  classes: ClassNameMap
}

const styles: StyleRules = {
  root: {
    width: '100%',
  },
  primary: {
    fontSize: '0.875rem',
    opacity: 0.54,
    textAlign: 'right',
  },
  secondary: {
    textAlign: 'right',
  },
}

const Text = styled.span`
  display: block;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export default withStyles(styles)(({ info, click, classes }: Props) => (
  <ListItem divider button onClick={() => click && click(info.id)}>
    <ListItemText
      classes={{ root: classes.root }}
      primary={<Text>{info.title}</Text>}
      secondary={info.authorName ? info.authorName : '匿名'}
    />
    <ListItemSecondaryAction>
      <ListItemText
        classes={{ primary: classes.primary, secondary: classes.secondary }}
        primary={info.boardName}
        secondary={`回复:${info.replyCount}`}
      />
    </ListItemSecondaryAction>
  </ListItem>
))
