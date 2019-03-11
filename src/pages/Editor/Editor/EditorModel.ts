import { Model } from '@/hooks/useModel'

interface State {
  /**
   * 主文本区
   */
  mainContent: string
  /**
   * 追加区
   */
  attachments: string[]
  /**
   * 正在发布
   */
  isSending: boolean
}

/**
 * 编辑器句柄
 */
export class EditorModel extends Model<State> {
  constructor(initContent?: string) {
    super()

    this.state = {
      mainContent: initContent || '',
      attachments: [],
      isSending: false,
    }
  }

  /**
   * 获取完整内容（包括 mainContent & attachments）
   */
  get fullContent() {
    let attachments = this.state.attachments.join('')
    if (attachments) {
      attachments = `\n${attachments}`
    }

    return this.state.mainContent + attachments
  }

  /**
   * 替换主文本内容
   */
  replaceMainContent(str: string) {
    this.setState({
      mainContent: str,
    })
  }

  /**
   * 追加主文本内容
   */
  appendMainContent(str: string) {
    this.setState(prev => ({
      mainContent: prev.mainContent + str,
    }))
  }

  /**
   * 追加内容到追加区
   */
  attachAttachment(content: string) {
    this.setState(prev => ({
      attachments: prev.attachments.concat(content),
    }))
  }

  /**
   * 删除追加区内容
   */
  detachAttachment(index: number) {
    this.setState(prev => {
      prev.attachments.splice(index, 1)

      return { attachments: prev.attachments }
    })
  }

  /**
   * 清空输入
   */
  clearAll() {
    this.setState({
      mainContent: '',
      attachments: [],
    })
  }
}
