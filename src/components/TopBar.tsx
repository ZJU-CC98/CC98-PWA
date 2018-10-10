import React from 'react'
import { css } from 'emotion'

import {
  AppBar, Toolbar,
  Typography,
  Button, IconButton,
} from '@material-ui/core'

import {
  Menu as MenuIcon
} from '@material-ui/icons'

const grow = css`
  flex-grow: 1;
`

const icon = css`
  && {
    margin-left: -12px;
    margin-right: 5px;
  }
`

const TopBar: React.SFC = () => (
  <AppBar position="sticky">
    <Toolbar>
      <IconButton className={icon} color="inherit">
        <MenuIcon />
      </IconButton>

      <Typography
        className={grow} color="inherit"
      > CC98
      </Typography>

      <Button
        color="inherit" size="small"
      > Login
      </Button>
    </Toolbar>
  </AppBar>
)

export default TopBar
