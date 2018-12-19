import React from 'react'

import useContainer from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'
import userInstance from '@/containers/user'

import { ListItem, ListItemText, Switch } from '@material-ui/core'

import ProxyList from '@/config/proxy'

export default () => {
  const { state, TOGGLE_PROXY } = useContainer(settingInstance)
  const {
    state: { myInfo },
  } = useContainer(userInstance)

  const isDev = myInfo !== null && ProxyList.indexOf(myInfo.name) !== -1

  return (
    <ListItem button>
      <ListItemText primary="使用代理" secondary="仅面向开发使用" />
      <Switch disabled={!isDev} checked={state.useProxy} onChange={TOGGLE_PROXY} />
    </ListItem>
  )
}
