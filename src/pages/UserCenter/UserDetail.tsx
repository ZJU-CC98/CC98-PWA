import React from 'react'
import styled from 'styled-components'

import { Typography } from '@material-ui/core'
import ExpandPanel from './ExpandPanel'

import { IUser } from '@cc98/api'

import dayjs from 'dayjs'

interface ListItemProps {
  name: string
  value: string | number
}

const ItemDiv = styled.div`
  padding: 10px 20px;
  width: 50%;
`

const ListItem: React.FunctionComponent<ListItemProps> = ({ name, value }) => (
  <ItemDiv>
    <Typography color="textSecondary">{name}</Typography>
    <Typography>{value}</Typography>
  </ItemDiv>
)

const ListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface Props {
  info: IUser
}

const RecentTopics: React.FunctionComponent<Props> = ({ info }) => (
  <ExpandPanel defaultExpanded title="用户资料">
    <ListDiv>
      <ListItem name="性别" value={info.gender === 1 ? '男' : '女'} />
      <ListItem name="发帖" value={info.postCount} />
      <ListItem name="财富值" value={info.wealth} />
      <ListItem name="被删贴数" value={info.deleteCount} />
      <ListItem name="威望" value={info.prestige} />
      <ListItem name="风评" value={info.popularity} />
      <ListItem name="生日" value={dayjs(info.birthday).format('YYYY/MM/DD')} />
      <ListItem name="QQ" value={info.qq} />
      <ListItem name="注册时间" value={dayjs(info.registerTime).format('YYYY-MM-DD HH:mm')} />
      <ListItem name="最后登录" value={dayjs(info.lastLogOnTime).format('YYYY-MM-DD HH:mm')} />
      <ListItem name="邮箱" value={info.emailAddress} />
    </ListDiv>
  </ExpandPanel>
)

export default RecentTopics
