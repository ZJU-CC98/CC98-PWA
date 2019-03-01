import React, { useState } from 'react'

import { goback } from '@/utils/history'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import useModel from '@/hooks/useModel'
import userModel from '@/models/user'

import { IconButton, Typography, Button, TextField } from '@material-ui/core'

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import EditAvatar from './EditAvatar'

import { modifyMyInfo, modifyMyAvatar } from '@/services/user'
import snackbar from '@/utils/snackbar'

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`

const GobackIcon = muiStyled(IconButton)({
  marginLeft: 4,
  marginRight: 5,
})

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

const FormItem = muiStyled(TextField).attrs({
  fullWidth: true,
  variant: 'outlined',
})({
  marginBottom: 20,
})

const SubmitButton = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})({
  margin: 8,
})

const FormBody = () => {
  const { myInfo } = useModel(userModel, ['myInfo'])

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
        snackbar.success('修改成功')
        userModel.FRESH_INFO()
      })
    )
  }

  const handleAvatarSubmit = (AvatarSrc: string) => {
    modifyMyAvatar(AvatarSrc).then(res =>
      res.fail().succeed(_ => {
        snackbar.success('修改成功')
        userModel.FRESH_INFO()
      })
    )
  }
  if (myInfo) {
    return (
      <>
        <EditAvatar info={myInfo} handleAvatarSubmit={handleAvatarSubmit} />
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
          <FormItem
            label="邮箱"
            value={info.emailAddress}
            onChange={handleChange('emailAddress')}
          />
          <FormItem
            label="签名档"
            value={info.signatureCode}
            onChange={handleChange('signatureCode')}
          />

          <SubmitButton onClick={handleSubmit}>提交修改</SubmitButton>
        </FormWrapper>
      </>
    )
  }

  return null
}

export default () => (
  <>
    <FormHeader />
    <FormBody />
  </>
)
