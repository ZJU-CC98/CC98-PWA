/**
 * @author dongyansong
 * @date 2018-10-23
 */
import { Subscribe } from '@cc98/state'
import { List } from '@material-ui/core'
import React from 'react'

import store, { MessageStore } from '@/model/message'

import ListItem from './ListItem'

export default () => (
  <Subscribe to={[store]}>
    {({ state: { recentList } }: MessageStore) => (
      <List>
        {recentList.map(item => <ListItem key={item.userId} message={item} />)}
      </List>
    )}
  </Subscribe>
)
