import React from 'react'
import { ListItem, TextField, MenuItem, ListItemText } from '@material-ui/core'

import useContainer from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'

const ranges = [
  { label: '推荐阅读', value: 1 },
  { label: '热门话题', value: 2 },
  { label: '新帖', value: 3 },
  { label: '关注列表', value: 4 },
]

export default () => {
  const {
    state: { customHome },
    CHANGE_CUSTOMHOME,
  } = useContainer(settingInstance)

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
