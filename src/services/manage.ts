import { POST, DELETE } from '../utils/fetch'

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
