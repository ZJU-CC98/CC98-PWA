/**
 * @author dongyansong
 * @date 2018-10-29
 */
import { Subscribe } from '@cc98/state'
import { ListItem, ListItemText, Switch } from '@material-ui/core'
import React from 'react'

import store, { Store } from '@/model/signalr'

export default () => (
  <Subscribe to={[store]}>
    {({ state: { shouldUseSignalr }, setShouldUseSignalr }: Store) => (
      <ListItem button onClick={() => setShouldUseSignalr(!shouldUseSignalr)}>
        <ListItemText primary="开启实时通知" />
        <Switch checked={shouldUseSignalr} />
      </ListItem>
    )}
  </Subscribe>
)
