import React, { useState } from 'react'

import { InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { Theme } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    position: 'relative',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    width: theme.spacing(6),
    height: '100%',
    position: 'absolute',
    right: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(6),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

interface Props {
  onSearch?: (value: string) => void
  onChange?: (value: string) => void
  placeholder?: string
}

const SearchInput: React.FC<Props> = ({ placeholder, onChange, onSearch }) => {
  const [value, setValue] = useState('')

  const classes = useStyles()

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange && onChange(e.target.value)
  }

  const onSearchClick = () => {
    onSearch && onSearch(value)
  }

  return (
    <div className={classes.search}>
      <InputBase
        placeholder={placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={value}
        onChange={inputOnChange}
      />
      <div className={classes.searchIcon}>
        <SearchIcon color="action" onClick={onSearchClick} />
      </div>
    </div>
  )
}

export default SearchInput
