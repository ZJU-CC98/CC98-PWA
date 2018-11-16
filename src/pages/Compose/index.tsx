import React, { useState, useEffect, useRef } from 'react'

import { TextField } from '@material-ui/core'

import Editor from '@/components/Editor'
import { navigate } from '@reach/router'

import ScrollTag, { TagType } from './ScrollTag'
import TypeSelect from './TypeSelect'

import { getBoardTags } from '@/services/tag'
import { postNewTopic } from '@/services/topic'

const labelStyle = {
  paddingLeft: '15px',
}
const baseInputStyle = {
  padding: '0px 15px 0px 15px',
}
interface Props {
  targetId: string
  /**
   * editpost 编辑自己的帖子
   *  如果是题主可以调整标题和类型
   *  非题主只能调节内容
   * newpost 发新贴
   *  需要标题和类型和标签
   * reply 回复他人的帖子（引用、回复、等）
   */
  editType: 'editpost' | 'newpost' | 'editTopic' | 'reply'
}

/**
 * tag数组转换成
 * { tag1: xx, tag2: xx ...}
 */
const Compose: React.FunctionComponent<Props> = props => {
  const [selectTag, setSelectTag] = useState<TagType[]>([])
  const tagComponent = useRef(null)
  const [tags, setTags] = useState<TagType[]>([])
  /**
   * type表示帖子的类型
   * { id: '0', name:'普通' },
   * { id: '1', name:'校园活动' },
   * { id: '2', name:'学术信息' },
   */
  const [type, setType] = useState<string>('0')
  const [title, setTitle] = useState<string>('')
  const tagDom =
    tags.length === 0 ? (
      <></>
    ) : (
      <ScrollTag
        onChange={newClickTags => {
          setSelectTag(newClickTags)
        }}
        clickTag={selectTag}
        maxTag={2}
        tags={tags}
      />
    )

  const callback = async (content: string, newUrlList?: string[] | undefined) => {
    if (props.editType === 'newpost') {
      const res = await postNewTopic(props.targetId, title, type, content, selectTag.map(v => v.id))
      res.fail().succeed(newTopicId => {
        navigate(`topic/${newTopicId}`)
      })
    }
  }
  let topDom = <></>
  useEffect(() => {
    if (props.editType === 'newpost') {
      ;(async () => {
        const res = await getBoardTags(props.targetId)
        res.fail().succeed(e => {
          setTags(e[0].tags)
        })
      })()
    }
  }, [])

  if (props.editType === 'newpost') {
    topDom = (
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
            setTitle(e.target.value)
          }}
          margin="normal"
        />
        <TypeSelect
          onChange={(e: string) => {
            setType(e)
          }}
          topicType={type}
        />
        {tagDom}
      </>
    )
  }

  return (
    <>
      {topDom}
      <Editor sendCallBack={callback} defaultContent={''} />
    </>
  )
}

// class Compose extends React.Component<Props, State> {
//   state: State = {
//     picList: null,
//     title: '',
//     topicType: '0',
//     tag: [],
//     chosenTag: [],
//   }

// async componentDidMount() {
//   const res = await this.getTag(this.props.boardId)
//   this.setState({ tag: res })
// }

// async post(boardId: string, title: string, content: string, tags?: TagType[]) {
//   let postTag = {}
//   let i = 0
//   if (tags) {
//     for (const iterator of tags) {
//       i = i + 1
//       postTag = {
//         [`tag${i}`]: iterator.id,
//         ...postTag,
//       }
//     }
//   }
//   const data = {
//     content,
//     title,
//     contentType: 0,
//     type: 0,
//     topicType: this.state.topicType,
//     ...postTag,
//   }
//   const url = `/board/${boardId}/topic`
//   const response = await POST(url, { params: data })
//   response.fail().succeed(topicId => {
//     navigate(`/topic/${topicId}`)

//     return
//   })
// }

// async getTag(boardId: string) {
//   const url = `board/${boardId}/tag`
//   const res = await GET<BoradTag[]>(url)
//   let ret: TagType[] = []
//   res.fail().succeed(data => {
//     ret = data[0].tags
//   })

//   return ret
// }

//   bindText = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     this.setState({
//       title: event.target.value,
//     })
//   }

//   bindType = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     this.setState({ topicType: event.target.value })
//   }

//   sendCallBack = (content: string, files?: string[]) => {
//     // console.log(files)
//     if (this.state.title === '') {
//       toast.error({ content: '请填写标题～(￣▽￣～)(～￣▽￣)～ ' })

//       return
//     }

//     let realContent: string
//     if (files) {
//       const imgString = files.map(e => ` \n [img]${e}[/img]`).join(' ')
//       realContent = content + imgString
//     } else {
//       realContent = content
//     }
//     this.post(this.props.boardId, this.state.title, realContent, this.state.chosenTag)
//   }

//   render() {
// const { tag } = this.state
// const tagDom =
//   tag.length === 0 ? (
//     <></>
//   ) : (
//     <ScrollTag
//       maxTag={2}
//       tags={this.state.tag}
//       tagChange={tags => {
//         this.setState({ chosenTag: tags })
//       }}
//     />
//   )

//     return (
//       <>
//         <TextField
//           label="帖子主题"
//           InputLabelProps={{
//             style: labelStyle,
//           }}
//           InputProps={{
//             style: baseInputStyle,
//           }}
//           placeholder="帖子主题"
//           required
//           fullWidth
//           onChange={e => {
//             this.bindText(e)
//           }}
//           margin="normal"
//         />
//         <TypeSelect onChange={this.bindType} topicType={this.state.topicType} />
//         {tagDom}
//         <Editor sendCallBack={this.sendCallBack} defaultContent={''} />
//       </>
//     )
//   }
// }
export default Compose
