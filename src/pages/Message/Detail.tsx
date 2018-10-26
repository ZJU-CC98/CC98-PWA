/**
 * @author dongyansong
 * @date 2018-10-26
 */
import { Subscribe } from '@cc98/state'
import { List } from '@material-ui/core'
import React from 'react'

import store, { Detail } from '@/model/message/detail'

import DetailItem from './DetailItem'

interface Props {
  id: string
}

export default class MessageList extends React.PureComponent<Props> {
  componentDidMount() {
    store.init(this.props.id)
  }

  render() {
    return (
      <Subscribe to={[store]}>
        {({
          state: { messages, isEnd, isLoading },
        }: Detail) => (
          <List>
            {messages.map(item => <DetailItem key={item.id} message={item} />)}
          </List>
        )}
      </Subscribe>
    )
  }
}
