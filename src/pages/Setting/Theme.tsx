import React from 'react'
import { ListItem, TextField, MenuItem } from '@material-ui/core'
import ListItemText from '@/hotfix/ListItemText'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import { ThemeEnum } from '@/theme'

const ranges = [
  { label: '默认', value: ThemeEnum.DEFAULT },
  { label: '春', value: ThemeEnum.SPRING },
  // { label: '夏', value: ThemeEnum.SUMMER },
  // { label: '秋', value: ThemeEnum.FALL },
  // { label: '冬', value: ThemeEnum.WINTER },
]

const Theme = () => {
  const { theme } = useModel(settingModel, ['theme'])
  const { CHANGE_THEME } = settingModel

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    CHANGE_THEME(parseInt(event.target.value, 10))
  }

  return (
    <ListItem>
      <ListItemText primary="主题" secondary="主题风格" />
      <TextField select value={theme} onChange={handleChange}>
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </ListItem>
  )
}

export default React.memo(Theme)
