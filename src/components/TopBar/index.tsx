import React from 'react'
import styled from 'styled-components'

import stateInstance from '@/containers/state'

import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

import version from '@/version'

const IconButtonS = styled(IconButton).attrs({
  color: 'inherit',
})`
  && {
    margin-left: -12px;
    margin-right: 5px;
  }
`

const MainText = styled(Typography).attrs({
  color: 'inherit',
})`
  && {
    flex-grow: 1;
  }
`

const Version = styled(Button).attrs({
  color: 'inherit',
  size: 'small',
})`
  && {
    margin-right: -12px;
  }
`

const TopBar: React.FC = () => (
  <AppBar position="fixed">
    <Toolbar>
      <IconButtonS onClick={stateInstance.OPEN_DRAWER}>
        <MenuIcon />
      </IconButtonS>

      <MainText>CC98</MainText>
      <Version>{version}</Version>
    </Toolbar>
  </AppBar>
)

export default TopBar
