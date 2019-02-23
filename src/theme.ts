import { createMuiTheme } from '@material-ui/core/styles'

import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'

export const dark = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    type: 'dark',
  },
})

export const light = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
})
