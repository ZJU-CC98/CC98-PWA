import React, { useState, ChangeEvent } from 'react'
import { ListItem, TextField, MenuItem, ListItemText } from '@material-ui/core'
import settingInstance from '@/containers/setting'

const ranges = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
]

export default () => {
  const [val, setVal] = useState(settingInstance.state.cachePages)
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    settingInstance.CHANGE_CACHE(parseInt(event.target.value, 10))
    setVal(parseInt(event.target.value, 10))
  }

  return (
    <ListItem>
      <ListItemText primary="缓存页数" />
      <TextField select variant="outlined" label="页" value={val} onChange={handleChange}>
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </ListItem>
  )
}
