import React from 'react'
import { Router } from '@reach/router'
import { Route } from '@/router/Router'

import { MenuList, MenuItem, ListItemIcon, Typography } from '@material-ui/core'

import NetworkCellIcon from '@material-ui/icons/NetworkCell'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import BarChartIcon from '@material-ui/icons/BarChart'
import CopyrightIcon from '@material-ui/icons/Copyright'

import { navigate } from '@/utils/history'

import VPN from './VPN'
import PWA from './PWA'
import SiteInfo from './SiteInfo'
import DevTeam from './DevTeam'

export default () => (
  <Router>
    <Route path="/" component={Index} />
    <Route path="VPN" component={VPN} />
    <Route path="PWA" component={PWA} />
    <Route path="siteInfo" component={SiteInfo} />
    <Route path="devTeam" component={DevTeam} />
  </Router>
)

const Index = () => (
  <MenuList>
    <MenuItem onClick={() => navigate('/help/VPN')}>
      <ListItemIcon>
        <NetworkCellIcon />
      </ListItemIcon>
      <Typography variant="inherit">如何使用 RVPN 连接内网</Typography>
    </MenuItem>
    <MenuItem onClick={() => navigate('/help/PWA')}>
      <ListItemIcon>
        <ArrowDownwardIcon />
      </ListItemIcon>
      <Typography variant="inherit">如何将 PWA 安装到桌面</Typography>
    </MenuItem>
    <MenuItem onClick={() => navigate('/help/siteInfo')}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Typography variant="inherit">论坛统计</Typography>
    </MenuItem>
    <MenuItem onClick={() => navigate('/help/devTeam')}>
      <ListItemIcon>
        <CopyrightIcon />
      </ListItemIcon>
      <Typography variant="inherit">CC98 PWA 开发组</Typography>
    </MenuItem>
  </MenuList>
)
