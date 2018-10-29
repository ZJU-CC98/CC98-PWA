/**
 * @author dongyansong
 * @date 2018-10-26
 */
import { Subscribe } from '@cc98/state'
import { List, RootRef } from '@material-ui/core'
import React from 'react'

import Editor from '@/components/Editor'
import Load from '@/components/InfinitiList/reverse'
import store, { Detail } from '@/model/message/detail'

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
    return (
      <Subscribe to={[store]}>
        {({
          state: { messages, isEnd, isLoading },
        }: Detail) => (
          <>
            <RootRef rootRef={this.list}>
              <List>
                <Load isEnd={isEnd} isLoading={isLoading} callback={store.getList}>
                  {messages.map(item => <DetailItem key={item.id} message={item} />)}
                </Load>
              </List>
            </RootRef>
            <Editor sendCallBack={store.sendMessage} />
          </>
        )}
      </Subscribe>
    )
  }
}
