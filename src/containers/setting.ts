import { Container } from '@/hooks/useContainer'

import { HostType, changeHost } from '@/config/host'

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
}

class SettingContainer extends Container<State> {
  state: State = {
    theme: 'light',
    useProxy: false,
    useSignalr: false,
  }

  SYNC_SETTING = () => {
    // TODO:
  }

  TOGGLE_THEME = () => {
    this.setState(state => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    }))
  }

  TOGGLE_PROXY = () => {
    this.setState(state => {
      changeHost(state.useProxy ? HostType.Default : HostType.Proxy)

      return {
        useProxy: !state.useProxy,
      }
    })
  }

  TOGGLE_SIGNALR = () => {
    this.setState(state => ({
      useSignalr: !state.useSignalr,
    }))
  }
}

export default new SettingContainer()
