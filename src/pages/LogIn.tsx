import React from 'react'

import { RouteComponentProps } from 'react-router-dom'

import { setLocalStorage } from '../utility/storage'

interface Props extends RouteComponentProps<{}> {

}

interface State {

}

class LogIn extends React.Component<Props, State> {

  componentDidMount() {
    const hash = this.props.location.hash

    if (hash) {
      let params = {}

      hash.slice(1).split('&').forEach((str) => {
        const kv = str.split('=')
        params[kv[0]] = kv[1]
      })

      // console.log(params)

      const accessToken = params['access_token']
      const expiresIn = params['expires_in']

      setLocalStorage('access_token', accessToken, parseInt(expiresIn))
    }

    this.props.history.replace('/')
  }

  render() {
    return null
  }
}

export default LogIn
