import React from 'react'

import AppBar from '../components/AppBar'

import { logIn } from '../utility/logIn'
import { getLocalStorage } from '../utility/storage'


interface Props {

}

interface State {

}

class TopBar extends React.Component<Props, State> {

  render() {
    const isLogIn = !!getLocalStorage('access_token')

    return (
      <AppBar
        text='CC98'
        buttonText={ isLogIn ? 'HELLO' : 'LOGIN'}
        clickHandle={ isLogIn ? undefined : logIn }
      />
    )
  }
}

export default TopBar
