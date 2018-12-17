import React from 'react'
import styled from 'styled-components'

import useContainer from '@/hooks/useContainer'
import { MetaInfoContainer } from './MetaInfoContainer'
import ScrollTag from './ScrollTag'
import SelectType from './SelectType'
import { InputBase } from '@material-ui/core'
import useFetcher from '@/hooks/useFetcher'

import { getBoardTags } from '@/services/board'
import { getSinglePostById } from '@/services/post'
import { ITagGroup } from '@cc98/api'
const InputArea = styled(InputBase).attrs({
  fullWidth: true,
})`
  && {
    margin-top: 8px;
    padding: 4px 8px;
    border: 1.5px solid #ccc;
  }
`
export { MetaInfoContainer }

interface Props {
  container: MetaInfoContainer
  /**
   * 版面 ID
   */
  boardId?: string
  /**
   * 楼层 ID
   */
  postId?: string
  topicId?: string
}

export default ({ container, boardId, postId, topicId }: Props) => {
  useContainer(container)
  // 编辑帖子帖子是主题和发新帖的情况都要进行meta的编辑
  let boardTags: ITagGroup[] | null = null
  if (boardId) {
    ; [boardTags] = useFetcher(() => getBoardTags(boardId))
  }
  if (postId && !topicId) {
    const [postinfo] = useFetcher(() => getSinglePostById(Number(postId)))
    if (postinfo && postinfo.floor === 1) {
      ; [boardTags] = useFetcher(() => getBoardTags(String(postinfo.boardId)))
    }
  }
  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    container.setTitle(event.target.value)
  }
  if (boardTags !== null) {
    return (
      <>
        <InputArea value={container.state.title} placeholder="标题" onChange={onTitleChange} />
        <SelectType nowType={container.state.type} typeChange={type => container.setType(type)} />
        {boardTags[0] && (
          <ScrollTag
            tags={boardTags[0].tags}
            nowTag={container.state.tag1}
            tagChange={tag => container.setTag1(tag.id)}
          />
        )}
        {boardTags[1] && (
          <ScrollTag
            tags={boardTags[1].tags}
            nowTag={container.state.tag2}
            tagChange={tag => container.setTag2(tag.id)}
          />
        )}
      </>
    )
  }

  return <></>
}
