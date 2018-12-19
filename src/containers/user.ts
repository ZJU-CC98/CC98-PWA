import { Container } from '@/hooks/useContainer'

import { GET } from '@/utils/fetch'
import { logIn, logOut, isLogIn } from '@/utils/logIn'
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
}

class UserContainer extends Container<State> {
  constructor() {
    super()

    this.state = {
      isLogIn: isLogIn(),
      myInfo: null,
    }

    this.FRESH_INFO()
  }

  LOG_IN = async (username: string, password: string) => {
    const token = await logIn(username, password)

    token.fail().succeed(_ => {
      this.setState(
        {
          isLogIn: true,
        },
        this.FRESH_INFO
      )
    })

    return token
  }

  LOG_OUT = () => {
    logOut()

    this.setState({
      isLogIn: false,
      myInfo: null,
    })
  }

  FRESH_INFO = async () => {
    if (!this.state.isLogIn) {
      return
    }

    const myInfo = await GET<IUser>('me')
    myInfo.fail().succeed(myInfo => {
      this.setState({
        myInfo,
      })
    })
  }
}

export default new UserContainer()
