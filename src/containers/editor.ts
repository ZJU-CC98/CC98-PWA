import { Container } from '@/hooks/useContainer'

import { navigate, goback } from '@/utils/history'
import { replyTopic as replyTopicService, editorPost as editorPostService } from '@/services/editor'

/**
 * 编辑器状态
 */
export enum EditorState {
  /**
   * 禁用，初始状态
   */
  DISABLE,
  POST_TOPIC,
  REPLY_TOPIC,
  EDITOR_TOPIC,
}

interface State {
  /**
   * 编辑器状态
   */
  state: EditorState
  /**
   * 发布操作的回调
   */
  onSendCallBack: (content: string) => void

  /**
   * 标题
   */
  title: string
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
    state: EditorState.DISABLE,
    onSendCallBack: _ => undefined,

    title: '',
    mainContent: '',
    attachments: [],
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
   * 覆盖主文本内容
   */
  replaceMainContent(str: string) {
    this.setState({
      mainContent: str,
    })
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
   * 重置所有输入
   */
  resetAllInput() {
    this.setState({
      title: '',
      mainContent: '',
      attachments: [],
    })
  }

  // 设置 Editor 状态

  /**
   * 发布新帖
   */
  toPostTpoic(boardId: number) {
    this.setState({
      state: EditorState.POST_TOPIC,
    })

    this.resetAllInput()
    // navigate('/editor')
  }

  /**
   * 回复帖子
   */
  toReplyTopic(topicId: number) {
    const onSendCallBack = (content: string) => {
      replyTopicService(topicId, content).then(res =>
        res.fail().succeed(() => {
          goback()
        })
      )
    }
    this.resetAllInput()

    this.setState({
      state: EditorState.REPLY_TOPIC,
      onSendCallBack,
    })

    navigate('/editor')
  }

  /**
   * 引用帖子
   */
  toQuotePost(topicId: number, quoteContent: string) {
    const onSendCallBack = (content: string) => {
      replyTopicService(topicId, content).then(res =>
        res.fail().succeed(() => {
          goback()
        })
      )
    }

    this.resetAllInput()

    this.setState({
      state: EditorState.REPLY_TOPIC,
      onSendCallBack,
      mainContent: quoteContent,
    })

    navigate('/editor')
  }

  /**
   * 编辑帖子
   * TODO: 支持编辑标题
   */
  toEditorPost(postId: number, originContent: string) {
    const onSendCallBack = (content: string) => {
      editorPostService(postId, content).then(res =>
        res.fail().succeed(() => {
          goback()
        })
      )
    }

    this.resetAllInput()

    this.setState({
      state: EditorState.EDITOR_TOPIC,
      onSendCallBack,
      mainContent: originContent,
    })

    navigate('/editor')
  }
}

export default new EditorContainer()
