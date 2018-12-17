import { Container } from '@/hooks/useContainer'
import { GET } from '@/utils/fetch'
import { ITagGroup } from '@cc98/api'
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
   * 该版面的tags
   */
  tags?: ITagGroup
  /**
   * tag 1
   */
  tag1?: number
  /**
   * tag 2
   */
  tag2?: number
}

interface Props {
  /**
   * 版面 ID
   */
  boardId?: string
  /**
   * 帖子 ID
   */
  topicId?: string
  /**
   * 楼层 ID
   */
  postId?: string
}
/**
 * 帖子元信息 (title + type + tags)
 */
export class MetaInfoContainer extends Container<State> {
  constructor(props: Props) {
    super()
    const topicId = props.topicId
    const boardId = props.boardId
    const postId = props.postId
    this.state = {
      title: '',
      type: 0,
    }
    // 编辑post
    if (postId && !topicId && !boardId) {
      // TODO:
    }
    // 回帖
    if (topicId) {
      return
    }
  }
  _initMetainfoByboard = async (boardId: number) => {
    const k = await GET<ITagGroup>(`board/${boardId}/tag`)
    k.fail().succeed(data => {
      this.setState({
        title: '',
        type: 0,
        tag1: 0,
        tag2: 0,
      })
    })
  }

  /**
   * 设置标题
   */
  setTitle(str: string) {
    this.setState({
      title: str,
    })
  }

  setType(nextType: number) {
    this.setState({
      type: nextType,
    })
  }

  setTag1(id: number) {
    this.setState({ tag1: id })
  }

  setTag2(id: number) {
    this.setState({ tag2: id })
  }
}
