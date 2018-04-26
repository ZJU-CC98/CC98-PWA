import { GET } from './fetch'

export async function fetchTopic(topicID: number) {
  const response = await GET('topic/' + topicID)
  return response
}

export async function fetchPost(topicID: number, from: number, size: number) {
  const response = await GET(`topic/${topicID}/post?from=${from}&size=${size}`)
  return response
}

export async function fetchHot() {
  const response = await GET('topic/hot')
  return response
}

export async function fetchNew(from: number, size: number) {
  const response = await GET(`topic/new?from=${from}&size=${size}`)
  return response
}

export async function fetchUser(userID: number[]) {
  const query = userID
    .filter( u => u )
    .map( u => `id=${u}`)
    .join('&')

  if (!query) {
    return
  }

  const response = await GET('user?' + query)
  return response
}
