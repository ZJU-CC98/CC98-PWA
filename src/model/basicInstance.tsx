import { Container } from '@cc98/state'

import { GET } from '@/utils/fetch'
import { getLocalStorage } from '@/utils/storage'
import { IMyInfo } from '@cc98/api'

interface State {
  /**
   * 是否登录
   */
  isLogIn: boolean
  /**
   * 个人账户信息
   */
  myInfo: IMyInfo | null
}

class BasicContainer extends Container<State> {
  state: State = {
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

    const myInfo = await GET<IMyInfo>('me')
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
}

const basicInstance = new BasicContainer()

export default basicInstance
