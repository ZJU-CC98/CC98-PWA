import { Try, Success } from '@/utils/fp/Try'
import { FetchError, GET } from '@/utils/fetch'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'

interface Tag {
  name: string
  id: number
}

/**
 * 获取标签信息
 */
export async function getTagsInfo() {
  const cache = getLocalStorage('tagsInfo') as Tag[] | undefined

  if (cache) {
    return Promise.resolve(Try.of<Tag[], FetchError>(Success.of(cache)))
  }

  const res = await GET<Tag[]>('config/global/alltag')
  res.succeed(data => setLocalStorage('tagsInfo', data, 3600 * 24 * 7))

  return res
}

/**
 * 根据 标签ID 获取 标签名
 */
export async function getTagNameById(id: number) {
  const tagsInfo = await getTagsInfo()
  let name = '未找到标签'
  tagsInfo.fail().succeed(tags => {
    for (const t of tags) {
      if (t.id === id) {
        name = t.name
        break
      }
    }
  })

  return name
}

/**
 * 获取某个版面的标签组
 */
export async function getBoardTags(id: string) {
  return GET(`board/${id}/tag`)
}
