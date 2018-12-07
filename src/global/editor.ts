import editorInstance from '@/containers/editor'

// EditorUtils
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

export interface IEditorGlobal {
  state: EditorState

  /**
   * 发布操作的回调
   */
  onSendCallBack: (content: string) => void

  /**
   * 编辑器主文本区初始化值
   */
  initMainContent: ''
  /**
   * 编辑器追加区初始化值
   */
  initAttachments: string[]
}

export const EditorGlobal: IEditorGlobal = {
  state: EditorState.DISABLE,

  onSendCallBack: _ => undefined,
  initMainContent: '',
  initAttachments: [],
}

export const EditorUtils = {
  /**
   * 发布新帖
   */
  postTpoic() {
    EditorGlobal.state = EditorState.POST_TOPIC
    // EditorGlobal.boardId =

    editorInstance.reset()
    // navigate('/editor')
  },

  /**
   * 回复帖子
   */
  replyTopic(topicId: number) {
    EditorGlobal.state = EditorState.REPLY_TOPIC

    EditorGlobal.onSendCallBack = (content: string) => {
      replyTopicService(topicId, content).then(res =>
        res.fail().succeed(() => {
          goback()
        })
      )
    }

    editorInstance.reset()
    navigate('/editor')
  },

  /**
   * 引用帖子
   */
  quotePost(topicId: number, quoteContent: string) {
    EditorGlobal.state = EditorState.REPLY_TOPIC

    EditorGlobal.onSendCallBack = (content: string) => {
      replyTopicService(topicId, content).then(res =>
        res.fail().succeed(() => {
          goback()
        })
      )
    }

    editorInstance.init(quoteContent)
    navigate('/editor')
  },

  /**
   * 编辑帖子
   * TODO: 支持编辑标题
   */
  editorPost(postId: number, originContent: string) {
    EditorGlobal.state = EditorState.EDITOR_TOPIC

    EditorGlobal.onSendCallBack = (content: string) => {
      editorPostService(postId, content).then(res =>
        res.fail().succeed(() => {
          goback()
        })
      )
    }

    editorInstance.init(originContent)
    navigate('/editor')
  },
}
