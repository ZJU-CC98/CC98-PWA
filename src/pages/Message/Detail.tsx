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
import Paper from '@material-ui/core/Paper'

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
export default class DetailList extends React.PureComponent<Props> {
  list = React.createRef<HTMLUListElement>()

  componentDidMount() {
    store.init(parseInt(this.props.id, 10)).then(this.scrollToBottom)
  }

  scrollToBottom = () => {
    if (this.list.current) window.scrollTo(0, this.list.current.scrollHeight)
  }

  render() {
    const { id } = this.props

    return (
      <Subscribe to={[store]}>
        {({ state: { messages, isEnd, isLoading } }: Detail) => (
          <>
            <Paper>
              <RootRef rootRef={this.list}>
                <List>
                  <InfiniteList
                    loadingPosition="top"
                    isEnd={isEnd}
                    isLoading={isLoading}
                    callback={store.getList}
                  >
                    {messages[id] &&
                      messages[id]!.map(item => <DetailItem key={item.id} message={item} />)}
                  </InfiniteList>
                </List>
              </RootRef>
            </Paper>
            <Editor sendCallBack={store.sendMessage} />
          </>
        )}
      </Subscribe>
    )
  }
}
