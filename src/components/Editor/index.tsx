
import React, { useState, useEffect } from 'react'
import ImageList from './ImageList'
import TextBase from './TextBase'
import ToolBar from './ToolBar'
import { uploadFile, PicList, randomString } from './utils'
interface Props {
  /**
   * 按下发送后的回调函数
   * content为文本内容
   * files是已经上传好的图片url列表
   */
  sendCallBack: (content: string, newUrlList?: string[]) => void
  defaultContent?: string
}

const deletePic = (id: string, picList: PicList[]): PicList[] =>
  picList.filter((e: PicList) => e.id !== id)

const files2base64 = async (files: FileList) => {
  let newPics: PicList[] = []
  if (files) {
    for (const file of files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      const res = new Promise<PicList>(resolve => {
        reader.onload = (e: ProgressEvent) => {
          if (e.target) {
            resolve({
              file,
              // @ts-ignore
              base64: e.target.result,
              name: file.name,
              id: randomString(10),
            })
          }
        }
      })
      newPics.push(await res)
    }
  }

  return newPics
}

const onPost = async (
  picList: PicList[],
  callback: (content: string, newUrlList?: string[]) => void,
  content: string
) => {
  if (picList.length > 0) {
    let urlList: string[] = []
    for (const i of picList) {
      const s = await uploadFile(i.file)
      urlList.push(s)
    }
    callback(content, urlList)
  } else {
    callback(content)
  }
}

const Editor: React.FunctionComponent<Props> = props => {
  const [picList, setPicList] = useState<PicList[]>([])
  const [sendLoading, setSendLoading] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    if (props.defaultContent) {
      setContent(props.defaultContent)
    }
  }, [])

  return (
    <>
      <TextBase
        onChange={(newContent: string) => {
          setContent(newContent)
        }}
        content={content}
      />
      <ImageList
        imgList={picList}
        deletePic={(id: string) => {
          setPicList(deletePic(id, picList))
        }}
      />
      <ToolBar
        sendLoading={sendLoading}
        handlePic={async files => {
          const pics2base64 = await files2base64(files)
          setPicList(picList.concat(pics2base64))
        }}
        onPost={async () => {
          setSendLoading(true)
          await onPost(picList, props.sendCallBack, content)
          setSendLoading(false)
        }}
      />
    </>
  )
}

export default Editor
// interface State {
//   showPicList: SPL[]
//   sendLoading: boolean
//   content: string
//   lastDefaultContent?: string | null
// }

// const imgListStyle = {
//   padding: '0px 15px 0px 15px',
//   margin: '0px',
//   backgroundColor: 'white',
// }
// const replyImgListStyle = {
//   padding: '0px 15px 0px 15px',
//   margin: '0px',
//   backgroundColor: 'white',
//   maxHeight: '200px',
// }

// const styles: StyleRules = {
//   tileBarRoot: {
//     backgroundColor: 'rgba(0,0,0,0)',
//   },
//   actionIcon: {
//     borderRadius: '100%',
//     backgroundColor: '#13121266',
//   },
// }

// function randomString(l: number) {
//   const len = l || 32
//   const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
//   /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
//   const maxPos = $chars.length
//   let pwd = ''
//   for (let i = 0; i < len; i += 1) {
//     pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
//   }

//   return pwd
// }
// export default withStyles(styles)(
//   class Editor extends React.Component<Props & { classes: ClassNameMap }, State> {
//     state: State = {
//       showPicList: [],
//       content: '',
//       sendLoading: false,
//       lastDefaultContent: null,
//     }

//     static getDerivedStateFromProps(props: Props, state: State) {
//       if (props.defaultContent !== state.lastDefaultContent) {
//         return {
//           content: props.defaultContent,
//           lastDefaultContent: props.defaultContent,
//         }
//       }

//       return null
//     }

// uploadPic = (event: EventTarget & HTMLInputElement) => {
//   const files = event.files
//   if (files) {
//     for (const file of files) {
//       const reader = new FileReader()
//       reader.readAsDataURL(file)
//       reader.onload = (e: ProgressEvent) => {
//         const showPiclist = this.state.showPicList
//         if (e.target) {
//           showPiclist.push({
//             file,
//             // @ts-ignore
//             base64: e.target.result,
//             name: file.name,
//             id: randomString(10),
//           })
//         }
//         this.setState({
//           showPicList: showPiclist,
//         })
//       }
//     }
//   }
// }

// deletePic = (id: string): void => {
//   const { showPicList } = this.state
//   this.setState({
//     showPicList: showPicList.filter((e: SPL) => e.id !== id),
//   })
// }

//     bindText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       this.setState({
//         content: event.target.value,
//       })
//     }

// onPost = async () => {
//   const { sendCallBack } = this.props
//   const urlList = await this.postPicAndCall()
//   sendCallBack(this.state.content, urlList)
//   this.setState({ content: '' })
// }

// postPicAndCall = async () => {
//   this.setState({
//     sendLoading: true,
//   })
//   const urlList: string[] = []
//   const { showPicList } = this.state
//   if (showPicList) {
//     for (const i of showPicList) {
//       const s = await uploadFile(i.file)
//       urlList.push(s)
//     }
//   }
//   this.setState({
//     sendLoading: false,
//   })

//   return urlList
// }

//     render() {
//       const { replyMode } = this.props
//       const { showPicList } = this.state

//       return (
//         <Subscribe to={[global]}>
//           {(g: GlobalContainer) => (
//             <>
//               <TextBase
//                 onChange={this.bindText}
//                 replyMode={replyMode}
//                 content={this.state.content}
//                 theme={g.state.theme}
//               />
//               <ImageList
//                 replyMode={replyMode}
//                 imgList={showPicList}
//                 deletePic={this.deletePic}
//                 theme={g.state.theme}
//               />
//               <div style={{ height: '55px', width: '100%' }} />
//               <ToolBar
//                 sendLoading={this.state.sendLoading}
//                 handlePic={this.uploadPic}
//                 onPost={this.onPost}
//               />
//             </>
//           )}
//         </Subscribe>
//       )
//     }
//   }
// )
