import { Try, Success, Failure } from './fp/Try'
import {GET, POST} from './fetch'
type imgList = Array<string>
export async function uploadFile(file: File):Promise<string> {
    const url = `file`
    let returl = ''
    let formdata = new FormData()
    formdata.append('files', file, file.name)
    formdata.append('contentType', "multipart/form-data")
    let res = await POST<imgList>(url, {body: formdata})
    const ress = res
      .fail()
      .succeed((picurl)=>{   

        returl = picurl[0]
      })
    return returl
}