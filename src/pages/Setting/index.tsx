/**
 * @author dongyansong
 * @date 2018-10-23
 */
import { List } from '@material-ui/core'
import React from 'react'

import Proxy from './Proxy'
import Signalr from './Signalr'

export default () => (
  <List>
    <Proxy />
    <Signalr />
  </List>
)
