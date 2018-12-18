import React from 'react'

import { List } from '@material-ui/core'

import Signalr from './Signalr'
import Theme from './Theme'
import Proxy from './Proxy'
import Cache from './Cache'

import useContainer from '@/hooks/useContainer'
import userInstance from '@/containers/user'

import proxtList from '@/config/proxy'

const Setting: React.FunctionComponent = () => {
  const { myInfo, isLogIn } = useContainer(userInstance).state

  const isDev = isLogIn && myInfo && proxtList.indexOf(myInfo.name) !== -1

  return (
    <List>
      <Signalr />
      <Theme />
      <Cache />
      {isDev && <Proxy />}
    </List>
  )
}

export default Setting
