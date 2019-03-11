import React from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import useFetcher from '@/hooks/useFetcher'
import useModel from '@/hooks/useModel'
import { MetaInfoModel } from './MetaInfoModel'

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

export { MetaInfoModel }

const SelectDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 8px;
  padding-left: 4px;
`

const TagSelectDiv = styled.div``

interface Props {
  model: MetaInfoModel
  /**
   * 版面 ID
   */
  boardId: number
}

export default ({ model, boardId }: Props) => {
  useModel(model)

  const [boardTags] = useFetcher(() => getBoardTags(boardId))

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    model.setTitle(event.target.value)
  }

  if (boardTags === null) {
    return null
  }

  return (
    <>
      <SelectDiv>
        <div>
          <FormLabel>类型：</FormLabel>
          <SelectType value={model.state.type} onChange={type => model.setType(type)} />
        </div>

        <TagSelectDiv>
          {boardTags.length !== 0 && <FormLabel>标签：</FormLabel>}
          {boardTags[0] && (
            <ScrollTag
              tags={boardTags[0].tags}
              value={model.state.tag1}
              onChange={tag => model.setTag1(tag)}
            />
          )}
          {boardTags[1] && (
            <ScrollTag
              tags={boardTags[1].tags}
              value={model.state.tag2}
              onChange={tag => model.setTag2(tag)}
            />
          )}
        </TagSelectDiv>
      </SelectDiv>

      <InputArea value={model.state.title} placeholder="标题" onChange={onTitleChange} />
    </>
  )
}
