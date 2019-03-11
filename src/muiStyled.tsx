import React from 'react'
import { styled } from '@material-ui/styles'
import { CSSProperties, WithStylesOptions } from '@material-ui/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
export { Theme }

export default function muiStyled<Props>(Component: React.ComponentType<Props> | React.ReactType) {
  function styledCreator(
    styles: CSSProperties | ((theme: { theme: Theme }) => CSSProperties),
    options?: WithStylesOptions
  ) {
    // 强制保留原组件类型，对类型提示有帮助
    return styled(Component)(styles, options) as React.ComponentType<Props>
  }

  // 参考 styled-components 的 api
  styledCreator.attrs = (attrs: Props) =>
    muiStyled((props: Props) => <Component {...attrs} {...props} />)

  return styledCreator
}
