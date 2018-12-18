import { GET, POST, PUT } from '@/utils/fetch'

import { IPost } from '@cc98/api'

/**
 * 获取帖子内容
 */
export async function getOriginalPost(postId: number | string) {
  return GET<IPost>(`post/${postId}/original`)
}

/**
 * 上传图片
 */
export async function uploadPicture(file: File) {
  const formData = new FormData()
  formData.append('files', file, file.name)
  const res = POST<string>('file', {
    headers: {
      // Content-Type 置空
    },
    requestInit: {
      body: formData,
    },
  })

  return res
}

export interface IPostParams {
  /**
   * 标题
   */
  title: string
  /**
   * 回帖内容
   */
  content: string
  /**
   * 回帖格式
   */
  contentType: 0 | 1
}

export interface ITopicParams extends IPostParams {
  /**
   * 帖子类型
   */
  type: number
  /**
   * tags
   */
  tag1?: number
  tag2?: number
}

/**
 * 发帖
 * @param boardId 版面 ID
 */
export async function postTopic(boardId: number | string, topicParams: ITopicParams) {
  return POST(`board/${boardId}/topic`, {
    params: topicParams,
  })
}

/**
 * 回帖
 * @param topicId 帖子 ID
 * @param content 回帖内容
 */
export async function replyTopic(topicId: number | string, postParams: IPostParams) {
  return POST(`topic/${topicId}/post`, {
    params: postParams,
  })
}

/**
 * 编辑帖子
 * @param postId 回复 ID
 * @param content 回帖内容
 */
export async function editorPost(topicId: number | string, postParams: IPostParams) {
  return PUT(`post/${topicId}`, {
    params: postParams,
  })
}
