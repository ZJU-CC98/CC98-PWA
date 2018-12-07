import { Container } from '@/hooks/useContainer'

interface State {
  /**
   * 主文本区
   */
  mainContent: string
  /**
   * 追加区
   */
  attachments: string[]
}

/**
 * 编辑器句柄
 */
export class EditorContainer extends Container<State> {
  state: State = {
    /**
     * 主文本区
     */
    mainContent: '',
    /**
     * 追加区
     */
    attachments: [],
  }

  /**
   * 初始化
   */
  init(mainContent: string, attachments: string[] = []) {
    this.setState({
      mainContent,
      attachments,
    })
  }

  /**
   * 追加主文本内容
   */
  append(str: string) {
    this.setState(prev => ({
      mainContent: prev.mainContent + str,
    }))
  }

  /**
   * 覆盖主文本内容
   */
  replace(str: string) {
    this.setState({
      mainContent: str,
    })
  }

  /**
   * 清空主文本内容
   */
  clear() {
    this.setState({
      mainContent: '',
    })
  }

  /**
   * 追加内容到追加区
   */
  attach(content: string) {
    this.setState(prev => ({
      attachments: prev.attachments.concat(content),
    }))
  }

  /**
   * 删除追加区内容
   */
  detach(index: number) {
    this.setState(prev => {
      prev.attachments.splice(index, 1)

      return { attachments: prev.attachments }
    })
  }

  /**
   * 清空追加区内容
   */
  detachAll() {
    this.setState({
      attachments: [],
    })
  }

  /**
   * 重置为初始状态
   */
  reset() {
    this.setState({
      mainContent: '',
      attachments: [],
    })
  }
}

export default new EditorContainer()
