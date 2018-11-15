import { GET } from '@/utils/fetch'
import { ITopic } from '@cc98/api'

export async function getTopTopics(id: string) {
  return GET<ITopic[]>(`topic/toptopics?boardid=${id}`)
}

export async function getTopicsInBoard(
  id: string,
  from: number,
  size: number,
  tag1 = -1,
  tag2 = -1
) {
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
