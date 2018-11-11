import { GET, PUT } from '@/utils/fetch'
import { ILike, IPost } from '@cc98/api'

export default {
  like: async (id: number) => {
    const resPut = await PUT<ILike>(`/post/${id}/like`, { params: '1' })

    const resPost = await GET<ILike>(`/post/${id}/like`)

    // FIXME: error handle
    return resPost._value._value as ILike
  },

  dislike: async (id: number) => {
    const resPut = await PUT<ILike>(`/post/${id}/like`, { params: '2' })

    const resPost = await GET<ILike>(`/post/${id}/like`)

    // FIXME: error handle
    return resPost._value._value as ILike
  },

  quote: async (post: IPost) => {
    const time = new Date(post.time).toLocaleString()

    const content = `[quote][b]以下是引用${post.floor}楼：${
      post.userName
    }在${time}的发言：[color=blue]\
      [url=/topic/${post.topicId}/#${post.floor}]>>查看原帖<<[/url][/color][/b]\
      ${[post.content]}[/quote]\
    `

    return content
  },
}
