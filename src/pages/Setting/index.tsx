import React from 'react'

import { List } from '@material-ui/core'

import Signalr from './Signalr'
import Theme from './Theme'
import Cache from './Cache'

const Setting: React.FunctionComponent = () => (
  <List>
    <Signalr />
    <Theme />
    <Cache />
  </List>
)

export default Setting
