import { Try, Success } from '@/utils/fp/Try'
import { ITag } from '@cc98/api'
import { FetchError, GET } from '@/utils/fetch'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'

/**
 * 获取标签信息
 */
export async function getTagsInfo() {
  const cache = getLocalStorage('tagsInfo') as ITag[] | undefined

  if (cache) {
    return Promise.resolve(Try.of<ITag[], FetchError>(Success.of(cache)))
  }

  const res = await GET<ITag[]>('config/global/alltag')
  res.succeed(data => setLocalStorage('tagsInfo', data, 3600 * 24 * 7))

  return res
}

interface Tag {
  name: string
  id: number
}

/**
 * 根据 标签ID 获取 标签名
 */
export function getTagNameById(tags: Tag[], id: number) {
  for (const t of tags) {
    if (t.id === id) return t.name
  }

  return '未找到标签'
}
