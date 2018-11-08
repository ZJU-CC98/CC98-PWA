import { FetchError, GET, PUT } from '@/utils/fetch'
import { Try } from '@/utils/fp/Try'

import { ILike, IPost } from '@cc98/api'
type PostUtilType = ILike | null
interface PostUtil {
  like: (id: number) => Promise<ILike>
}

const retSucceedData = <T extends PostUtilType>(Fn: Try<T, FetchError>): T => {
  let ret: T
  Fn.fail().succeed(data => {
    ret = data
  })

  // @ts-ignore TODO: 这里怎么定义呢。。。
  return ret
}
export class PostUtils implements PostUtil {
  like = async (id: number) => {
    const resPut = await PUT<ILike>(`/post/${id}/like`, { params: '1' })
    // const { refreshItem } = this.props
    const resPost = await GET<ILike>(`/post/${id}/like`)

    return retSucceedData(resPost)
  }

  dislike = async (id: number) => {
    const resPut = await PUT<ILike>(`/post/${id}/like`, { params: '2' })
    // const { refreshItem } = this.props
    const resPost = await GET<ILike>(`/post/${id}/like`)

    return retSucceedData(resPost)
  }

  quote = async (post: IPost) => {
    const content = post.content
    const time = new Date(post.time).toLocaleString()
    const realcontent = `[quote][b]以下是引用${post.floor}楼：${
      post.userName
    }在${time}的发言：[color=blue]\
    [url=/topic/${post.topicId}/#${post.floor}]>>查看原帖<<[/url][/color][/b]\
    ${[post.content]}[/quote]\
    `

    return realcontent
  }
}

export default new PostUtils()
