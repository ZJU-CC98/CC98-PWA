import { Try, Success } from '@/utils/fp/Try'
import { FetchError } from '@/utils/fetch'

/**
 * 上传图片
 */
export async function uploadPicture() {
  const mockURLs = [
    'https://www.cc98.org/static/images/ms/ms19.png',
    'https://www.cc98.org/static/images/ac/08.png',
  ]

  const url = mockURLs[Math.random() < 0.5 ? 0 : 1]

  return Promise.resolve(Try.of<string, FetchError>(Success.of(url)))
}
