import { uploadFile } from '@/utils/fileHandle'
import {
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import Close from '@material-ui/icons/Close'
import Send from '@material-ui/icons/Send'
import { css } from 'emotion'
import React from 'react'
import ImageList from './ImageList'
import TextBase from './TextField'
import ToolBar from './ToolBar'
import { SPL } from './type'
interface Props {
  /**
   * 按下发送后的回调函数
   * content为文本内容
   * files是已经上传好的图片url列表
   */
  sendCallBack: (content: string, files?: string[]) => void,
  maxHeight?: number,
  replyMode?: boolean
}

interface State {
  showPicList: SPL[],
  content: string,
  sendLoading: boolean
}

const imgListStyle = {
  padding: '0px 15px 0px 15px',
  margin: '0px',
  backgroundColor: 'white',
}
const replyImgListStyle = {
  padding: '0px 15px 0px 15px',
  margin: '0px',
  backgroundColor: 'white',
  maxHeight: '200px',
}

const styles: StyleRules = {
  tileBarRoot: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  actionIcon: {
    borderRadius: '100%',
    backgroundColor: '#13121266',
  },
}

function randomString(l: number) {
  const len = l || 32;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i += 1) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return pwd;
}
export default withStyles(styles)(
  class Editor extends React.Component<Props & { classes: ClassNameMap }, State> {
    state: State = {
      showPicList: [],
      content: '',
      sendLoading: false,
    }

    uploadPic = (event: EventTarget & HTMLInputElement) => {
      const files = event.files
      if (files) {
        for (const file of files) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e: ProgressEvent) => {
            const showPiclist = this.state.showPicList
            if (e.target) {
              showPiclist.push({
                file,
                // @ts-ignore
                base64: e.target.result,
                name: file.name,
                id: randomString(10),
              })
            }
            this.setState({
              showPicList: showPiclist,
            })
          }
        }
      }
    }

    deletePic = (id: string): void => {
      const { showPicList } = this.state
      this.setState({
        showPicList: showPicList.filter((e: SPL) => (e.id !== id)),
      })
    }

    bindText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      this.setState({
        content: event.target.value,
      })
    }

    onPost = async() => {
      const { sendCallBack } = this.props
      const urlList = await this.postPicAndCall()
      sendCallBack(this.state.content, urlList)
    }

    postPicAndCall = async () => {
      this.setState({
        sendLoading: true,
      })
      const urlList: string[] = []
      const { showPicList } = this.state
      if (showPicList) {
        for (const i of showPicList) {
          const s = await uploadFile(i.file)
          urlList.push(s)
        }
      }
      this.setState({
        sendLoading: false,
      })

      return urlList
    }

    render() {
      const { replyMode } = this.props
      const { showPicList } = this.state

      return (
        <>
          <TextBase
            onChange={this.bindText}
            replyMode={replyMode}
          />
          <ImageList
            replyMode={replyMode}
            imgList={showPicList}
            deletePic={this.deletePic}
          />
          <ToolBar
            sendLoading={this.state.sendLoading}
            handlePic={this.uploadPic}
            onPost={this.onPost}
          />
        </>
      )
    }
  }
)
