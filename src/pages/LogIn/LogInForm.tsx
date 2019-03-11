import React, { useState } from 'react'
import { navigate } from '@/utils/history'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import {
  Button,
  CircularProgress,
  FormControl,
  // FormHelperText,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core'

import userModel from '@/models/user'

import { loginHandler } from '@/services/utils/errorHandler'

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

const LogInButton = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})({
  marginTop: 35,
})

const ButtonProgress = muiStyled(CircularProgress).attrs({
  size: 20,
  color: 'secondary',
})({
  marginLeft: 15,
})

interface FormField {
  username: string
  password: string
}

interface LogInState {
  loading: boolean
  logInFail: boolean
}

const LogIn: React.FC = () => {
  const [formField, setFormField] = useState<FormField>({
    username: '',
    password: '',
  })

  const [logInState, setLogInState] = useState<LogInState>({
    loading: false,
    logInFail: false,
  })

  const handleChange = (field: keyof FormField) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormField({
      ...formField,
      [field]: event.target.value,
    })
  }

  const logIn = async () => {
    const { username, password } = formField

    setLogInState({
      loading: true,
      logInFail: false,
    })

    const token = await userModel.LOG_IN(username, password)

    token
      .fail(err => {
        setTimeout(() => {
          setLogInState({
            loading: false,
            logInFail: true,
          })
        }, 2000)

        loginHandler(err)
      })
      .succeed(_ => {
        setTimeout(() => navigate('/'), 1500)
      })
  }

  const { logInFail, loading } = logInState

  return (
    <WrapperDiv>
      <SnowballImg src={snowball} />

      <Typography variant="h6">登录</Typography>

      <FormDiv>
        <FormControl fullWidth>
          <InputLabel htmlFor="username">用户名</InputLabel>
          <Input id="username" value={formField.username} onChange={handleChange('username')} />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="password">密码</InputLabel>
          <Input
            id="password"
            type="password"
            value={formField.password}
            onChange={handleChange('password')}
          />
        </FormControl>
      </FormDiv>

      <LogInButton disabled={loading} onClick={logIn}>
        {logInFail ? '重试' : '登录'}
        {loading && <ButtonProgress />}
      </LogInButton>
    </WrapperDiv>
  )
}

export default LogIn
