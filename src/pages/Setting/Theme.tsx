import React from 'react'

import { Subscribe } from '@cc98/state'
import { ListItem, ListItemText, Switch } from '@material-ui/core'

import global, { GlobalContainer } from '@/model/global'

export default () => (
  <Subscribe to={[global]}>
    {({ state: { theme }, CHANGE_THEME }: GlobalContainer) => (
      <ListItem button onClick={CHANGE_THEME}>
        <ListItemText primary="暗色主题" />
        <Switch checked={theme === 'dark'} />
      </ListItem>
    )}
  </Subscribe>
)
