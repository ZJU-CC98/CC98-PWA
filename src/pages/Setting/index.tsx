import React from 'react'

import { List } from '@material-ui/core'

import Signalr from './Signalr'
import Theme from './Theme'
import Proxy from './Proxy'

import proxtList from '@/config/proxy'

const Setting: React.FunctionComponent = () => {
  // FIXME:
  const username = 'u63'
  const isLogIn = false
  const isDev = proxtList.indexOf(username) !== -1

  return (
    <List>
      <Signalr />
      <Theme />
      {isDev && <Proxy />}
    </List>
  )
}

export default Setting
