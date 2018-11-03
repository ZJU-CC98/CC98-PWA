/**
 * @author dongyansong
 * @date 2018-10-23
 */
import { List } from '@material-ui/core'
import React from 'react'

import Paper from '@material-ui/core/paper'
import { css } from 'emotion'
import Proxy from './Proxy'
import Signalr from './Signalr'
const IndexStyle = css`&&{
  height:90vh;
}`
export default () => (
  <Paper className={IndexStyle}>
    <List>
      <Proxy />
      <Signalr />
    </List>
  </Paper>
)
