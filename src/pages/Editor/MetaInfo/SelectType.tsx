import React from 'react'
import { MenuItem, Select, OutlinedInput } from '@material-ui/core'

const typeNum = [{ id: 0, name: '普通' }, { id: 1, name: '校园活动' }, { id: 2, name: '学术信息' }]
interface Props {
  nowType: number
  typeChange: (id: number) => void
}
export default ({ nowType, typeChange }: Props) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    typeChange(Number(e.target.value))
  }

  return (
    <Select
      value={nowType}
      onChange={handleSelect}
      fullWidth
      input={<OutlinedInput labelWidth={60} name="topictype" id="filled-type" />}
    >
      {typeNum.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {' '}
          {item.name}
        </MenuItem>
      ))}
    </Select>
  )
}
