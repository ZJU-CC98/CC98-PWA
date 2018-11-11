import React from 'react'

import { List } from '@material-ui/core'

import Signalr from './Signalr'
import Theme from './Theme'
import Proxy from './Proxy'
export default () => (
  <List>
    <Signalr />
    <Theme />
    <Proxy />
  </List>
)
