import React from 'react'
import { css } from 'emotion'
import version from '@/version'

import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

import { Subscribe } from '@cc98/state'
import basicInstance, { BasicContainer } from '@/model/basicInstance'

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
  <Subscribe to={[basicInstance]}>
    {(basic: BasicContainer) => (
      <>
        <TopBar onOpen={() => basicInstance.OpenDrawer()} />
        <DrawerMenu
          isLogIn={basic.state.isLogIn}
          open={basic.state.isDrawerOpen}
          onClose={() => basicInstance.CloseDrawer()}
          onLogout={() => basicInstance.LogOut()}
        >
          <UserInfo isLogIn={basic.state.isLogIn} info={basic.state.myInfo} />
        </DrawerMenu>
      </>
    )}
  </Subscribe>
)

export default Wrapper
