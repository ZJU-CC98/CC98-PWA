import { GET, PUT } from '@/utils/fetch'
import { IPost, ILike } from '@cc98/api'

/**
 * 获取单个帖子的编辑信息权限
 */
export function getSinglePostById(id: number) {
  return GET<IPost>(`post/${id}/original`)
}
/**
 * 获取一个帖子的10层楼
 */
export function getPost(id: number, from: number) {
  return GET<IPost[]>(`topic/${id}/post`, {
    params: {
      from,
      size: 10,
    },
  })
}

/**
 * 获取一个帖子的单独一层
 */
export function getSinglePost(id: number, from: number) {
  return GET<IPost[]>(`topic/${id}/post`, {
    params: {
      from,
      size: 1,
    },
  })
}

/**
 * 追踪非匿名板块的用户
 */
export function getTracePost(topicId: number, userId: number, from: number) {
  return GET<IPost[]>('post/topic/user', {
    params: {
      topicId,
      userId,
      from,
      size: 10,
    },
  })
}

/**
 * 追踪匿名板块用户
 */
export function getAnonymousTracePost(topicId: number, postId: number, from: number) {
  return GET<IPost[]>('post/topic/anonymous/user', {
    params: {
      topicId,
      postId,
      from,
      size: 10,
    },
  })
}

/**
 * 获取热评
 */
export function getHotPost(topicId: number) {
  return GET<IPost[]>(`topic/${topicId}/hot-post`)
}

/**
 * 获取赞/踩状态
 */
export function getLikeState(topicId: number) {
  return GET<ILike>(`post/${topicId}/like`)
}

/**
 * 赞
 */
export function putLike(topicId: number) {
  return PUT(`post/${topicId}/like`, {
    params: 1,
  })
}

/**
 * 踩
 */
export function putDislike(topicId: number) {
  return PUT(`post/${topicId}/like`, {
    params: 2,
  })
}

/**
 * 用户评分 +1或-1
 */
export function rate(id: number, value: 1 | -1, reason: string) {
  return PUT(`post/${id}/rating`, {
    params: {
      value,
      reason,
    },
  })
}
