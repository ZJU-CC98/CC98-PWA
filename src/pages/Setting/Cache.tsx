import React from 'react'
import { ListItem, TextField, MenuItem, ListItemText, InputAdornment } from '@material-ui/core'

import useContainer from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'

const ranges = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
]

export default () => {
  const {
    state: { routerCacheSize },
    CHANGE_CACHE,
  } = useContainer(settingInstance)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    CHANGE_CACHE(parseInt(event.target.value, 10))
  }

  return (
    <ListItem>
      <ListItemText primary="缓存页数" secondary="此项十分影响性能（重启生效）" />
      <TextField
        select
        InputProps={{
          endAdornment: <InputAdornment position="end">页</InputAdornment>,
        }}
        value={routerCacheSize}
        onChange={handleChange}
      >
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </ListItem>
  )
}
