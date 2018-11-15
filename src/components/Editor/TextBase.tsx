import { InputBase } from '@material-ui/core'

import React from 'react'
interface Props {
  onChange: (newContent: string) => void
  content: string
}

// const styles: StyleRules = {
//   inputMultiline: {
//     minHeight: '200px',
//   },
//   replyInputMultiline: {
//     minHeight: '200px',
//     maxHeight: '200px',
//   },
// }
const baseInputStyle = {
  padding: '15px 15px 0px 15px',
  backgroundColor: 'white',
  marginTop: '5px',
}
const darkInputStyle = {
  padding: '15px 15px 0px 15px',
  backgroundColor: '#424242',
  marginTop: '5px',
}

const TextBase: React.FunctionComponent<Props> = props => (
  <InputBase
    fullWidth={true}
    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      props.onChange(e.target.value)
    }}
    value={props.content}
    placeholder="说些什么呢...."
    multiline
  />
)

export default TextBase
