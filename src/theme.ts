import { createMuiTheme } from '@material-ui/core/styles'

import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import green from '@material-ui/core/colors/lightGreen'

// https://material.io/tools/color/#!/?view.left=0&view.right=0

export enum ThemeEnum {
  DEFAULT,
  SPRING,
  SUMMER,
  FALL,
  WINTER,
}

export enum ModeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

// default
const blueLight = createMuiTheme({
  palette: {
    primary: {
      main: blue[400],
      contrastText: '#fff',
    },
    secondary: pink,
  },
})

const blueDark = createMuiTheme({
  palette: {
    primary: {
      main: blue[400],
      contrastText: '#fff',
    },
    secondary: pink,
    type: 'dark',
  },
})

// spring
const greenLight = createMuiTheme({
  palette: {
    primary: {
      main: green[300],
    },
    secondary: pink,
  },
})

const greenDark = createMuiTheme({
  palette: {
    primary: {
      main: green[300],
      contrastText: '#fff',
    },
    secondary: pink,
    type: 'dark',
  },
})

const themeMap: {
  [key: string]: {
    [key: string]: ReturnType<typeof createMuiTheme>
  }
} = {
  [ModeEnum.LIGHT]: {
    [ThemeEnum.DEFAULT]: blueLight,
    [ThemeEnum.SPRING]: greenLight,
  },
  [ModeEnum.DARK]: {
    [ThemeEnum.DEFAULT]: blueDark,
    [ThemeEnum.SPRING]: greenDark,
  },
}

/**
 * 根据设置的主题和模式获取 MUI Theme
 */
export function getTheme(theme: ThemeEnum, mode: ModeEnum) {
  return themeMap[mode][theme]
}
