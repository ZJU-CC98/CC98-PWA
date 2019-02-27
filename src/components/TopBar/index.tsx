import React from 'react'
import muiStyled from '@/muiStyled'

import stateModel from '@/models/state'

import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

import version from '@/version'

const IconButtonS = muiStyled(IconButton).attrs({
  color: 'inherit',
})({
  marginLeft: -12,
  marginRight: 5,
})

const MainText = muiStyled(Typography).attrs({
  color: 'inherit',
})({
  flexGrow: 1,
})

const Version = muiStyled(Button).attrs({
  color: 'inherit',
  size: 'small',
})({
  marginRight: -12,
})

const TopBar: React.FC = () => (
  <AppBar position="fixed">
    <Toolbar>
      <IconButtonS onClick={stateModel.OPEN_DRAWER}>
        <MenuIcon />
      </IconButtonS>

      <MainText>CC98</MainText>
      <Version>{version}</Version>
    </Toolbar>
  </AppBar>
)

export default TopBar
