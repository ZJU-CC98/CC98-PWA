/**
 * @author dongyansong
 * @date 2018-10-26
 */
import { Subscribe } from '@cc98/state'
import { List, RootRef } from '@material-ui/core'
import React from 'react'

import store, { Detail } from '@/model/message/detail'

import DetailItem from './DetailItem'

interface Props {
  id: string
}

export default class DetailList extends React.PureComponent<Props> {
  list: HTMLUListElement

  componentDidMount() {
    store
      .init(this.props.id)
      .then(this.scrollToBottom)
  }

  scrollToBottom = () => {
    window.scrollTo(0, this.list.scrollHeight)
  }

  getRef = (it: HTMLUListElement) => {
    this.list = it
  }

  render() {
    return (
      <Subscribe to={[store]}>
        {({
          state: { messages, isEnd, isLoading },
        }: Detail) => (
          <RootRef rootRef={this.getRef}>
            <List>
              {messages.map(item => <DetailItem key={item.id} message={item} />)}
            </List>
          </RootRef>
        )}
      </Subscribe>
    )
  }
}
