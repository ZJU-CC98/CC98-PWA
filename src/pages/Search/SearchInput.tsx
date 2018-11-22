import React, { useState } from 'react'
import { css } from 'emotion'

import { TextField, IconButton } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'

const searchInput = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 10px 10px 25px;
`

interface Props {
  onSearch: (value: string) => void
}

const SearchInput: React.FunctionComponent<Props> = ({ onSearch }) => {
  const [value, setValue] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className={searchInput}>
      <TextField fullWidth placeholder="搜索主题" value={value} onChange={onChange} />
      <IconButton onClick={() => onSearch(value)}>
        <SearchIcon color="primary" />
      </IconButton>
    </div>
  )
}

export default SearchInput
