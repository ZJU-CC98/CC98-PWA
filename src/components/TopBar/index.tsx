import version from '@/version'
import { css } from 'emotion'
import React from 'react'

import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

import basicInstance, { BasicContainer } from '@/model/basicInstance'
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
  <Subscribe to={[basicInstance]}>
    {(basic: BasicContainer) => (
      <>
        <TopBar onOpen={() => basicInstance.openDrawer()} />
        <DrawerMenu
          isLogIn={basic.state.isLogIn}
          open={basic.state.isDrawerOpen}
          onClose={() => basicInstance.closeDrawer()}
          onLogout={() => basicInstance.logOut()}
        >
          <UserInfo isLogIn={basic.state.isLogIn} info={basic.state.myInfo} />
        </DrawerMenu>
      </>
    )}
  </Subscribe>
)

export default Wrapper
