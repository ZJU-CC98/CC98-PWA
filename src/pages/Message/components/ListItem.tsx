/**
 * @author dongyansong
 * @date 2018-10-26
 */
import React from 'react'
import styled from 'styled-components'
import { navigate } from '@/utils/history'
import { IRecentMessage } from '@cc98/api'

import dayjs from 'dayjs'

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'

import useUserId from '@/hooks/useUserId'

const Text = styled.span`
  display: block;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

interface Props {
  message: IRecentMessage
}

const navigateToDetail = (userId: number) => navigate(`/messageDetail/${userId}`)

export default ({ message }: Props) => {
  const { name, portraitUrl } = useUserId(message.userId)

  return (
    <ListItem button onClick={() => navigateToDetail(message.userId)}>
      <ListItemAvatar>
        <Avatar src={portraitUrl} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={<Text>{message.lastContent}</Text>} />
      <ListItemSecondaryAction>
        <ListItemText secondary={dayjs(message.time).fromNow()} />
      </ListItemSecondaryAction>
    </ListItem>
  )
}
