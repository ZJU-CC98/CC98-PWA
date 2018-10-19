import { Container } from '@cc98/state'

import { GET } from '@/utils/fetch'
import { getLocalStorage } from '@/utils/storage'
import { IUser } from '@cc98/api'

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
    isLogIn: !!getLocalStorage('access_token'),
    myInfo: null
  }

  constructor() {
    super()
    this.FreshInfo()
  }

  async FreshInfo() {
    if (!this.state.isLogIn)
      return

    const myInfo = await GET<IUser>('me')
    myInfo
      .fail()
      .succeed(
        (myInfo) => {
          this.put(state => {
            state.myInfo = myInfo
          })
        }
      )
  }

  LogIn() {
    this.put(state => {
      state.isLogIn = true
    })

    this.FreshInfo()
  }

  LogOut() {
    this.put(state => {
      state.isLogIn = false
    })
  }

  OpenDrawer() {
    this.put(state => {
      state.isDrawerOpen = true
    })
  }

  CloseDrawer() {
    this.put(state => {
      state.isDrawerOpen = false
    })
  }
}

const basicInstance = new BasicContainer()

export {
  basicInstance as default,
  BasicContainer as BasicContainer,
}
