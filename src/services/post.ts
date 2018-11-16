import { PUT, GET } from '@/utils/fetch'
import { IPost } from '@cc98/api'

/**
 * 获取一个帖子的10层楼
 */
export function getPost(id: number, from: number) {
  return GET<IPost[]>(`topic/${id}/post`, {
    params: {
      from: `${from}`,
      size: '10',
    },
  })
}

/**
 * 用户评分 +1或-1
 */
export function rate(id: number, value: number, reason: string) {
  const url = `/post/${id}/rating`

  return PUT(url, {
    params: {
      value,
      reason,
    },
  })
}

/**
 * 追踪非匿名板块的用户
 */
export function getTracePost(topicId: number, userId: number, from: number) {
  return GET<IPost[]>('post/topic/user', {
    params: {
      topicId: `${topicId}`,
      userId: `${userId}`,
      from: `${from}`,
      size: '10',
    },
  })
}

/**
 * 追踪匿名板块用户
 */
export function getAnonymousTracePost(topicId: number, postId: number, from: number) {
  return GET<IPost[]>('post/topic/anonymous/user', {
    params: {
      topicId: `${topicId}`,
      postId: `${postId}`,
      from: `${from}`,
      size: '10',
    },
  })
}

/**
 * 获取热评
 */
export function getHotPost(id: number) {
  return GET<IPost[]>(`topic/${id}/hot-post`)
}
