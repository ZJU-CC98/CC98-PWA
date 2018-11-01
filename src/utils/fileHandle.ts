import { POST } from './fetch'

type imgList = string[]

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

  res
    .fail()
    .succeed(picurl => {
      returl = picurl[0]
    })

  return returl
}
