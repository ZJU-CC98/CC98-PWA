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

import useFetcher from '@/hooks/useFetcher'

import { getUserInfoById } from '@/services/user'

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
  const [userInfo] = useFetcher(() => getUserInfoById(message.userId))
  if (userInfo === null) {
    return null
  }
  const { name, portraitUrl } = userInfo

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
