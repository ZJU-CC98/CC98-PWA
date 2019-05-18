import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import { ListItem, Switch } from '@material-ui/core'
import ListItemText from '@/hotfix/ListItemText'

import { ModeEnum } from '@/theme'

const Theme = () => {
  const { mode } = useModel(settingModel, ['mode'])
  const { TOGGLE_MODE } = settingModel

  return (
    <ListItem button>
      <ListItemText primary="夜间模式" secondary="使用暗色主题" />
      <Switch checked={mode === ModeEnum.DARK} onChange={TOGGLE_MODE} />
    </ListItem>
  )
}

export default React.memo(Theme)
