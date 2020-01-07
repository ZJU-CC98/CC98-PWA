import { Model } from '@/hooks/useModel'

import { getLocalStorage, setLocalStorage } from '@/utils/storage'

import { ModeEnum, ThemeEnum } from '@/theme'
import { STORAGE_KEY } from '@/config/storage'

interface State {
  /**
   * 主题
   */
  theme: ThemeEnum
  /**
   * 模式
   */
  mode: ModeEnum
  /**
   * 是否开启实时通知
   */
  useSignalr: boolean
  /**
   * 缓存页数
   */
  cacheSize: number
  /**
   * 自定义主页
   */
  customHome: number
}

class SettingModel extends Model<State> {
  constructor() {
    super()

    this.state = {
      theme: ThemeEnum.DEFAULT,
      mode: ModeEnum.LIGHT,
      useSignalr: false,
      cacheSize: 3,
      customHome: 1,
    }

    const setting = getLocalStorage('setting') as State | null
    this.setState(setting)
    this.SYNC_MODE_FROM_SYSTEM()
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.SYNC_MODE_FROM_SYSTEM)
  }

  SYNC_MODE_FROM_SYSTEM = () => {
    if (!getLocalStorage(STORAGE_KEY.DISABLE_FOLLOW_SYSTEM_THEME_MODE)) {
      this.setState(state => ({
        mode: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? ModeEnum.DARK
          : ModeEnum.LIGHT,
      }))
    }
  }

  SYNC_SETTING = () => {
    setLocalStorage('setting', this.state)
  }

  TOGGLE_MODE = () => {
    this.setState(state => ({
      mode: state.mode === ModeEnum.LIGHT ? ModeEnum.DARK : ModeEnum.LIGHT,
    }))
    this.SYNC_SETTING()
  }

  CHANGE_THEME = (theme: ThemeEnum) => {
    this.setState({ theme })
    this.SYNC_SETTING()
  }

  TOGGLE_SIGNALR = () => {
    this.setState(state => ({
      useSignalr: !state.useSignalr,
    }))
    this.SYNC_SETTING()
  }

  CHANGE_CACHE = (size: number) => {
    this.setState({
      cacheSize: size,
    })
    this.SYNC_SETTING()
  }

  CHANGE_CUSTOMHOME = (value: number) => {
    this.setState({
      customHome: value,
    })
    this.SYNC_SETTING()
  }
}

export default new SettingModel()
