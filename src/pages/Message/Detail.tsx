import React, { useState } from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import useInfList from '@/hooks/useInfList'
import InfiniteList from '@/components/InfiniteList'

import { List } from '@material-ui/core'

import DetailItem from './components/DetailItem'
import Editor from './Editor'
import { getMessageContent, sendMessage } from '@/services/message'

const ListS = muiStyled(List)({
  width: '100%',
  position: 'absolute',
  top: 56,
  bottom: 80,
  padding: '8px 0',
})

const FixBottomDiv = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
`
interface Props {
  /**
   * 联系人id (from url)
   */
  id: string
}

export default ({ id }: Props) => {
  const [messageListKey, setMessageListKey] = useState(0)

  return (
    <MessageList
      key={messageListKey}
      id={id}
      refresh={() => setMessageListKey(messageListKey + 1)}
    />
  )
}

/**
 * 私信-会话列表
 */
const MessageList = ({ id, refresh }: Props & { refresh: () => void }) => {
  const service = (from: number) => getMessageContent(id, from, 10)
  const [list, state, callback] = useInfList(service, {
    step: 10,
  })

  const { isLoading, isEnd } = state

  const sendMsg = (content: string) => {
    sendMessage(id, content).then(res => {
      res.fail().succeed(_ => {
        refresh()
      })
    })
  }

  return (
    <>
      <ListS>
        <InfiniteList
          reverse
          inFixedContainer
          isEnd={isEnd}
          isLoading={isLoading}
          callback={callback}
        >
          {list.map(item => (
            <DetailItem key={item.id} message={item} />
          ))}
        </InfiniteList>
      </ListS>

      <FixBottomDiv>
        <Editor callback={sendMsg} />
      </FixBottomDiv>
    </>
  )
}
