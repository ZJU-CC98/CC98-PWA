import { Container } from '@cc98/state'

import { GET, logIn } from '@/utils/fetch'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/storage'
import { IUser } from '@cc98/api'

import user from './user'

interface State {
  /**
   * 侧边栏是否展开
   */
  isDrawerOpen: boolean
  /**
   * 是否登录
   */
  isLogIn: boolean
  /**
   * 个人账户信息
   */
  myInfo: IUser | null
  /**
   * 主题
   */
  theme: 'light' | 'dark'
}

class GlobalContainer extends Container<State> {
  state: State = {
    isDrawerOpen: false,
    isLogIn: !!getLocalStorage('refresh_token'),
    myInfo: null,
    theme: 'light',
  }

  constructor() {
    super()
    this.FRESH_INFO()
  }

  FRESH_INFO = async () => {
    if (!this.state.isLogIn) return

    const myInfo = await GET<IUser>('me')
    myInfo.fail().succeed(info => {
      this.put(state => {
        state.myInfo = info
      })

      user.setInfo(info)
    })
  }

  LOG_IN = async (username: string, password: string) => {
    const token = await logIn(username, password)

    token.fail().succeed(newToken => {
      const access_token = `${newToken.token_type} ${newToken.access_token}`
      setLocalStorage('access_token', access_token, newToken.expires_in)
      // refresh_token 有效期一个月
      setLocalStorage('refresh_token', newToken.refresh_token, 2592000)

      this.put(state => {
        state.isLogIn = true
      })
    })

    this.FRESH_INFO()

    return token
  }

  LOG_OUT = () => {
    removeLocalStorage('access_token')
    removeLocalStorage('refresh_token')

    this.put(state => {
      state.isLogIn = false
    })
  }

  OPEN_DRAWER = () => {
    this.put(state => {
      state.isDrawerOpen = true
    })
  }

  CLOSE_DRAWER = () => {
    this.put(state => {
      state.isDrawerOpen = false
    })
  }

  CHANGE_THEME = () => {
    switch (this.state.theme) {
      case 'light':
        this.put(state => (state.theme = 'dark'))
        break
      case 'dark':
        this.put(state => (state.theme = 'light'))
        break
    }
  }
}

const global = new GlobalContainer()

export { global as default, GlobalContainer }
