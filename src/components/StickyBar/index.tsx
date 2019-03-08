import React from 'react'

import { makeStyles } from '@material-ui/styles'

import { Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 56,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    // sticky
    position: 'sticky',
    top: 0,
    zIndex: 1200,
  },
}))

const StickyBar: React.FC = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.wrapper}>{children}</div>
}

export default StickyBar
