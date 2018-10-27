import React from 'react'
import { css } from 'emotion'
import Icon from '@material-ui/core/Icon';
import { TextField, 
         InputBase,
         FormHelperText,
         BottomNavigation,
         BottomNavigationAction
} from '@material-ui/core'
import Editor from '@/components/Editor'
import { uploadFile } from '@/utils/fileHandle'
const labelStyle = {
  paddingLeft: '15px',
}
const baseInputStyle = {
  padding: '0px 15px 0px 15px'
}
type State = {
  picList : FileList | null
}
class Compose extends React.Component<{}, State> {
  state: State = {
    picList: null
  }

  render(){
  return(
    <>
      <TextField
        id="essayTitle"
        label="帖子主题"
        InputLabelProps = {{
          style: labelStyle,
        }}
        InputProps = {{
          style: baseInputStyle,
        }}
        placeholder="帖子主题"
        required
        fullWidth
        margin="normal"
      />
      <Editor 
        sendCallBack = {(content: string, files?: Array<string>) => {
          console.log(files)
        }}
      />
    </>
  )}
}
export default Compose
  