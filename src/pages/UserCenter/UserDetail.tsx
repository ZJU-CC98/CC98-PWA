import React from 'react'
import styled, { css } from 'react-emotion'

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { IUser } from '@cc98/api'

import dayjs from 'dayjs'

const wrapper = css`
  width: 100%;
`

const detail = css`
  && {
    padding: 0 8px 24px 8px;
  }
`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface ItemProps {
  name: string
  value: string | number
}

const item = css`
  padding: 10px 20px;
  width: 50%;
`

const ListItem: React.FunctionComponent<ItemProps> = ({ name, value }) => (
  <div className={item}>
    <Typography color="textSecondary">{name}</Typography>
    <Typography>{value}</Typography>
  </div>
)

interface Props {
  info: IUser
}

const RecentTopics: React.FunctionComponent<Props> = ({ info }) => (
  <ExpansionPanel className={wrapper} defaultExpanded={true}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="subtitle1">用户资料</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className={detail}>
      <List>
        <ListItem name="性别" value={info.gender === 0 ? '男' : '女'} />
        <ListItem name="发帖" value={info.postCount} />
        <ListItem name="财富值" value={info.wealth} />
        <ListItem name="被删贴数" value={info.deleteCount} />
        <ListItem name="威望" value={info.prestige} />
        <ListItem name="风评" value={info.popularity} />
        <ListItem name="生日" value={dayjs(info.birthday).format('YYYY/MM/DD')} />
        <ListItem name="QQ" value={info.qq} />
        <ListItem name="注册时间" value={dayjs(info.registerTime).format('YYYY MM-DD HH:mm')} />
        <ListItem name="最后登录" value={dayjs(info.lastLogOnTime).format('YYYY MM-DD HH:mm')} />
        <ListItem name="邮箱" value={info.emailAddress} />
      </List>
    </ExpansionPanelDetails>
  </ExpansionPanel>
)

export default RecentTopics
