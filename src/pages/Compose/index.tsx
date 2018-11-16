import React, { useState, useEffect } from 'react'

import { TextField } from '@material-ui/core'

import Editor from '@/components/Editor'
import { navigate } from '@reach/router'

import ScrollTag, { TagType } from './ScrollTag'
import TypeSelect from './TypeSelect'

import { getBoardTags } from '@/services/tag'
import { postNewTopic } from '@/services/topic'
import { newPost } from '@/services/post'
const labelStyle = {
  paddingLeft: '15px',
}
const baseInputStyle = {
  padding: '0px 15px 0px 15px',
}
interface Props {
  targetId: string
  /**
   * editTOPIC 编辑自己的帖子
   *  如果是题主可以调整标题和类型
   *  非题主只能调节内容
   * newpost 发新贴
   *  需要标题和类型和标签
   * reply 回复他人的帖子
   * quote 引用他人的帖子
   */
  editType: 'quote' | 'newpost' | 'editTopic' | 'reply'
}

/**
 * tag数组转换成
 * { tag1: xx, tag2: xx ...}
 */
const Compose: React.FunctionComponent<Props> = ({ editType, targetId }) => {
  const [selectTag, setSelectTag] = useState<TagType[]>([])
  const [defaultContent, setDefaultContent] = useState<string>('')
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
    let newContent: string = content
    if (newUrlList) {
      newContent += ' \n'
      newUrlList.forEach(e => {
        newContent += ` [img]${e}[/img]`
      })
    }
    if (editType === 'newpost') {
      const res = await postNewTopic(targetId, title, type, newContent, selectTag.map(v => v.id))
      res.fail().succeed(newTopicId => {
        navigate(`/topic/${newTopicId}`)
      })
    }
    if (editType === 'reply' || editType === 'quote') {
      const res = await newPost(newContent, targetId)
      res.fail().succeed(e => {
        navigate(`/topic/${targetId}`)
      })
    }
  }
  let topDom = <></>
  useEffect(() => {
    if (editType === 'newpost') {
      ;(async () => {
        const res = await getBoardTags(targetId)
        res.fail().succeed(e => {
          setTags(e[0].tags)
        })
      })()
    }
    if (editType === 'quote') {
      // setDefaultContent(window.quote)
    }
  }, [])

  if (editType === 'newpost') {
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

  if (editType === 'reply') {
    topDom = <></>
  }

  return (
    <>
      {topDom}
      <Editor sendCallBack={callback} defaultContent={defaultContent} />
    </>
  )
}

export default Compose
