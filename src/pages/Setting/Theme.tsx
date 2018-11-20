import React from 'react'

import useGlobalContainer from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'

import { ListItem, ListItemText, Switch } from '@material-ui/core'

export default () => {
  const { state, TOGGLE_THEME } = useGlobalContainer(settingInstance)

  return (
    <ListItem button>
      <ListItemText primary="暗色主题" />
      <Switch checked={state.theme === 'dark'} onChange={TOGGLE_THEME} />
    </ListItem>
  )
}
