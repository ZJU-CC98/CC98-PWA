/**
 * @author dongyansong
 * @date 2018-10-26
 */
import React from 'react'
import { Subscribe } from '@cc98/state'
import { IMessageContent } from '@cc98/api'
import styled, { css } from 'react-emotion'

import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

import global, { GlobalContainer } from '@/model/global'
import user, { UserInfoStore } from '@/model/user'

import avatar from '@/assets/9.png'

const AvatarClass = css`
  align-self: flex-start;
`

const MessageRoot = styled.div`
  width: 50%;
  max-width: 30em;
  min-width: 15em;
  display: flex;
  flex-direction: column;
  padding: 0 1em;
`

const MessageContent = styled.div`
  background-color: #eee;
  line-height: 2em;
  padding: 0.25em 0.5em;
  position: relative;
  font-size: 0.85em;
  border-radius: 3px;
  min-height: 3em;
  display: flex;
  align-items: center;
`

const MessageContentLeft = styled(MessageContent)`
  &::before {
    content: '';
    border-style: solid;
    border-width: 0.5em 0.5em 0.5em 0;
    border-color: transparent;
    border-right-color: #eee;
    left: -0.5em;
    position: absolute;
    top: 1em;
  }
`

const MessageContentRight = styled(MessageContent)`
  &::after {
    content: '';
    border-style: solid;
    border-width: 0.5em 0 0.5em 0.5em;
    border-color: transparent;
    border-left-color: #eee;
    right: -0.5em;
    position: absolute;
    top: 1em;
  }
`

const MessageDate = styled.span<{ right?: boolean }>`
  color: #666;
  font-size: 0.7em;
  align-self: ${props => (props.right ? 'flex-end' : '')};
`

interface Props {
  message: IMessageContent
}

// TODO: 消息气泡
const renderItem = (message: IMessageContent, userAvatar = avatar, isCurrSend: boolean) =>
  !isCurrSend ? (
    <ListItem>
      <ListItemAvatar className={AvatarClass}>
        <Avatar src={userAvatar} />
      </ListItemAvatar>
      <MessageRoot>
        <MessageContentLeft>{message.content}</MessageContentLeft>
        {/* FIXME: format Date*/}
        {/* <MessageDate right>{dayjs(message.time).format('YYYY-MM-DD HH:mm:ss')}</MessageDate> */}
      </MessageRoot>
    </ListItem>
  ) : (
    <ListItem>
      <ListItemText />
      <MessageRoot>
        <MessageContentRight>{message.content}</MessageContentRight>
        {/* <MessageDate>{dayjs(message.time).format('YYYY-MM-DD HH:mm:ss')}</MessageDate> */}
      </MessageRoot>
      <ListItemAvatar className={AvatarClass}>
        <Avatar src={userAvatar} />
      </ListItemAvatar>
    </ListItem>
  )

export default ({ message }: Props) => (
  <Subscribe to={[user, global]}>
    {({ state }: UserInfoStore, { state: { myInfo } }: GlobalContainer) =>
      renderItem(
        message,
        state[message.senderId] && state[message.senderId].portraitUrl,
        !!myInfo && myInfo.id === message.senderId
      )}
  </Subscribe>
)
