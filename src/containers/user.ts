import { Container } from '@/hooks/useContainer'

import { logIn } from '@/utils/fetch'
import { getLocalStorage, removeLocalStorage } from '@/utils/storage'
import { IUser } from '@cc98/api'

interface State {
  /**
   * 是否登录
   */
  isLogIn: boolean
  /**
   * 个人账户信息
   */
  myInfo: IUser | null
  /**
   * 侧边栏是否展开
   */
  isDrawerOpen: boolean
}

class LogInContainer extends Container<State> {
  state: State = {
    isLogIn: !!getLocalStorage('refresh_token'),
    myInfo: null,
    isDrawerOpen: false,
  }

  LOG_IN = async (username: string, password: string) => {
    const token = await logIn(username, password)

    token.fail().succeed(_ => {
      this.setState({
        isLogIn: true,
      })
    })

    return token
  }

  LOG_OUT = () => {
    removeLocalStorage('access_token')
    removeLocalStorage('refresh_token')

    this.setState({
      isLogIn: false,
    })
  }

  OPEN_DRAWER = () => {
    this.setState({
      isDrawerOpen: true,
    })
  }

  CLOSE_DRAWER = () => {
    this.setState({
      isDrawerOpen: false,
    })
  }
}

export default new LogInContainer()
