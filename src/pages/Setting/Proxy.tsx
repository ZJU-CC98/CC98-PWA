import { Subscribe } from '@cc98/state'
import { ListItem, ListItemText, Switch } from '@material-ui/core'
import React from 'react'

import store, { HostType, Store } from '@/model/apiHost'

export default () => (
  <Subscribe to={[store]}>
    {({ state: { type }, useDefault, useProxy }: Store) => (
      <ListItem>
        <ListItemText primary="使用代理" />
        <Switch
          onClick={type === HostType.Proxy ? useDefault : useProxy}
          checked={type === HostType.Proxy}
        />
      </ListItem>
    )}
  </Subscribe>
)
