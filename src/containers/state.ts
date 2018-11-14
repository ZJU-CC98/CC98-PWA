import { Container } from '@/hooks/useContainer'

interface State {
  /**
   * 侧边栏是否展开
   */
  isDrawerOpen: boolean
}

class StateContainer extends Container<State> {
  state: State = {
    isDrawerOpen: false,
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

export default new StateContainer()
