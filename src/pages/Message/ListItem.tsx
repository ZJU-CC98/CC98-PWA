/**
 * @author dongyansong
 * @date 2018-10-26
 */
import { Subscribe } from '@cc98/state'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Popover } from '@material-ui/core'
import { navigate } from '@reach/router'
import React from 'react'

import store, { UserInfoStore } from '@/model/userInfo'
import { IRecentMessage, IUser } from '@cc98/api'

import avatar from '@/assets/9.png'

interface Props {
  message: IRecentMessage
}

const navigateToDetail = (userId: string) => navigate(`/messageDetail/${userId}`)

const renderItem = (message: IRecentMessage, username = '', userAvatar = avatar) => (
  <ListItem button onClick={() => navigateToDetail(message.userId)}>
    <ListItemAvatar>
      <Avatar src={userAvatar} />
    </ListItemAvatar>
    <ListItemText primary={username} secondary={message.lastContent} />
  </ListItem>
)

export default ({ message }: Props) => (
  <Subscribe to={[store]}>
    {({ state }: UserInfoStore) =>
      renderItem(
        message,
        state[message.userId] && state[message.userId].name,
        state[message.userId] && state[message.userId].portraitUrl
      )
    }
  </Subscribe>
)
