import React from 'react'

import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core'

import {
  Menu
} from '@material-ui/icons'

const styles: StyleRules = {
  root: {
    flexGrow: 1
  },
  title: {
    flex: 1,
    fontSize: 14,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

interface Props {
  text: string
  buttonText: string
  clickHandle?: () => void
}

interface State {

}

class TopBar extends React.Component<Props & WithStyles, State> {

  render() {
    const { classes } = this.props

    return (
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit">
            <Menu onClick={() => history.back()}/>
          </IconButton>
          <Typography className={classes.title} color="inherit">
            { this.props.text }
          </Typography>
          <Button size="small"
            color="inherit"
            onClick={ _ => this.props.clickHandle && this.props.clickHandle() }
          >{ this.props.buttonText }</Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)<Props>(TopBar)
