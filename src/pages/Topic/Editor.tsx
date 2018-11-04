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
  initContent?: string
  resetInitContent: () => void
  theme: string
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
const darkStyle = css`&&{
  background-color: #424242;
}
`
const lightStyle = css`&&{
  background-color: white;
}
`
const blankBlock = css`
  height: 45px;
  /* background-color:white; */
`
const inputBox = css`&&{
  margin-left: 15px;
  width: 100%;
  opacity:0.54;
}
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
    // location.reload()
    self.props.callback()
    self.setState({ editing: false })
    self.props.resetInitContent()
  })

}

class ReplyEditor extends React.Component<Props, State> {
  state: State = {
    editing: false,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.initContent) {
      return {
        editing: true,
      }
    }

    return null
  }

  render() {
    const { theme } = this.props
    const editMode = this.state.editing
    const resetInitContent = this.props.resetInitContent

    return (
      <>
        <div style={editMode ? {} : { display: 'none' }}>
          <div
            className={blackWrap}
            onClick={e => {
              this.setState({ editing: false })
              this.props.resetInitContent()
            }}
          />
          <div className={editing}>
            <Editor
              replyMode
              defaultContent={this.props.initContent}
              sendCallBack={(content: string, files: string[]) => {
                let realContent: string
                if (files) {
                  const imgString = files.map(e => (` \n [img]${e}[/img]`)).join(' ')
                  realContent = content + imgString
                } else {
                  realContent = content
                }
                post(realContent, this.props.topic, this)
                this.setState({ editing: false })
                resetInitContent()
              }}
            />
          </div>
        </div>
        <div
          className={blankBlock}
        />
        <div
          className={`${decorEditor} ${theme === 'light' ? lightStyle : darkStyle}`}
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
