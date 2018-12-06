import { useState } from 'react'

/**
 * 编辑器句柄
 */
export interface IEditorHandler {
  /**
   * 主文本区
   */
  readonly mainContent: string
  /**
   * 追加区
   */
  readonly attachments: string[]

  /**
   * 追加主文本内容
   */
  append(str: string): void

  /**
   * 覆盖主文本内容
   */
  replace(str: string): void

  /**
   * 清空主文本内容
   */
  clear(): void

  /**
   * 追加内容到追加区
   */
  attach(content: string): void

  /**
   * 删除追加区内容
   */
  detach(index: number): void

  /**
   * 删除所有追加区内容
   */
  detachAll(): void
}

/**
 * hooks for EditorHandler
 *
 * @param initMainContent
 * @param initAttachments
 */
export default function useEditorHandler(
  initMainContent: string = '',
  initAttachments: string[] = []
) {
  const [mainContent, setMainContent] = useState(initMainContent)
  const [attachments, setAttachments] = useState(initAttachments)

  const handler: IEditorHandler = {
    mainContent,
    attachments,

    append(str: string) {
      setMainContent(mainContent + str)
    },

    replace(str: string) {
      setMainContent(str)
    },

    clear() {
      setMainContent('')
    },

    attach(content: string) {
      attachments.push(content)
      setAttachments(attachments)
    },

    detach(index: number) {
      attachments.splice(index, 1)
      setAttachments(attachments)
    },

    detachAll() {
      setAttachments([])
    },
  }

  return handler
}
