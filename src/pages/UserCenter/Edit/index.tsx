import React, { useState } from 'react'

import { goback } from '@/utils/history'
import styled from 'styled-components'

import useContainer from '@/hooks/useContainer'
import userInstace from '@/containers/user'

import { IconButton, Typography, Button, TextField } from '@material-ui/core'

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import { modifyMyInfo } from '@/services/user'

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`

const GobackIcon = styled(IconButton)`
  && {
    margin-left: 4px;
    margin-right: 5px;
  }
`

const FormHeader = () => (
  <HeaderDiv>
    <GobackIcon onClick={goback}>
      <KeyboardBackspaceIcon />
    </GobackIcon>
    <Typography variant="subtitle2">编辑个人信息</Typography>
  </HeaderDiv>
)

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 16px;
`

const FormItem = styled(TextField).attrs({
  fullWidth: true,
  variant: 'outlined',
})`
  && {
    margin-bottom: 20px;
  }
` as typeof TextField // FIXME: @types/styled-components

const SubmitButton = styled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})`
  && {
    margin: 8px;
  }
`

const FormBody = () => {
  const {
    state: { myInfo },
  } = useContainer(userInstace)

  const [info, setInfo] = useState(myInfo)

  if (info === null) {
    return null
  }

  const handleChange = (name: keyof typeof info) => (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    info[name] = evt.target.value
    setInfo(info)
  }

  const handleSubmit = () => {
    modifyMyInfo(info).then(res =>
      res.fail().succeed(_ => {
        // TODO: 提示
        // console.log('[Modify success]')
        userInstace.FRESH_INFO()
      })
    )
  }

  return (
    <FormWrapper noValidate autoComplete="off">
      <FormItem
        label="性别"
        select
        SelectProps={{
          native: true,
        }}
        value={info.gender}
        onChange={handleChange('gender')}
      >
        <option value={1}>男</option>
        <option value={0}>女</option>
      </FormItem>
      <FormItem label="QQ" value={info.qq} onChange={handleChange('qq')} />
      <FormItem label="邮箱" value={info.emailAddress} onChange={handleChange('emailAddress')} />
      <FormItem
        label="签名档"
        value={info.signatureCode}
        onChange={handleChange('signatureCode')}
      />

      <SubmitButton onClick={handleSubmit}>提交修改</SubmitButton>
    </FormWrapper>
  )
}

export default () => (
  <>
    <FormHeader />
    <FormBody />
  </>
)
