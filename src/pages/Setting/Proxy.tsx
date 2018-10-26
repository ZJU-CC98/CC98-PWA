/**
 * @author dongyansong
 * @date 2018-10-23
 */
import { Subscribe } from '@cc98/state'
import { ListItem, ListItemText, Switch } from '@material-ui/core'
import React from 'react'

import store, { HostType, Store } from '@/model/apiHost'

export default () => (
  <Subscribe to={[store]}>
    {({ state: { type }, useDefault, useProxy }: Store) => (
      <ListItem button onClick={type === HostType.Proxy ? useDefault : useProxy}>
        <ListItemText primary="使用代理" />
        <Switch checked={type === HostType.Proxy} />
      </ListItem>
    )}
  </Subscribe>
)
