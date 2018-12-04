import React from 'react'
import { navigate } from '@/utils/history'
import styled from 'styled-components'

import {
  Button,
  CircularProgress,
  FormControl,
  // FormHelperText,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core'

import userInstance from '@/containers/user'

import snowball from '@/assets/snowball.png'

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SnowballImg = styled.img`
  width: 100px;
  margin-bottom: 30px;
`

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 105px;
`

const LogInButton = styled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})`
  && {
    margin-top: 35px;
  }
`

const ButtonProgress = styled(CircularProgress).attrs({
  size: 20,
  color: 'secondary',
})`
  && {
    margin-left: 15px;
  }
`

interface FormField {
  username: string
  password: string
}

interface State {
  formField: FormField
  loading: boolean
  logInFail: boolean
}

// TODO: refactor with hooks

class LogIn extends React.Component<{}, State> {
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
        [field]: event.target.value,
      },
    })
  }

  logIn = async () => {
    const {
      formField: { username, password },
    } = this.state

    this.setState({
      loading: true,
      logInFail: false,
    })

    const token = await userInstance.LOG_IN(username, password)

    token
      .fail(() => {
        setTimeout(() => {
          this.setState({
            loading: false,
            logInFail: true,
          })
          // tslint:disable-next-line:align
        }, 2000)

        // TODO: 错误提示
      })
      .succeed(_ => {
        setTimeout(() => navigate('/'), 1500)
      })
  }

  render() {
    const { formField, loading, logInFail } = this.state

    return (
      <WrapperDiv>
        <SnowballImg src={snowball} />

        <Typography variant="h6">登录</Typography>

        <FormDiv>
          <FormControl fullWidth>
            <InputLabel htmlFor="username">用户名</InputLabel>
            <Input
              id="username"
              value={formField.username}
              onChange={this.handleChange('username')}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">密码</InputLabel>
            <Input
              id="password"
              type="password"
              value={formField.password}
              onChange={this.handleChange('password')}
            />
          </FormControl>
        </FormDiv>

        <LogInButton disabled={loading} onClick={this.logIn}>
          {logInFail ? 'Retry' : 'LogIn'}
          {loading && <ButtonProgress />}
        </LogInButton>
      </WrapperDiv>
    )
  }
}

export default LogIn
