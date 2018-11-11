import React from 'react'

import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core'

interface Props {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  topicType: string
}
const typeNum = [
  { id: '0', name:'普通' },
  { id: '1', name:'校园活动' },
  { id: '2', name:'学术信息' },
]
export default ({ onChange, topicType }: Props) => (
  <FormControl variant="outlined" style={{ width:'100%' }}>
  <InputLabel htmlFor="filled-type">帖子类型</InputLabel>
  <Select
    value={topicType}
    onChange={e => {
      onChange(e)
    }}
    input={<OutlinedInput
      labelWidth={60}
      name="topictype"
      id="filled-type"
    />}
  >
    {typeNum.map(item => (<MenuItem value={item.id}> {item.name}</MenuItem>))}
  </Select>
</FormControl>
)
