/**
 * @author dongyansong
 * @date 2018-10-26
 */
import React from 'react'
import { Subscribe } from '@cc98/state'

import Editor from '@/components/Editor'
import InfiniteList from '@/components/InfiniteList'
import store, { Detail } from '@/pages/Message/model/detail'

import { List, RootRef } from '@material-ui/core'

import DetailItem from './components/DetailItem'

interface Props {
  /**
   * 联系人id (from url)
   */
  id: string
}

/**
 * @description 私信 会话列表
 * @author dongyansong
 */
export default ({ id }: Props) => {
  const list = React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    store
      .init(parseInt(id, 10))
      .then(() => list.current && window.scrollTo(0, list.current.scrollHeight))
  }, [])

  return (
    <Subscribe to={[store]}>
      {({ state: { messages, isEnd, isLoading } }: Detail) => (
        <>
          <RootRef rootRef={list}>
            <List>
              <InfiniteList
                loadingPosition="top"
                isEnd={isEnd[id]}
                isLoading={isLoading}
                callback={store.getList}
              >
                {messages[id] &&
                  messages[id]!.map(item => <DetailItem key={item.id} message={item} />)}
              </InfiniteList>
            </List>
          </RootRef>
          <Editor sendCallBack={store.sendMessage} />
        </>
      )}
    </Subscribe>
  )
}
