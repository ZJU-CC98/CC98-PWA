import React from 'react'
import { ListItem, TextField, MenuItem } from '@material-ui/core'
import ListItemText from '@/hotfix/ListItemText'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

const ranges = [
  { label: '推荐阅读', value: 1 },
  { label: '热门话题', value: 2 },
  { label: '新帖', value: 3 },
  { label: '关注列表', value: 4 },
]

const Home = () => {
  const { customHome } = useModel(settingModel, ['customHome'])
  const { CHANGE_CUSTOMHOME } = settingModel

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    CHANGE_CUSTOMHOME(parseInt(event.target.value, 10))
  }

  return (
    <ListItem>
      <ListItemText primary="主页设置" secondary="自定义主页内容" />
      <TextField select value={customHome} onChange={handleChange}>
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </ListItem>
  )
}

export default React.memo(Home)
