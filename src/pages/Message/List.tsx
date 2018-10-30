/**
 * @author dongyansong
 * @date 2018-10-23
 */
import { Subscribe } from '@cc98/state'
import { List } from '@material-ui/core'
import React from 'react'

import InfiniteList from '@/components/InfiniteList'
import store, { MessageStore } from '@/model/message/recent'

import ListItem from './ListItem'

export default class MessageList extends React.PureComponent {
  componentDidMount() {
    store.initRecentList()
  }

  render() {
    return (
      <Subscribe to={[store]}>
        {({
          state: { recentList, recentListEnd, recentListLoading },
          getRecentList,
        }: MessageStore) => (
          <List>
            <InfiniteList
              isEnd={recentListEnd}
              isLoading={recentListLoading}
              callback={getRecentList}
            >
              {recentList.map(item => (
                <ListItem key={item.userId} message={item} />
              ))}
            </InfiniteList>
          </List>
        )}
      </Subscribe>
    )
  }
}
