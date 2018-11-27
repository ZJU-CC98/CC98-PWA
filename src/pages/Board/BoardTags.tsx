import React from 'react'
import { css } from 'emotion'

import { FormControl, MenuItem, Select } from '@material-ui/core'

import { ITagGroup } from '@cc98/api'

interface SelectProps {
  tagGroup: ITagGroup
  onChange: (tagID: number) => void
}

const TagSelect: React.FunctionComponent<SelectProps> = ({ tagGroup, onChange }) => (
  <FormControl>
    <Select value={-1} onChange={event => onChange(parseInt(event.target.value, 10))}>
      <MenuItem key={0} value={-1}>
        全部
      </MenuItem>
      {tagGroup.tags.map(t => (
        <MenuItem key={t.id} value={t.id}>
          {t.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

const wrapper = css`
  display: flex;
`

interface Props {
  boardTags: ITagGroup[] | null
  onChange: (tagID: number, index: number) => void
}

const Tags: React.FunctionComponent<Props> = ({ boardTags, onChange }) => (
  <div className={wrapper}>
    {boardTags &&
      boardTags.map((tagGroup, index) => (
        <TagSelect
          key={index}
          tagGroup={tagGroup}
          onChange={(tagID: number) => onChange(tagID, index)}
        />
      ))}
  </div>
)

export default Tags
