import { Model } from '@/hooks/useModel'

interface State {
  /**
   * 侧边栏是否展开
   */
  isDrawerOpen: boolean
}

class StateModel extends Model<State> {
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

export default new StateModel()
