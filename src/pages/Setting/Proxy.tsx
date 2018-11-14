import React from 'react'

import { useGlobalContainer } from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'

import { ListItem, ListItemText, Switch } from '@material-ui/core'

export default () => {
  const { state, TOGGLE_PROXY } = useGlobalContainer(settingInstance)

  return (
    <ListItem button>
      <ListItemText primary="使用代理" />
      <Switch checked={state.useProxy} onChange={TOGGLE_PROXY} />
    </ListItem>
  )
}
