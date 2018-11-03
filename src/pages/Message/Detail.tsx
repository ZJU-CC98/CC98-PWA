/**
 * @author dongyansong
 * @date 2018-10-26
 */
import Editor from '@/components/Editor'
import InfiniteList from '@/components/InfiniteList'
import store, { Detail } from '@/model/message/detail'
import { Subscribe } from '@cc98/state'
import { List, RootRef } from '@material-ui/core'
import Paper from '@material-ui/core/paper'
import { css } from 'emotion'
import React from 'react'
import DetailItem from './DetailItem'

interface Props {
  id: string
}

export default class DetailList extends React.PureComponent<Props> {
  list = React.createRef<HTMLUListElement>()

  componentDidMount() {
    store
      .init(this.props.id)
      .then(this.scrollToBottom)
  }

  scrollToBottom = () => {
    if (this.list.current) window.scrollTo(0, this.list.current.scrollHeight)
  }

  render() {
    const { id } = this.props

    return (
      <Subscribe to={[store]}>
        {({
          state: { messages, isEnd, isLoading },
        }: Detail) => (
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
                        messages[id].map(item => <DetailItem key={item.id} message={item} />
                        )}
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
