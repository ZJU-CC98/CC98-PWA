import React from 'react'

import { MenuList, MenuItem, Typography, ListItemIcon } from '@material-ui/core'
import SubjectIcon from '@material-ui/icons/Subject'
import SendIcon from '@material-ui/icons/VpnKey'
import MobileIcon from '@material-ui/icons/MobileFriendly'

import { navigate } from '@/utils/history'

export default () => (
  <MenuList>
    <MenuItem onClick={() => navigate('/help/vpn')}>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <Typography variant="inherit">如何在手机使用RVPN连接内网</Typography>
    </MenuItem>
    <MenuItem onClick={() => navigate('/help/pwa')}>
      <ListItemIcon>
        <MobileIcon />
      </ListItemIcon>
      <Typography variant="inherit">如何将CC98PWA安装到桌面</Typography>
    </MenuItem>
    <MenuItem onClick={() => navigate('/help/about')}>
      <ListItemIcon>
        <SubjectIcon />
      </ListItemIcon>
      <Typography variant="inherit">论坛统计</Typography>
    </MenuItem>
  </MenuList>
)
