import React from 'react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import SubjectIcon from '@material-ui/icons/Subject'
import SendIcon from '@material-ui/icons/VpnKey'
import MobileIcon from '@material-ui/icons/MobileFriendly'
import { navigate } from '@/utils/history'

export default () => (
  <MenuList>
    <MenuItem>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <Typography variant="inherit" onClick={() => navigate('/help/vpn')}>
        如何在手机使用RVPN连接内网
      </Typography>
    </MenuItem>
    <MenuItem>
      <ListItemIcon>
        <MobileIcon />
      </ListItemIcon>
      <Typography variant="inherit" onClick={() => navigate('/help/pwa')}>
        如何将CC98PWA安装到桌面
      </Typography>
    </MenuItem>
    <MenuItem>
      <ListItemIcon>
        <SubjectIcon />
      </ListItemIcon>
      <Typography variant="inherit" onClick={() => navigate('/help/about')}>
        论坛统计
      </Typography>
    </MenuItem>
  </MenuList>
)
