import { POST, GET } from '@/utils/fetch'
import { ITopic, IHotTopic } from '@cc98/api'

/**
 * 根据id获取某个版面的置顶帖子
 */
export function getTopTopics(id: string) {
  return GET<ITopic[]>(`topic/toptopics?boardid=${id}`)
}

/**
 * @param id 版面id
 * @param from 帖子组起始位置
 * @param size 一次取的数量
 * @param tag1 如果有tag1，则传一个tag1值，-1为默认
 * @param tag2 如果有tag2，则传一个tag2值，-1为默认
 */
export function getTopicsInBoard(id: string, from: number, size: number, tag1 = -1, tag2 = -1) {
  const params: { [key: string]: string } = {}

  if (tag1 >= 0 || tag2 >= 0) {
    if (tag1 >= 0) {
      params.tag1 = `${tag1}`
    }
    if (tag2 >= 0) {
      params.tag2 = `${tag2}`
    }
    params.from = `${from}`
    params.size = `${size}`

    return GET(`topic/search/board/${id}/tag`, { params })
  }

  return GET(`board/${id}/topic`, {
    params: {
      from: `${from}`,
      size: `${size}`,
    },
  })
}

/**
 * 获取帖子基本信息
 */
export function getTopicInfo(id: string) {
  return GET<ITopic>(`topic/${id}`)
}

/**
 * 获取新帖
 */
export function getNewTopics(from: number) {
  return GET<ITopic[]>('topic/new', {
    params: {
      from: `${from}`,
      size: '20',
    },
  })
}

/**
 * 获取关注版面的帖子
 */
export function getFollowBoardsTopics(from: number) {
  return GET<ITopic[]>(`me/custom-board/topic?from=${from}&size=20`)
}

/**
 * 获取关注用户的帖子
 */
export function getFollowUsersTopics(from: number) {
  return GET<ITopic[]>(`me/followee/topic?from=${from}&size=20`)
}

/**
 * 搜索
 */
export function searchTopics(keyword: string, from: number) {
  return GET<ITopic[]>('topic/search', {
    params: {
      keyword: `${keyword}`,
      from: `${from}`,
      size: '20',
    },
  })
}

/**
 * 获取热门
 */
export function getHotTopics() {
  return GET<IHotTopic[]>('topic/hot')
}

/**
 * 获取本周热门
 */
export function getWeeklyHotTopics() {
  return GET<IHotTopic[]>('topic/hot-weekly')
}

/**
 * 获取本月热门
 */
export function getMonthlyHotTopics() {
  return GET<IHotTopic[]>('topic/hot-monthly')
}

/**
 * 获取历史热门
 */
export function getHistoryHotTopics() {
  return GET<IHotTopic[]>('topic/hot-history')
}

/**
 * 获取一个用户近期发的帖子
 */
export function getUsersRecentTopics(id: number, from: number) {
  return GET<ITopic[]>(`user/${id}/recent-topic?from=${from}&size=10`)
}

export function postNewTopic(
  boardId: string,
  title: string,
  topicType: string,
  content: string,
  tags: string[]
) {
  let postTag = {}
  let i = 0
  if (tags) {
    for (const iterator of tags) {
      i = i + 1
      postTag = {
        [`tag${i}`]: iterator,
        ...postTag,
      }
    }
  }

  return POST<string>(`/board/${boardId}/topic`, {
    params: {
      content,
      title,
      topicType,
      contentType: 0,
      type: 0,
      ...postTag,
    },
  })
}
