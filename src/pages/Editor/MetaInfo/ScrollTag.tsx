import React, { useEffect } from 'react'

import { Select, MenuItem } from '@material-ui/core'
import { ITag } from '@cc98/api'

interface Props {
  tags: ITag[]
  value?: number
  onChange: (tag: number) => void
}

export default ({ tags, value, onChange }: Props) => {
  useEffect(() => {
    if (value === undefined) {
      onChange(tags[0].id)
    }
  }, [])

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(e.target.value, 10))
  }

  return (
    <Select value={value} onChange={handleSelect}>
      {tags.map(tag => (
        <MenuItem key={tag.id} value={tag.id}>
          {tag.name}
        </MenuItem>
      ))}
    </Select>
  )
}
