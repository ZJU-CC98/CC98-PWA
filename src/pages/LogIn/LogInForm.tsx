import React from 'react'
import { navigate } from '@reach/router'
import { css } from 'emotion'

import {
  Typography,
  Input, InputLabel,
  FormControl, FormHelperText,
  Button,
  CircularProgress,
} from '@material-ui/core'

import basicInstance from '@/model/basicInstance'

import { logIn } from '@/utils/fetch'
import { setLocalStorage } from '@/utils/storage'

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

const buttonProgress = css`
  margin-left: 15px;
`

type FormField = {
  username: string
  password: string
}

type State = {
  formField: FormField
  loading: boolean
  logInFail: boolean
}

class LogIn extends React.PureComponent<{}, State> {

  state: State = {
    formField: {
      username: '',
      password: '',
    },

    loading: false,
    logInFail: false,
  }

  handleChange = (field: keyof FormField) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      formField: {
        ...this.state.formField,
        [field]: event.target.value
      }
    })
  }

  logIn = async () => {
    const { formField: { username, password } } = this.state

    this.setState({
      loading: true,
      logInFail: false,
    })


    // FIXME: 登陆逻辑移动到 basic model 中去
    const token = await logIn(username, password)

    token
      .fail(
        () => {
          setTimeout(
            () => {
              this.setState({
                loading: false,
                logInFail: true,
              })
            },
            2000
          )
        }
      )
      .succeed(
        token => {
          const access_token = `${token.token_type} ${token.access_token}`

          setLocalStorage('access_token', access_token, token.expires_in)
          // refresh_token 有效期一个月
          setLocalStorage('refresh_token', token.refresh_token, 2592000)

          basicInstance.LogIn()

          setTimeout(
            () => navigate('/'),
            1500
          )
        }
      )
  }

  render() {
    const { formField, loading, logInFail } = this.state

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
              value={formField.username}
              onChange={this.handleChange('username')}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password"
              type="password"
              value={formField.password}
              onChange={this.handleChange('password')}
            />
          </FormControl>
        </div>

        <div className={button}>
          <Button variant="contained"
            color="primary"
            disabled={loading}
            onClick={this.logIn}
          >
            {logInFail ? 'Retry' : 'LogIn'}
            {loading && <CircularProgress
              size={20} color="secondary"
              className={buttonProgress}
            />}
          </Button>
        </div>
      </div>
    )
  }
}

export default LogIn
