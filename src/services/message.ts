import { GET } from '@/utils/fetch'
import { IRecentMessage, IMessageContent } from '@cc98/api'

/**
 * 获取近期私信列表
 */
export function getRecentMessage(from: number) {
  return GET<IRecentMessage[]>('message/recent-contact-users', {
    params: {
      from,
      size: 20,
    },
  })
}

/**
 * 获取私信内容
 */
export function getMessageContent(userId: number, from: number) {
  return GET<IMessageContent[]>(`message/user/${userId}`, {
    params: {
      from,
      size: 10,
    },
  })
}
