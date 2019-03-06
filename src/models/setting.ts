import { Model } from '@/hooks/useModel'

import { getLocalStorage, setLocalStorage } from '@/utils/storage'

interface State {
  /**
   * 主题
   */
  theme: 'light' | 'dark'
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
      theme: 'light',
      useSignalr: false,
      cacheSize: 3,
      customHome: 1,
    }

    const setting = getLocalStorage('setting') as State | null
    this.setState(setting)
  }

  SYNC_SETTING = () => {
    setLocalStorage('setting', this.state)
  }

  TOGGLE_THEME = () => {
    this.setState(state => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    }))
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
