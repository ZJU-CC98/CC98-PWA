import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import { ListItem, Switch } from '@material-ui/core'
import ListItemText from '@/hotfix/ListItemText'

import { ModeEnum } from '@/theme'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/storage'
import { STORAGE_KEY } from '@/config/storage'

const Theme = () => {
  const { mode } = useModel(settingModel, ['mode'])
  const { TOGGLE_MODE, SYNC_MODE_FROM_SYSTEM } = settingModel

  const [auto, setAuto] = React.useState(
    !getLocalStorage(STORAGE_KEY.DISABLE_FOLLOW_SYSTEM_THEME_MODE)
  )

  const handleAutoChange = (_: any, checked: boolean) => {
    setAuto(checked)

    if (checked) {
      removeLocalStorage(STORAGE_KEY.DISABLE_FOLLOW_SYSTEM_THEME_MODE)
      SYNC_MODE_FROM_SYSTEM()
    } else {
      setLocalStorage(STORAGE_KEY.DISABLE_FOLLOW_SYSTEM_THEME_MODE, 'disable')
    }
  }

  return (
    <>
      <ListItem button>
        <ListItemText primary="夜间模式" secondary="使用暗色主题" />
        <Switch checked={mode === ModeEnum.DARK} onChange={TOGGLE_MODE} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="跟随系统设置" secondary="检测到夜间模式自动切换至暗色主题" />
        <Switch checked={auto} onChange={handleAutoChange} />
      </ListItem>
    </>
  )
}

export default React.memo(Theme)
