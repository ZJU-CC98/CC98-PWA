import { ITopic } from '@cc98/api'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { navigate } from '@reach/router'
import dayjs from 'dayjs'
import { css } from 'emotion'
import React from 'react'
import styled from 'react-emotion'

interface Props {
  data: ITopic
  place: string
}

const styles: StyleRules = {
  root: {
    width: '100%',
  },
  primary: {
    fontSize: '0.875rem',
    color: 'rgba(0, 0, 0, 0.54)',
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
export default withStyles(styles)(
  class extends React.PureComponent<Props & { classes: ClassNameMap }> {
    render() {
      const { data, place, classes } = this.props
      const title = data.title
      const userName = `${data.userName ? data.userName : '匿名'}`
      const time = dayjs(data.lastPostTime).fromNow()
      const reply = `回复:${data.replyCount}`
      const boardName = data.boardName as string
      let text1 = userName
      let text2 = reply
      switch (place) {
        case 'inboard':
          break;
        case 'newtopic':
          text2 = boardName
          break;
        case 'usercenter':
          text1 = boardName
          break;
        case 'follow':
          text2 = boardName
          break;
        case 'search':
          text2 = boardName
          break;
      }

      return (
        <ListItem
          onClick={() => navigate(`/topic/${data.id}`)}
          button
          divider
        >
          <ListItemText
            classes={{ root: classes.root }}
            primary={<Text>{title}</Text>}
            secondary={text1}
          />
          <ListItemSecondaryAction>
            <ListItemText
              classes={{ primary: classes.primary, secondary: classes.secondary }}
              primary={time}
              secondary={text2}
            />
          </ListItemSecondaryAction>
        </ListItem>
      )
    }
  }
)
