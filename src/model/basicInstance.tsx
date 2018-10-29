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
}

class BasicContainer extends Container<State> {
  state: State = {
    isDrawerOpen: false,
    isLogIn: !!getLocalStorage('refresh_token'),
    myInfo: null,
  }

  constructor() {
    super()
    this.freshInfo()
  }

  async freshInfo() {
    if (!this.state.isLogIn) return

    const myInfo = await GET<IUser>('me')
    myInfo.fail().succeed(info => {
      this.put(state => {
        state.myInfo = info
      })

      user.setInfo(info)
    })
  }

  async logIn(username: string, password: string) {
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

    this.freshInfo()

    return token
  }

  logOut() {
    removeLocalStorage('access_token')
    removeLocalStorage('refresh_token')

    this.put(state => {
      state.isLogIn = false
    })
  }

  openDrawer() {
    this.put(state => {
      state.isDrawerOpen = true
    })
  }

  closeDrawer() {
    this.put(state => {
      state.isDrawerOpen = false
    })
  }
}

const basicInstance = new BasicContainer()

export { basicInstance as default, BasicContainer }
