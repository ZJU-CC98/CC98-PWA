import { Try, Success } from '@/utils/fp/Try'
import { FetchError } from '@/utils/fetch'
import { POST, PUT } from '@/utils/fetch'

/**
 * 上传图片
 */
export async function uploadPicture() {
  // TODO: remove mock
  const mockURLs = [
    'https://www.cc98.org/static/images/ms/ms19.png',
    'https://www.cc98.org/static/images/ac/08.png',
  ]

  const url = mockURLs[Math.random() < 0.5 ? 0 : 1]

  return Promise.resolve(Try.of<string, FetchError>(Success.of(url)))
}

/**
 * 回帖
 * @param topicId 帖子 ID
 * @param content 回帖内容
 */
export async function replyTopic(topicId: number, content: string) {
  return POST(`topic/${topicId}/post`, {
    params: {
      content,
      contentType: 0,
      title: '',
    },
  })
}

/**
 * 编辑帖子
 * @param postId 回复 ID
 * @param content 回帖内容
 */
export async function editorPost(topicId: number, content: string) {
  return PUT(`post/${topicId}`, {
    params: {
      content,
      contentType: 0,
      title: '',
    },
  })
}
