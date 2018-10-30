import { InputBase } from '@material-ui/core'
import { StyleRules, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import React from 'react'
interface Props {
  replyMode?: boolean | null,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const styles: StyleRules = {
  inputMultiline: {
    minHeight: '200px',
  },
  replyInputMultiline: {
    minHeight: '200px',
    maxHeight: '200px',
  },
}
const baseInputStyle = {
  padding: '15px 15px 0px 15px',
  backgroundColor: 'white',
  marginTop:'5px',
}

export default withStyles(styles)(
class extends React.PureComponent<Props & { classes: ClassNameMap }> {
  render() {
    const { replyMode, classes, onChange } = this.props

    return(
      <InputBase
        fullWidth={true}
        placeholder="说些什么呢...."
        multiline
        style={baseInputStyle}
        classes={replyMode ?
                { inputMultiline: classes.replyInputMultiline }
                : { inputMultiline: classes.inputMultiline }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e)
        }}
      />
    )
  }
}
)
