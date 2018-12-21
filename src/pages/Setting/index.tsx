import React from 'react'

import { List } from '@material-ui/core'

import Signalr from './Signalr'
import Theme from './Theme'
import Cache from './Cache'
import CustomHome from './Home'

const Setting: React.FunctionComponent = () => (
  <List>
    <Signalr />
    <Theme />
    <Cache />
    <CustomHome />
  </List>
)

export default Setting
