import React from 'react'

import { List } from '@material-ui/core'

import Proxy from './Proxy'
import Signalr from './Signalr'
import Theme from './Theme'

export default () => (
  <List>
    <Proxy />
    <Signalr />
    <Theme />
  </List>
)
