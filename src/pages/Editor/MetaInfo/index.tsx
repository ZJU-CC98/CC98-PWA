import React from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import useFetcher from '@/hooks/useFetcher'
import useContainer from '@/hooks/useContainer'
import { MetaInfoContainer } from './MetaInfoContainer'

import { InputBase, FormLabel } from '@material-ui/core'

import ScrollTag from './ScrollTag'
import SelectType from './SelectType'

import { getBoardTags } from '@/services/board'

const InputArea = muiStyled(InputBase).attrs({
  fullWidth: true,
})({
  padding: '4px 8px',
  border: '1.5px solid #ccc',
})

export { MetaInfoContainer }

const SelectDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 8px;
  padding-left: 4px;
`

const TagSelectDiv = styled.div``

interface Props {
  container: MetaInfoContainer
  /**
   * 版面 ID
   */
  boardId: number
}

export default ({ container, boardId }: Props) => {
  useContainer(container)

  const [boardTags] = useFetcher(() => getBoardTags(boardId))

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    container.setTitle(event.target.value)
  }

  if (boardTags === null) {
    return null
  }

  return (
    <>
      <SelectDiv>
        <div>
          <FormLabel>类型：</FormLabel>
          <SelectType value={container.state.type} onChange={type => container.setType(type)} />
        </div>

        <TagSelectDiv>
          {boardTags.length !== 0 && <FormLabel>标签：</FormLabel>}
          {boardTags[0] && (
            <ScrollTag
              tags={boardTags[0].tags}
              value={container.state.tag1}
              onChange={tag => container.setTag1(tag)}
            />
          )}
          {boardTags[1] && (
            <ScrollTag
              tags={boardTags[1].tags}
              value={container.state.tag2}
              onChange={tag => container.setTag2(tag)}
            />
          )}
        </TagSelectDiv>
      </SelectDiv>

      <InputArea value={container.state.title} placeholder="标题" onChange={onTitleChange} />
    </>
  )
}
