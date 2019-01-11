import { PUT, POST, DELETE } from '../utils/fetch'

/**
 * 操作财富值
 * operationType为0奖励，1惩罚
 */
export const operateWealth = (
  postId: number,
  value: number,
  reason: string,
  operationType: number
) =>
  POST(`post/${postId}/operation`, {
    params: {
      reason,
      operationType,
      wealth: value,
    },
  })

/**
 * 操作威望
 * operationType为0奖励，1惩罚
 */
export const operatePrestige = (
  postId: number,
  value: number,
  reason: string,
  operationType: number
) =>
  POST(`post/${postId}/operation`, {
    params: {
      reason,
      operationType,
      prestige: value,
    },
  })

/**
 * 删除回帖
 */
export const deletePost = (postId: number, reason: string) =>
  DELETE(`post/${postId}`, {
    params: {
      reason,
    },
  })

/**
 * TP
 */
export const stopPost = (postId: number, value: number, reason: string) =>
  POST(`post/${postId}/operation`, {
    params: {
      reason,
      stopPostDays: value,
      operationType: 1,
    },
  })

/**
 * 解禁
 */
export const cancelStopPost = (boardId: number, userId: number) =>
  DELETE(`/board/${boardId}/stop-post-user/${userId}`)

/**
 * 删除主题
 */
export const deleteTopic = (topicId: number, reason: string) =>
  DELETE(`topic/${topicId}`, {
    params: {
      reason,
    },
  })

/**
 * 锁定主题
 */
export const lockTopic = (topicId: number, reason: string, value: number) =>
  PUT(`topic/${topicId}/lock`, {
    params: {
      reason,
      value,
    },
  })

/**
 * 解锁
 */
export const unlockTopic = (topicId: number, reason: string) =>
  DELETE(`topic/${topicId}/lock`, {
    params: {
      reason,
    },
  })

/**
 * 禁止热门
 */
export const notHot = (topicId: number, reason: string) =>
  PUT(`topic/${topicId}/not-hot`, {
    params: {
      reason,
    },
  })

/**
 * 允许热门
 */
export const deleteNotHot = (topicId: number, reason: string) =>
  DELETE(`topic/${topicId}/not-hot`, {
    params: {
      reason,
    },
  })

/**
 * 提升主题
 */
export const upTopic = (topicId: number, reason: string) =>
  PUT(`topic/${topicId}/up`, {
    params: {
      reason,
    },
  })

/**
 * 固顶
 */
export const topTopic = (topicId: number, reason: string, duration: number, topState: number) =>
  PUT(`topic/${topicId}/top`, {
    params: {
      reason,
      duration,
      topState,
    },
  })

/**
 * 取消固顶
 */
export const deleteTopTopic = (topicId: number, reason: string) =>
  DELETE(`topic/${topicId}/top`, {
    params: {
      reason,
    },
  })

/**
 * 加精
 */
export const bestTopic = (topicId: number, reason: string) =>
  PUT(`topic/${topicId}/best`, {
    params: {
      reason,
    },
  })

/**
 * 取消加精
 */
export const deleteBestTopic = (topicId: number, reason: string) =>
  DELETE(`topic/${topicId}/best`, {
    params: {
      reason,
    },
  })

/**
 * 移动
 */
export const moveTopic = (topicId: number, reason: string, boardId: number) =>
  PUT(`topic/${topicId}/moveto/${boardId}`, {
    params: {
      reason,
    },
  })
