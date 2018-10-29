import Editor from '@/components/Editor'
import { POST } from '@/utils/fetch'
import { ITopic } from '@cc98/api'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { css } from 'emotion'
import React from 'react'

interface Props {
  topic: ITopic
}
interface State {
  value: string
}
const row = css`
  && {
    display: flex;
  }
`
export default class extends React.Component<Props, State> {
  state: State = {
    value: '',
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    this.setState({
      value: event.target.value,
    })
  handleClick = async () => {
    const { topic } = this.props
    const url = `/post/topic/${topic.id}`
    const { value } = this.state
    const content = {
      content: value,
      contentType: 0,
      title: '',
    }
    const contentJson = JSON.stringify(content)
    const postData = await POST(`/topic/${topic.id}/post`, { params: contentJson })
  }
  sendCallback = (content: string, filesUrl: string[]) => {
  }

  render() {

    return (
      <Editor sendCallBack={this.sendCallback} />
    )
  }
}
