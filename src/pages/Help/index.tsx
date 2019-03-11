import React from 'react'
import { Router } from '@reach/router'
import { Route } from '@/router/Router'

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import NetworkCellIcon from '@material-ui/icons/NetworkCell'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import BarChartIcon from '@material-ui/icons/BarChart'
import CopyrightIcon from '@material-ui/icons/Copyright'

import { navigate } from '@/utils/history'

import HowVPN from './HowVPN'
import HowPWA from './HowPWA'
import SiteInfo from './SiteInfo'
import DevTeam from './DevTeam'

interface ItemProps {
  icon: React.ReactElement<any>
  text: string
  url: string
}

const Item: React.FC<ItemProps> = ({ icon, text, url }) => (
  <ListItem button onClick={() => navigate(url)}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

const Index = () => (
  <List>
    <Item icon={<NetworkCellIcon />} text="如何使用 RVPN 连接内网" url="/help/VPN" />
    <Item icon={<ArrowDownwardIcon />} text="如何将 PWA 安装到桌面" url="/help/PWA" />
    <Item icon={<BarChartIcon />} text="论坛统计" url="/help/siteInfo" />
    <Item icon={<CopyrightIcon />} text="CC98 PWA 开发组" url="/help/devTeam" />
  </List>
)

export default () => (
  <Router>
    <Route path="/" component={Index} />
    <Route path="VPN" component={HowVPN} />
    <Route path="PWA" component={HowPWA} />
    <Route path="siteInfo" component={SiteInfo} />
    <Route path="devTeam" component={DevTeam} />
  </Router>
)
