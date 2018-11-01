import { GET, POST } from './fetch'
type imgList = string[]
export async function uploadFile(file: File): Promise<string> {
  const url = 'file'
  let returl = ''
  const formdata = new FormData()
  formdata.append('files', file, file.name)
  formdata.append('contentType', 'multipart/form-data')
  const res = await POST<imgList>(url, { body: formdata })
  const ress = res
    .fail()
    .succeed(picurl => {

      returl = picurl[0]
    })

  return returl
}
