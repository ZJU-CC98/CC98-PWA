import Editor from '@/components/Editor'
import { POST } from '@/utils/fetch'
import { ITopic } from '@cc98/api'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import { css } from 'emotion'
import React from 'react'
interface Props {
  topic: ITopic
  callback: () => void
}
interface State {
  editing: boolean,
}
const blackWrap = css`
  height:100%;
  width:100%;
  position:fixed;
  top:0px;
  background-color:#00000063;
`
const editing = css`
  && {
    position: fixed;
    bottom: 0px;
    display: flex;
    width: 100%;
    flex-direction: column;
  }
`
const decorEditor = css`
  position: fixed;
  bottom: 0px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: white;
  height: 40px;
`
const blankBlock = css`
  height: 45px;
`
const inputBox = css`
  margin-left: 15px;
  width: 100%;
`
const post = async (value: string, topic: ITopic, self: ReplyEditor) => {
  const url = `/post/topic/${topic.id}`
  const content = {
    content: value,
    contentType: 0,
    title: '',
  }
  const postData = await POST(`/topic/${topic.id}/post`, { params: content })
  postData.fail().succeed(e => {
     location.reload()
    // self.props.callback()
  })
}

class ReplyEditor extends React.PureComponent<Props, State> {
  state: State = {
    editing: false,
  }

  render() {
    const editMode = this.state.editing

    return (
      <>
        <div style={editMode ? {} : { display: 'none' }}>
          <div
            className={blackWrap}
            onClick={e => {
              this.setState({ editing: false })
            }}
          />
          <div className={editing}>
            <Editor
              replyMode
              sendCallBack={(content: string, files: string[]) => {
                let realContent: string
                if (files) {
                  const imgString = files.map(e => (` \n [img]${e}[/img]`)).join(' ')
                  realContent = content + imgString
                } else {
                  realContent = content
                }
                post(realContent, this.props.topic, this)

              }}
            />
          </div>
        </div>
        <div
          className={blankBlock}
        />
        <div
          className={decorEditor}
          onClick={e => {
            this.setState({ editing: true })
          }}
          style={!editMode ? {} : { display: 'none' }}
        >
          <Input
            defaultValue="输入内容"
            className={inputBox}
          />
          <Button
            variant="contained"
            color="primary"
          >
            回帖
          </Button>
        </div>
      </>
    )
  }
}

export default ReplyEditor
