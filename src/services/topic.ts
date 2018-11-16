import { GET } from '@/utils/fetch'
import { ITopic, IPost, IHotTopic } from '@cc98/api'

export function getTopTopics(id: string) {
  return GET<ITopic[]>(`topic/toptopics?boardid=${id}`)
}

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

export function getTopicInfo(id: string) {
  return GET<ITopic>(`topic/${id}`)
}

export function getPost(id: number, from: number) {
  return GET<IPost[]>(`topic/${id}/post`, {
    params: {
      from: `${from}`,
      size: '10',
    },
  })
}

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

export function getHotPost(id: number) {
  return GET<IPost[]>(`topic/${id}/hot-post`)
}

export function getNewTopics(from: number) {
  return GET<ITopic[]>('topic/new', {
    params: {
      from: `${from}`,
      size: '20',
    },
  })
}

export function getFollowBoardsTopics(from: number) {
  return GET<ITopic[]>(`me/custom-board/topic?from=${from}&size=20`)
}

export function getFollowUsersTopics(from: number) {
  return GET<ITopic[]>(`me/followee/topic?from=${from}&size=20`)
}

export function searchTopics(keyword: string, from: number) {
  return GET<ITopic[]>('topic/search', {
    params: {
      keyword: `${keyword}`,
      from: `${from}`,
      size: '20',
    },
  })
}

export function getHotTopics() {
  return GET<IHotTopic[]>('topic/hot')
}

export function getUsersRecentTopics(id: number, from: number) {
  return GET<ITopic[]>(`user/${id}/recent-topic?from=${from}&size=10`)
}
