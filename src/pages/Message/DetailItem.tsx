/**
 * @author dongyansong
 * @date 2018-10-26
 */
import { Subscribe } from '@cc98/state'
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import React from 'react'

import basic, { BasicContainer } from '@/model/basicInstance'
import user, { UserInfoStore } from '@/model/user'
import { IMessageContent, IUser } from '@cc98/api'

import avatar from '@/assets/9.png'

interface Props {
  message: IMessageContent
}

const renderItem = (message: IMessageContent, username = '', userAvatar = avatar) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar src={userAvatar} />
    </ListItemAvatar>
    <ListItemText primary={username} secondary={message.content} />
    <ListItemSecondaryAction>
      <ListItemText secondary={new Date(message.time).toLocaleDateString()} />
    </ListItemSecondaryAction>
  </ListItem>
)

export default ({ message }: Props) => (
  <Subscribe to={[user, basic]}>
    {({ state }: UserInfoStore) =>
      renderItem(
        message,
        state[message.senderId] && state[message.senderId].name,
        state[message.senderId] && state[message.senderId].portraitUrl
      )
    }
  </Subscribe>
)
