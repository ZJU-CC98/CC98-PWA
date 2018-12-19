import React from 'react'

import { MenuItem, Select } from '@material-ui/core'

const PostType = [{ id: 0, name: '普通' }, { id: 1, name: '校园活动' }, { id: 2, name: '学术信息' }]

interface Props {
  value: number
  onChange: (id: number) => void
}

export default ({ value, onChange }: Props) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(e.target.value, 10))
  }

  return (
    <Select value={value} onChange={handleSelect}>
      {PostType.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  )
}
