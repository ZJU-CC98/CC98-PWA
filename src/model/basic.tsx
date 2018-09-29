import { Container } from '@cc98/state'

interface State {
  /**
   * 是否登录
   */
  isLogIn: boolean
}

class BasicContainer extends Container<State> {
  state = {
    isLogIn: false,
  }

  LogIn() {
    this.put(state => {
      state.isLogIn = true
    })
  }

  LogOut() {
    this.put(state => {
      state.isLogIn = false
    })
  }
}


export default BasicContainer
