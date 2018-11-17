import React from 'react'

import { useGlobalContainer } from '@/hooks/useContainer'
import userInstance from '@/containers/user'
import stateInstance from '@/containers/state'

import TopBar from './TopBar'
import DrawerMenu from './DrawerMenu'
import UserInfo from './UserInfo'

const Top: React.FunctionComponent = () => {
  const { state: user, LOG_OUT } = useGlobalContainer(userInstance)
  const { state, OPEN_DRAWER, CLOSE_DRAWER } = useGlobalContainer(stateInstance)

  return (
    <>
      <TopBar onMenuClick={OPEN_DRAWER} />
      <DrawerMenu
        isLogIn={user.isLogIn}
        open={state.isDrawerOpen}
        onClose={CLOSE_DRAWER}
        onLogout={LOG_OUT}
      >
        <UserInfo isLogIn={user.isLogIn} info={user.myInfo} />
      </DrawerMenu>
    </>
  )
}

export default Top
