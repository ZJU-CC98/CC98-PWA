import React, { useState } from 'react'
import styled from 'styled-components'

import { TextField, IconButton } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'

const SearchDiv = styled.div`
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
    <SearchDiv>
      <TextField
        fullWidth
        placeholder="搜索主题（限制10s一次）"
        value={value}
        onChange={onChange}
      />
      <IconButton onClick={() => onSearch(value)}>
        <SearchIcon color="primary" />
      </IconButton>
    </SearchDiv>
  )
}

export default SearchInput
