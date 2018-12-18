import { Container } from '@/hooks/useContainer'

import { HostType, changeHost } from '@/config/host'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'

interface State {
  /**
   * 主题
   */
  theme: 'light' | 'dark'
  /**
   * 是否使用代理
   */
  useProxy: boolean
  /**
   * 是否开启实时通知
   */
  useSignalr: boolean
  /**
   * 缓存页数
   */
  routerCacheSize: number
}

class SettingContainer extends Container<State> {
  constructor() {
    super()

    this.state = {
      theme: 'light',
      useProxy: false,
      useSignalr: false,
      routerCacheSize: 3,
    }

    const setting = getLocalStorage('setting') as State | null

    if (setting && setting.useProxy) {
      changeHost(HostType.Proxy)
    }

    this.setState(setting)
  }

  SYNC_SETTING = () => {
    setLocalStorage('setting', this.state)
  }

  TOGGLE_THEME = () => {
    this.setState(
      state => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
      }),
      this.SYNC_SETTING
    )
  }

  TOGGLE_PROXY = () => {
    this.setState(state => {
      changeHost(state.useProxy ? HostType.Default : HostType.Proxy)

      return {
        useProxy: !state.useProxy,
      }
    }, this.SYNC_SETTING)
  }

  TOGGLE_SIGNALR = () => {
    this.setState(
      state => ({
        useSignalr: !state.useSignalr,
      }),
      this.SYNC_SETTING
    )
  }

  CHANGE_CACHE = (size: number) => {
    this.setState({
      routerCacheSize: size,
    })
  }
}

export default new SettingContainer()
