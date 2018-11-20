import React, { useState, useEffect } from 'react'

import Editor from '@/components/Editor'
import { navigate } from '@reach/router'

import ScrollTag, { TagType } from './ScrollTag'
import TypeSelect from './TypeSelect'
import toast from './Toast'
import Title from './Title'
import { getBoardTags } from '@/services/board'
import { postNewTopic } from '@/services/topic'
import { newPost, getEditAuth, modifyPost } from '@/services/post'
import { IPost } from '@cc98/api'

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
  editType: 'quote' | 'newpost' | 'edit' | 'reply'
}

/**
 * tag数组转换成
 * { tag1: xx, tag2: xx ...}
 */
const Compose: React.FunctionComponent<Props> = ({ editType, targetId }) => {
  const [selectTag, setSelectTag] = useState<TagType[]>([])
  const [defaultContent, setDefaultContent] = useState<string>('')
  const [tags, setTags] = useState<TagType[]>([])
  const [editInfo, setEditInfo] = useState<IPost | null>(null)
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
      <ScrollTag onChange={setSelectTag} clickTag={selectTag} maxTag={2} tags={tags} />
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

    if (editType === 'edit') {
      // const res = await editPost()
      const res = await modifyPost(title, newContent, targetId, selectTag.map(v => v.id))
      res
        .fail(err => {
          toast.error({ content: err.msg })
        })
        .succeed(v => {
          navigate(`/topic/${editInfo.topicId}`)
        })
    }
  }
  let haveTopdom: boolean = false

  const getTags = async (boardId: string) => {
    const res = await getBoardTags(boardId)
    res.fail().succeed(e => {
      if (e[0].tags) setTags(e[0].tags)
    })
  }

  const getEdit = async () => {
    const res = await getEditAuth(targetId)
    res
      .fail(() => {
        toast.error({
          content: '没有操作权限',
          // FIXME:
          onClose: () => {
            window.history.back()
          },
        })
      })
      .succeed(e => {
        setDefaultContent(e.content)
        setEditInfo(e)
        setTitle(e.title)
        getTags(e.boardId.toString())
      })
  }
  useEffect(() => {
    if (editType === 'newpost') {
      getTags(targetId)
    }
    if (editType === 'quote') {
      // FIXME: 接受从postItem 通过window传过来的引用内容
      setDefaultContent(window.edit.quoteContent)
    }
    if (editType === 'edit') {
      getEdit()
    }
  }, [])

  if (editType === 'newpost' || (editType === 'edit' && editInfo && editInfo.floor === 1)) {
    haveTopdom = true
  }

  return (
    <>
      {haveTopdom && <Title onChange={setTitle} label="标题" placeholder="标题" value={title} />}
      {editType === 'newpost' && <TypeSelect onChange={setType} topicType={type} />}
      {haveTopdom && tagDom}
      <Editor sendCallBack={callback} defaultContent={defaultContent} />
    </>
  )
}

export default Compose
