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

// TODO: 消息气泡
const renderItem = (
  message: IMessageContent,
  userAvatar = avatar,
  isCurrSend: boolean
) => !isCurrSend ? (
  <ListItem>
    <ListItemAvatar>
      <Avatar src={userAvatar} />
    </ListItemAvatar>
    <ListItemText primary={message.content} secondary={new Date(message.time).toLocaleString()} />
    <ListItemText />
  </ListItem>
) : (
  <ListItem>
    <ListItemText />
    <ListItemText primary={message.content} secondary={new Date(message.time).toLocaleString()} />
    <ListItemAvatar>
      <Avatar src={userAvatar} />
    </ListItemAvatar>
  </ListItem>
)

export default ({ message }: Props) => (
  <Subscribe to={[user, basic]}>
    {({ state }: UserInfoStore, { state: { myInfo } }: BasicContainer) =>
      renderItem(
        message,
        state[message.senderId] && state[message.senderId].portraitUrl,
        !!myInfo && (myInfo.id === message.senderId)
      )
    }
  </Subscribe>
)
