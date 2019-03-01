import React from 'react'
import { ListItem, TextField, MenuItem, ListItemText, InputAdornment } from '@material-ui/core'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

const ranges = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
]

const Cache = () => {
  const { cacheSize } = useModel(settingModel, ['cacheSize'])
  const { CHANGE_CACHE } = settingModel

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
        value={cacheSize}
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

export default React.memo(Cache)
