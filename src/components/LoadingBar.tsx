import React from 'react'

import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles'

import LinearProgress from '@material-ui/core/LinearProgress'


const styles: StyleRules = {
  root: {
    flexGrow: 1,
  },
}

interface Props {

}

interface State {

}

class LoadingBar extends React.Component<Props & WithStyles, State> {

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    )
  }
}

export default withStyles(styles)<Props>(LoadingBar)
