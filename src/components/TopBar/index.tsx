import React from 'react'
import { css } from 'emotion'

import {
  AppBar, Toolbar,
  Typography,
  Button, IconButton,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

import DrawerMenu from './DrawerMenu'

const grow = css`
  flex-grow: 1;
`

const icon = css`
  && {
    margin-left: -12px;
    margin-right: 5px;
  }
`

const login = css`
  && {
    margin-right: -12px;
  }
`

type State = {
  isDrawerOpen: boolean
}

class TopBar extends React.PureComponent<{}, State> {

  state: State = {
    isDrawerOpen: false,
  }

  openDrawer = () => {
    this.setState({
      isDrawerOpen: true,
    })
  }

  closeDrawer = () => {
    this.setState({
      isDrawerOpen: false,
    })
  }

  render() {
    const { isDrawerOpen } = this.state
    return (
      <AppBar position="sticky">
      <Toolbar>
        <IconButton className={icon} color="inherit"
          onClick={this.openDrawer}
        >
          <MenuIcon />
        </IconButton>
        <DrawerMenu
          open={isDrawerOpen}
          onClose={this.closeDrawer}
        />

        <Typography
          className={grow} color="inherit"
        > CC98
        </Typography>

        <Button
          className={login}
          color="inherit" size="small"
        > v0.5.0-alpha
        </Button>
      </Toolbar>
    </AppBar>
    )
  }
}

export default TopBar
