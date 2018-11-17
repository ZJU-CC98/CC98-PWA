/**
 * @author dongyansong
 * @date 2018-10-26
 */
import React from 'react'
import styled from 'react-emotion'
import { navigate } from '@reach/router'
import { Subscribe } from '@cc98/state'
import { IRecentMessage } from '@cc98/api'

import dayjs from 'dayjs'

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'

import store, { UserInfoStore } from '@/model/user'

import avatar from '@/assets/9.png'

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

const renderItem = (message: IRecentMessage, username = '', userAvatar = avatar) => (
  <ListItem button onClick={() => navigateToDetail(message.userId)}>
    <ListItemAvatar>
      <Avatar src={userAvatar} />
    </ListItemAvatar>
    <ListItemText primary={username} secondary={<Text>{message.lastContent}</Text>} />
    <ListItemSecondaryAction>
      <ListItemText secondary={dayjs(message.time).fromNow()} />
    </ListItemSecondaryAction>
  </ListItem>
)

export default ({ message }: Props) => (
  <Subscribe to={[store]}>
    {({ state }: UserInfoStore) =>
      renderItem(
        message,
        state[message.userId] && state[message.userId].name,
        state[message.userId] && state[message.userId].portraitUrl
      )}
  </Subscribe>
)
