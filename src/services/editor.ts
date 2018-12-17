import { Try, Success } from '@/utils/fp/Try'
import { FetchError } from '@/utils/fetch'
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
export async function uploadPicture() {
  // TODO: remove mock
  const mockURLs = [
    'https://www.cc98.org/static/images/ms/ms19.png',
    'https://www.cc98.org/static/images/ac/08.png',
  ]

  const url = mockURLs[Math.random() < 0.5 ? 0 : 1]

  return Promise.resolve(Try.of<string, FetchError>(Success.of(url)))
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
