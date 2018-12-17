import React from 'react'

import useContainer from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'

import { ListItem, ListItemText, Switch } from '@material-ui/core'

export default () => {
  const { state, TOGGLE_SIGNALR } = useContainer(settingInstance)

  return (
    <ListItem button>
      <ListItemText primary="实时通知" secondary="暂未开发" />
      <Switch disabled={true} checked={state.useSignalr} onChange={TOGGLE_SIGNALR} />
    </ListItem>
  )
}
