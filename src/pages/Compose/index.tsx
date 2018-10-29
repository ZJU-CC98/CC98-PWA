import Editor from '@/components/Editor'
import { POST } from '@/utils/fetch'
import { uploadFile } from '@/utils/fileHandle'
import {
  BottomNavigation,
  BottomNavigationAction,
  FormHelperText,
  InputBase,
  TextField
} from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import { css } from 'emotion'
import React from 'react'
const labelStyle = {
  paddingLeft: '15px',
}
const baseInputStyle = {
  padding: '0px 15px 0px 15px',
}
interface State {
  picList: FileList | null
}
class Compose extends React.Component<{}, State> {
  state: State = {
    picList: null,
  }

  async post(boardId: string, title: string, content: string, tags?: string[]) {
    const data = {
      content,
      title,
      contentType: 0,
      tag1: tags ? tags[0] : null,
      tag2: tags ? tags[1] : null,
      type: 0,
    };
    const url = `/board/${boardId}/topic`;
    const response = await POST(url, { params: data })
    response
      .fail()
      .succeed(() => {
        return
      })
  }

  render() {
    return (
      <>
        <TextField
          id="essayTitle"
          label="帖子主题"
          InputLabelProps={{
            style: labelStyle,
          }}
          InputProps={{
            style: baseInputStyle,
          }}
          placeholder="帖子主题"
          required
          fullWidth
          margin="normal"
        />
        <Editor
          sendCallBack={(content: string, files?: string[]) => {
           // console.log(files)
          }}
        />
      </>
    )
  }
}
export default Compose
