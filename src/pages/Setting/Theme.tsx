import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import { ListItem, ListItemText, Switch } from '@material-ui/core'

const Theme = () => {
  const {
    state: { theme },
    TOGGLE_THEME,
  } = useModel(settingModel, (prev, next) => prev.theme !== next.theme)

  return (
    <ListItem button>
      <ListItemText primary="夜间模式" secondary="使用暗色主题" />
      <Switch checked={theme === 'dark'} onChange={TOGGLE_THEME} />
    </ListItem>
  )
}

export default React.memo(Theme)
