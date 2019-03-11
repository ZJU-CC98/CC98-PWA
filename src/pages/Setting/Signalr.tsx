import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import { ListItem, ListItemText, Switch } from '@material-ui/core'

export default () => {
  const { useSignalr } = useModel(settingModel, ['useSignalr'])
  const { TOGGLE_SIGNALR } = settingModel

  return (
    <ListItem button>
      <ListItemText primary="实时通知" secondary="实时获取新通知（暂不可用）" />
      <Switch disabled={true} checked={useSignalr} onChange={TOGGLE_SIGNALR} />
    </ListItem>
  )
}
