/**
 * @author dongyansong
 * @date 2018-10-23
 */
import { Subscribe } from '@cc98/state'
import { List } from '@material-ui/core'
import React from 'react'

import InfiniteList from '@/components/InfiniteList'
import MessageStore from '@/pages/Message/model/recent'

import Paper from '@material-ui/core/Paper'
import ListItem from './components/ListItem'

/**
 * @description 私信 联系人列表
 * @author dongyansong
 */
export default () => (
  <Subscribe to={[MessageStore]}>
    {({ state: { recentList, recentListEnd, recentListLoading }, getRecentList }: MessageStore) => (
      <Paper>
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
      </Paper>
    )}
  </Subscribe>
)
