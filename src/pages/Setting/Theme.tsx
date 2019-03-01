import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import { ListItem, ListItemText, Switch } from '@material-ui/core'

const Theme = () => {
  const { theme } = useModel(settingModel, ['theme'])
  const { TOGGLE_THEME } = settingModel

  return (
    <ListItem button>
      <ListItemText primary="夜间模式" secondary="使用暗色主题" />
      <Switch checked={theme === 'dark'} onChange={TOGGLE_THEME} />
    </ListItem>
  )
}

export default React.memo(Theme)
