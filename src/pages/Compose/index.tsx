import Editor from '@/components/Editor'
import { GET, POST } from '@/utils/fetch'
import toast from '@/utils/Toast/index'
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import { navigate } from '@reach/router';
import { css } from 'emotion'
import React from 'react'
import ScrollTag from './ScrollTag'
import TypeSelect from './TypeSelect'
interface TagType {
  id: number,
  name: string,
}
const labelStyle = {
  paddingLeft: '15px',
}
const baseInputStyle = {
  padding: '0px 15px 0px 15px',
}
interface State {
  picList: FileList | null,
  title: string,
  topicType: string,
  tag: TagType[],
  chosenTag: TagType[],
}
interface Props {
  boardId: string,
}

interface BoradTag {
  layer: number,
  tags: TagType[],
}

class Compose extends React.Component<Props, State> {
  state: State = {
    picList: null,
    title: '',
    topicType: '0',
    tag: [],
    chosenTag: [],
  }

  async componentDidMount() {
    const res = await this.getTag(this.props.boardId)
    this.setState({ tag: res })
  }

  async post(boardId: string, title: string, content: string, tags?: TagType[]) {

    let postTag = {}
    let i = 0
    if (tags) {
      for (const iterator of tags) {
        i = i + 1
        postTag = {
          [`tag${i}`]: iterator.id,
          ...postTag,
        }
      }
    }
    const data = {
      content,
      title,
      contentType: 0,
      type: 0,
      topicType: this.state.topicType,
      ...postTag,
    };
    const url = `/board/${boardId}/topic`;
    const response = await POST(url, { params: data })
    response
      .fail()
      .succeed(topicId => {
        navigate(`/topic/${topicId}`)

        return
      })
  }

  async getTag(boardId: string) {
    const url = `board/${boardId}/tag`
    const res = await GET<BoradTag[]>(url)
    let ret: TagType[] = []
    res.fail().succeed(data => { ret = data[0].tags })

    return ret
  }

  bindText = (event: React.ChangeEvent<HTMLInputElement
                      | HTMLTextAreaElement
                      | HTMLSelectElement>
              ) => {
    this.setState({
      title: event.target.value,
    })
  }

  bindType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ topicType: event.target.value })
  }

  sendCallBack = (content: string, files?: string[]) => {
    // console.log(files)
    if (this.state.title === '') {
      toast.error({ content: '请填写标题～(￣▽￣～)(～￣▽￣)～ ' })

      return
    }

    let realContent: string
    if (files) {
      const imgString = files.map(e => (` \n [img]${e}[/img]`)).join(' ')
      realContent = content + imgString
    } else {
      realContent = content
    }
    this.post(
      this.props.boardId,
      this.state.title,
      realContent,
      this.state.chosenTag
    )
  }

  render() {
    const { tag } = this.state
    const tagDom = (tag.length === 0) ? <></> : (
    <ScrollTag
      maxTag={2}
      tags={this.state.tag}
      tagChange={tags => {
        this.setState({ chosenTag: tags })
      }}
    />)

    return (
      <>
        <TextField
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
          onChange={e => {
            this.bindText(e)
          }}
          margin="normal"
        />
        <TypeSelect
          onChange={this.bindType}
          topicType={this.state.topicType}
        />
        {tagDom}
        <Editor
          sendCallBack={this.sendCallBack}
        />
      </>
    )
  }
}
export default Compose
