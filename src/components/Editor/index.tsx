import React from 'react'
import { debounce } from 'lodash-es'
import { TextField, 
    InputBase,
    FormHelperText,
    BottomNavigation,
    BottomNavigationAction,
    GridList,
    Grid,
    GridListTile,
    Badge,
    GridListTileBar
} from '@material-ui/core'
import Photo from '@material-ui/icons/Photo'
import Send from '@material-ui/icons/Send'
import { uploadFile } from '@/utils/fileHandle'
import { css } from 'emotion'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'
interface Props {
    /**
     * 按下发送后的回调函数
     * content为文本内容
     * files是已经上传好的图片url列表
     */
    sendCallBack: (content: string, files?: Array<string>) => void,

}


type State = Readonly<{
    showPicList: {
        base64: string,
        name: string,
        id: string,
        file: File,
    }[],
    content: string,
    sendLoading: boolean
}>

const overrideStyle = css`
    minHeight: '200px'
`
const bottomBar = {
    position: "fixed",
    bottom: '0px',
    width: '100%',
    justifyContent: 'space-between',
}
const bottomButton = {
    maxWidth: '100px',
}
const baseInputStyle = {
    padding: '15px 15px 0px 15px',
}

const imgListStyle = {
    padding: '0px 15px 0px 15px',
    margin: '0px'
}
const picStyle = {
    
}

const styles: StyleRules = {
    inputMultiline: {
        minHeight: '300px'
    },
    tileBarRoot: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    actionIcon: {
        borderRadius: '100%',
        backgroundColor: '#13121266'
    }
}


function _randomString(len: number) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (let i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
}
export default withStyles(styles)(
class Editor extends React.Component<Props & { classes: ClassNameMap }, State> {
    state:State = {
        showPicList: [],
        content: '',
        sendLoading: false
    }
    clickUpload = () => {
        this.refs.uploadfile.click()
    }
    uploadPic = ( files: FileList | null) => {
        if (files) 
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader()
                reader.readAsDataURL(files[i])
                reader.onload = (e) => {
                    let showPiclist = this.state.showPicList
                    if (e.target) {
                        showPiclist.push({
                            base64: e.target.result,
                            name: files[i].name,
                            id: _randomString(10),
                            file: files[i]
                        })
                    }

                    this.setState({
                        showPicList: showPiclist,
                    })
                }
            }
    }

    deletePic = (id: string):void=>{
        const { showPicList } = this.state
        this.setState({
            showPicList: showPicList.filter((e)=>{
                return (e.id !== id)
            })
        })
    }

    bindText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            content: event.target.value,
        })
    }

    postPicAndCall = async () => {
        this.setState({
            sendLoading: true
        })
        let urlList : Array<string> = []
        const { showPicList } = this.state
        if ( showPicList ) {
            for (let i = 0; i < showPicList.length; i++ ) {
                const s = await uploadFile(showPicList[i].file)
                urlList.push(s)
            }
        }
        this.setState({
            sendLoading: false
        })
        return urlList
    }
render() {
    const imglist = this.state.showPicList
    const { classes, sendCallBack } = this.props
    const sendIcon = this.state.sendLoading
        ?<CircularProgress size={30}/>
        :<Send />
    return (
      <div>
        <InputBase
            fullWidth = {true}
            placeholder = '说些什么呢....'
            multiline
            style = {baseInputStyle}
            classes={{inputMultiline: classes.inputMultiline}}
            onChange = { (e) => {
                this.bindText(e)
            }}
        />
        <input 
            type="file" 
            name="file" 
            onChange={(e) => this.uploadPic(e.target.files)} 
            style={{display:'none'}} 
            ref="uploadfile"
            multiple
            accept="image/*"
        />
        <GridList cellHeight={160}  
            cols={3}
            spacing={4}
            style = {imgListStyle}
        >
            {
                imglist.map( e => {
                    return (
                    <GridListTile onClick = {() => {
                        // TODO: delete pic
                    }}
                        key = {e.id}    
                    >
                        
                        <img src = {e.base64} alt = {e.name}/>
                        <GridListTileBar
                        classes = {{
                            root: classes.tileBarRoot,
                            actionIcon: classes.actionIcon
                        }}
                        titlePosition="top"
                        actionIcon={
                            <IconButton onClick={()=>{
                                this.deletePic(e.id)
                            }}>
                                <Close />
                            </IconButton>
                        }
                        actionPosition="right"
                        />
                    </GridListTile>
                    )
                })
            }
        </GridList>
        <BottomNavigation style = {bottomBar}>
            <BottomNavigationAction 
                icon={<Photo />} 
                style = {bottomButton}
                onClick = {this.clickUpload}
            />
            <BottomNavigationAction 
                icon={ sendIcon } 
                style = {bottomButton}
                onClick = {async () => {
                    const urlList = await this.postPicAndCall()
                    sendCallBack(this.state.content, urlList)
                }}
            /> 
        </BottomNavigation>
      </div>
    )
}
}
)