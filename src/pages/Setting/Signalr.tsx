import React from 'react'

import useGlobalContainer from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'

import { ListItem, ListItemText, Switch } from '@material-ui/core'

export default () => {
  const { state, TOGGLE_SIGNALR } = useGlobalContainer(settingInstance)

  return (
    <ListItem button>
      <ListItemText primary="开启实时通知" />
      <Switch checked={state.useSignalr} onChange={TOGGLE_SIGNALR} />
    </ListItem>
  )
}
