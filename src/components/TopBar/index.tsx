import React from 'react'
import { css } from 'emotion'

import { Subscribe } from '@cc98/state'
import global, { GlobalContainer } from '@/model/global'

import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

import DrawerMenu from './DrawerMenu'
import UserInfo from './UserInfo'

import version from '@/version'

const grow = css`
  flex-grow: 1;
`

const icon = css`
  && {
    margin-left: -12px;
    margin-right: 5px;
  }
`

const button = css`
  && {
    margin-right: -12px;
  }
`

const TopBar: React.SFC<{
  onClick: () => void
}> = ({ onClick }) => (
  <AppBar position="fixed">
    <Toolbar>
      <IconButton className={icon} color="inherit" onClick={onClick}>
        <MenuIcon />
      </IconButton>

      <Typography className={grow} color="inherit">
        CC98
      </Typography>

      <Button className={button} color="inherit" size="small">
        {version}
      </Button>
    </Toolbar>
  </AppBar>
)

const Wrapper: React.SFC = () => (
  <Subscribe to={[global]}>
    {(g: GlobalContainer) => (
      <>
        <TopBar onClick={g.OPEN_DRAWER} />
        <DrawerMenu
          isLogIn={g.state.isLogIn}
          open={g.state.isDrawerOpen}
          onClose={g.CLOSE_DRAWER}
          onLogout={g.LOG_OUT}
        >
          <UserInfo isLogIn={g.state.isLogIn} info={g.state.myInfo} />
        </DrawerMenu>
      </>
    )}
  </Subscribe>
)

export default Wrapper
