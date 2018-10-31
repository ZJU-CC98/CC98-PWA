import { FetchError, GET, PUT } from '@/utils/fetch'
import { Try } from '@/utils/fp/Try'

import { ILike } from '@cc98/api'
type PostUtilType = ILike & {}
interface PostUtil {
  like: (id: number) => Promise<ILike>,
}

const retSucceedData = <T extends PostUtilType>(Fn: Try<T, FetchError>): T => {
  let ret: T
  Fn.fail().succeed(data => {
    ret = data
  })

  // @ts-ignore TODO: 这里我不会定义鸭
  return ret
}
export class PostUtils implements PostUtil {
  like = async(id: number) => {
    const resPut = await PUT<ILike>(`/post/${id}/like`, { params: '1' })
    // const { refreshItem } = this.props
    const resPost = await GET<ILike>(`/post/${id}/like`)

    return retSucceedData(resPost)
  }

  dislike = async(id: number) => {
    const resPut = await PUT<ILike>(`/post/${id}/like`, { params: '2' })
    // const { refreshItem } = this.props
    const resPost = await GET<ILike>(`/post/${id}/like`)

    return retSucceedData(resPost)
  }
}

export default new PostUtils()
