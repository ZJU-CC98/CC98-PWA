import version from '@/version'
import { css } from 'emotion'
import React from 'react'

import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

import global, { GlobalContainer } from '@/model/global'
import { Subscribe } from '@cc98/state'

import DrawerMenu from './DrawerMenu'
import UserInfo from './UserInfo'

const placeholder = css`
  height: 56px;

  @media (min-width: 600px) {
    height: 64px;
  }
`

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

const TopBar: React.SFC<{
  onOpen: () => void
}> = ({ onOpen }) => (
  <>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton className={icon} color="inherit" onClick={onOpen}>
          <MenuIcon />
        </IconButton>

        <Typography className={grow} color="inherit">
          {' '}
          CC98
        </Typography>

        <Button className={login} color="inherit" size="small">
          {' '}
          {version}
        </Button>
      </Toolbar>
    </AppBar>
    <div className={placeholder} />
  </>
)

const Wrapper: React.SFC = () => (
  <Subscribe to={[global]}>
    {(g: GlobalContainer) => (
      <>
        <TopBar onOpen={() => g.openDrawer()} />
        <DrawerMenu
          isLogIn={g.state.isLogIn}
          open={g.state.isDrawerOpen}
          onClose={() => g.closeDrawer()}
          onLogout={() => g.logOut()}
          changeTheme={() => g.changeTheme()}
          theme={g.state.theme}
        >
          <UserInfo isLogIn={g.state.isLogIn} info={g.state.myInfo} />
        </DrawerMenu>
      </>
    )}
  </Subscribe>
)

export default Wrapper
