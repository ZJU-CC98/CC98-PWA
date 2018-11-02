import { css } from 'emotion'
import React from 'react'

import { Background } from '@/config'
import { GET, POST } from '@/utils/fetch'

import LayoutCenter from '@/components/LayoutCenter'
import global from '@/model/global'
import { Button, Typography } from '@material-ui/core'

const img = css`
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(${Background});
  background-size: cover;
  opacity: 0.85;
`

const button = css`
  && {
    border-color: rgba(255, 255, 255, 0.4);
    background-color:rgba(255, 255, 255, 0.4);
    transform: translateY(30px);
  }
`

const text = css`
  && {
    /* variant h6 */
    font-size: 1.25rem;
    font-weight: normal;
    color: #ffc0cb;
  }
`
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

    res.fail().succeed((signInRes: ISignIn) => {
      this.setState({
        hasSignedInToday: signInRes.hasSignedInToday,
      })
    })
  }

  async signIn() {
    const response = await POST('me/signin', {})
    response
      .fail()
      .succeed(() => {
        this.setState({
          hasSignedInToday: true,
        })
      })
  }

  render() {

    const buttonContent = this.state.hasSignedInToday ?
      (
        <Button
          className={button}
          variant="outlined"
          disableRipple
        >
          <Typography className={text}>已签到</Typography>
        </Button>
      )
      :
      (
        <Button
          className={button}
          variant="outlined"
          disableRipple
          onClick={() => this.signIn()}
        >
          <Typography className={text}>签到</Typography>
        </Button>
      )

    return (
      <>
        <div className={img} />
        <LayoutCenter>
          {buttonContent}
        </LayoutCenter>
      </>
    )
  }
}

export default SignIn
