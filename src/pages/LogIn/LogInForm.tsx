import React from 'react'
import { css } from 'emotion'

import {
  Typography,
  Input, InputLabel,
  FormControl, FormHelperText,
  Button,
} from '@material-ui/core'

import { logIn } from '@/utils/fetch'
import history from '@/utils/history'

import snowball from '@/assets/snowball.png'

const root = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const snowBallImg = css`
  width: 100px;
  margin-bottom: 30px;
`

const form = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 105px;
`

const button = css`
  margin-top: 35px;
`

type State = {
  username: string
  password: string
}

class LogIn extends React.PureComponent<{}, State> {

  state: State = {
    username: '',
    password: '',
  }

  handleChange = (field: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [field]: event.target.value } as State)
  }

  logIn = async () => {
    const { username, password } = this.state

    const success = await logIn(username, password)

    if (success) {
      history.push('/')
    } else {
      console.error('[LogInForm] logIn Fail !')
    }
  }

  render() {
    return (
      <div className={root}>
        <img src={snowball} className={snowBallImg} />

        <Typography variant="h6">
          登录
          </Typography>

        <div className={form}>
          <FormControl fullWidth>
            <InputLabel htmlFor="component-simple">Username</InputLabel>
            <Input id="component-simple"
              value={this.state.username}
              onChange={this.handleChange('username')}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
          </FormControl>
        </div>

        <div className={button}>
          <Button variant="contained"
            color="primary"
            onClick={this.logIn}
          >LogIn</Button>
        </div>
      </div>
    )
  }
}

export default LogIn
