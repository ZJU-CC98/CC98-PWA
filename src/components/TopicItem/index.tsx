import React from 'react'
// import { css } from 'emotion'
import styled from 'react-emotion'
import { navigate } from '@reach/router'

import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core'

import { StyleRules, withStyles } from '@material-ui/core/styles'

import { ITopic } from '@cc98/api'

import dayjs from 'dayjs'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

interface Props {
  data: ITopic
  place: 'inboard' | 'newtopic' | 'usercenter' | 'follow' | 'search'
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
export default withStyles(styles)((props: Props) => {
  const { data, place, classes } = props
  const title = data.title
  const userName = `${data.userName ? data.userName : '匿名'}`
  const time = dayjs(data.lastPostTime).fromNow()
  const createTime = dayjs(data.time).fromNow()
  const reply = `回复:${data.replyCount}`
  const boardName = data.boardName as string
  let text1 = userName
  let text2 = reply
  switch (place) {
    case 'inboard':
      break
    case 'usercenter':
      text1 = boardName
      break
    case 'newtopic':
    case 'follow':
    case 'search':
      text2 = boardName
      break
  }

  return (
    <ListItem onClick={() => navigate(`/topic/${data.id}`)} button divider>
      <ListItemText
        classes={{ root: classes.root }}
        primary={<Text>{title}</Text>}
        secondary={text1}
      />
      <ListItemSecondaryAction>
        <ListItemText
          classes={{ primary: classes.primary, secondary: classes.secondary }}
          primary={place === 'newtopic' ? createTime : time}
          secondary={text2}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
})
