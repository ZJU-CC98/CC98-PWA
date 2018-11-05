import React from 'react'

import { Button, Typography } from '@material-ui/core'

import LayoutCenter from '@/components/LayoutCenter'

import { GET, POST } from '@/utils/fetch'

interface ISignIn {
  /*
  *今日是否已签到
  */
  hasSignedInToday: boolean
  /*
  *连续签到天数
  */
  lastSignInCount: number
  /*
  *上次签到时间
  */
  lastSignInTime: string
}

interface State {
  hasSignedInToday: boolean
}

class SignIn extends React.Component<{}, State> {
  state: State = {
    hasSignedInToday: false,
  }

  async componentDidMount() {
    const res = await GET<ISignIn>('me/signin')

    res.fail().succeed(signInRes => {
      this.setState({
        hasSignedInToday: signInRes.hasSignedInToday,
      })
    })
  }

  signIn = async () => {
    if (this.state.hasSignedInToday) {
      return
    }

    const response = await POST('me/signin')
    response.fail().succeed(() => {
      this.setState({
        hasSignedInToday: true,
      })
    })
  }

  render() {
    const { hasSignedInToday } = this.state

    return (
      <>
        <LayoutCenter>
          <Button onClick={this.signIn}>
            <Typography variant="h6" color="primary">
              {hasSignedInToday ? '已签到' : '签到'}
            </Typography>
          </Button>
        </LayoutCenter>
      </>
    )
  }
}

export default SignIn
