import { POST } from '@/utils/fetch'

type imgList = string[]
/**
 * @param 单个file对象
 * 上传File对象到 98 API
 * 返回该图片上传后的 URL 地址
 */
export interface PicList {
  base64: string
  name: string
  id: string
  file: File
}

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData()

  formData.append('files', file, file.name)

  const res = await POST<imgList>('file', {
    headers: {
      // Content-Type 置空
    },
    requestInit: {
      body: formData,
    },
  })

  let returl = ''

  res.fail().succeed(picurl => {
    returl = picurl[0]
  })

  return returl
}

export function randomString(l: number) {
  const len = l || 32
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i += 1) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }

  return pwd
}
