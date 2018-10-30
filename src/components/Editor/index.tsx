import { uploadFile } from '@/utils/fileHandle'
import {
  BottomNavigation,
  BottomNavigationAction,
  GridList,
  GridListTile,
  GridListTileBar,
  InputBase
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import Close from '@material-ui/icons/Close'
import Photo from '@material-ui/icons/Photo'
import Send from '@material-ui/icons/Send'
import { css } from 'emotion'
import React from 'react'
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
interface SPL {
  base64: string,
  name: string,
  id: string,
  file: File,
}

interface State {
  showPicList: SPL[],
  content: string,
  sendLoading: boolean
}

const bottomBar: React.CSSProperties = {
  position: 'fixed',
  bottom: '0px',
  width: '100%',
  justifyContent: 'space-between',
}
const bottomButton = {
  maxWidth: '100px',
}
const baseInputStyle = {
  padding: '15px 15px 0px 15px',
  backgroundColor: 'white',
  marginTop:'5px',
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
const picStyle = {

}

const styles: StyleRules = {
  inputMultiline: {
    minHeight: '200px',
  },
  replyInputMultiline: {
    minHeight: '200px',
    maxHeight: '200px',
  },
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
    clickUpload = () => {
      // @ts-ignore
      this.refs.uploadfile.click()
    }
    uploadPic = (files: FileList | null) => {

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
      const imglist = this.state.showPicList
      const { classes, sendCallBack, replyMode } = this.props
      const sendIcon = this.state.sendLoading
        ? <CircularProgress size={30} />
        : <Send />

      return (
        <>
          <InputBase
            fullWidth={true}
            placeholder="说些什么呢...."
            multiline
            style={baseInputStyle}
            classes={replyMode ?
                      { inputMultiline: classes.replyInputMultiline }
                    : { inputMultiline: classes.inputMultiline }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              this.bindText(e)
            }}
          />
          <input
            type="file"
            name="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.uploadPic(e.target.files)}
            style={{ display: 'none' }}
            // tslint:disable-next-line:jsx-no-string-ref
            ref="uploadfile"
            multiple
            accept="image/*"
          />
          <GridList
            cellHeight={160}
            cols={3}
            spacing={4}
            style={replyMode ? replyImgListStyle : imgListStyle}
          >
            {
              imglist.map(e =>
                (
                  <GridListTile
                    key={e.id}
                  >

                    <img src={e.base64} alt={e.name} />
                    <GridListTileBar
                      classes={{
                        root: classes.tileBarRoot,
                        actionIcon: classes.actionIcon,
                      }}
                      titlePosition="top"
                      actionIcon={
                        <IconButton
                          onClick={() =>
                            this.deletePic(e.id)
                          }
                        >
                          <Close />
                        </IconButton>
                      }
                      actionPosition="right"
                    />
                  </GridListTile>
                )
              )
            }
          </GridList>
          <BottomNavigation
            style={bottomBar}
          >
            <BottomNavigationAction
              icon={<Photo />}
              style={bottomButton}
              onClick={this.clickUpload}
            />
            <BottomNavigationAction
              icon={sendIcon}
              style={bottomButton}
              onClick={async () => {
                const urlList = await this.postPicAndCall()
                sendCallBack(this.state.content, urlList)
              }}
            />
          </BottomNavigation>
        </>
      )
    }
  }
)
