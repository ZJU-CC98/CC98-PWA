import { Model } from '@/hooks/useModel'

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
export class MetaInfoModel extends Model<State> {
  constructor(init: State) {
    super()

    this.state = init
  }

  /**
   * 设置标题
   */
  setTitle(title: string) {
    this.setState({ title })
  }

  setType(type: number) {
    this.setState({ type })
  }

  setTag1(tag: number) {
    this.setState({ tag1: tag })
  }

  setTag2(tag: number) {
    this.setState({ tag2: tag })
  }
}
