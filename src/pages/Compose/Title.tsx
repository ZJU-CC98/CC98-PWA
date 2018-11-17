import React from 'react'

import { TextField } from '@material-ui/core'

const labelStyle = {
  paddingLeft: '15px',
}
const baseInputStyle = {
  padding: '0px 15px 0px 15px',
}

interface Props {
  onChange: (e: string) => void
  label: string
  placeholder: string
  value: string
}
const Title: React.FunctionComponent<Props> = ({ onChange, label, placeholder, value }) => (
  <TextField
    label={label}
    InputLabelProps={{
      style: labelStyle,
    }}
    InputProps={{
      style: baseInputStyle,
    }}
    placeholder={placeholder}
    required
    fullWidth
    value={value}
    onChange={e => {
      onChange(e.target.value)
    }}
    margin="normal"
  />
)
export default Title
