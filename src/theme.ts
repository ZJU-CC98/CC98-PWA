import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeOptions, Theme } from '@material-ui/core/styles/createMuiTheme'

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
  LIGHT,
  DARK,
}

// default
const blueLight: ThemeOptions = {
  palette: {
    primary: {
      main: blue[400],
      contrastText: '#fff',
    },
    secondary: pink,
  },
}

const blueDark: ThemeOptions = {
  palette: {
    primary: {
      main: blue[400],
      contrastText: '#fff',
    },
    secondary: pink,
    type: 'dark',
  },
}

// spring
const greenLight: ThemeOptions = {
  palette: {
    primary: {
      main: green[300],
    },
    secondary: pink,
  },
}

const greenDark: ThemeOptions = {
  palette: {
    primary: {
      main: green[300],
      contrastText: '#fff',
    },
    secondary: pink,
    type: 'dark',
  },
}

const themeMap: {
  [key: string]: {
    [key: string]: ThemeOptions
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
 * 获取主题
 */
function _getTheme(theme: ThemeEnum, mode: ModeEnum): ThemeOptions {
  const safeMode = ModeEnum[mode] ? mode : ModeEnum.LIGHT
  const safeTheme = ThemeEnum[theme] ? theme : ThemeEnum.DEFAULT

  return themeMap[safeMode][safeTheme]
}

/**
 * 根据设置的主题和模式获取 MUI Theme
 */
export function getTheme(themeColor: ThemeEnum, mode: ModeEnum) {
  const theme = {
    ..._getTheme(themeColor, mode),
  }

  return createMuiTheme(theme)
}
