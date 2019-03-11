import React from 'react'

import { List } from '@material-ui/core'

import Signalr from './Signalr'
import Theme from './Theme'
import Mode from './Mode'
import Cache from './Cache'
import CustomHome from './Home'

const Setting: React.FC = () => (
  <List>
    <Signalr />
    <Theme />
    <Mode />
    <Cache />
    <CustomHome />
  </List>
)

export default Setting
