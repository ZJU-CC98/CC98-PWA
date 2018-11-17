import React from 'react'
import { css } from 'emotion'

import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

import version from '@/version'

const grow = css`
  flex-grow: 1;
`

const icon = css`
  && {
    margin-left: -12px;
    margin-right: 5px;
  }
`

const button = css`
  && {
    margin-right: -12px;
  }
`

interface Props {
  onMenuClick: () => void
}

const TopBar: React.FunctionComponent<Props> = ({ onMenuClick }) => (
  <AppBar position="fixed">
    <Toolbar>
      <IconButton className={icon} color="inherit" onClick={onMenuClick}>
        <MenuIcon />
      </IconButton>

      <Typography className={grow} color="inherit">
        CC98
      </Typography>

      <Button className={button} color="inherit" size="small">
        {version}
      </Button>
    </Toolbar>
  </AppBar>
)

export default TopBar
