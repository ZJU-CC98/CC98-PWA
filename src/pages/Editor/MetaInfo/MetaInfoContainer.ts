import { Container } from '@/hooks/useContainer'

interface State {
  /**
   * 标题
   */
  title: string
  /**
   * 帖子类型
   */
  type: number
  /**
   * tag 1
   */
  tag1?: number
  /**
   * tag 2
   */
  tag2?: number
}

/**
 * 帖子元信息 (title + type + tags)
 */
export class MetaInfoContainer extends Container<State> {
  constructor() {
    super()

    this.state = {
      title: '',
      type: 0,
    }
  }

  /**
   * 设置标题
   */
  setTitle(str: string) {
    this.setState({
      title: str,
    })
  }
}
