import React from 'react'
import muiStyled from '@/muiStyled'

import { Paper } from '@material-ui/core'

const Background = muiStyled(Paper).attrs({
  square: true,
  elevation: 0,
})({
  position: 'fixed',
  width: '200vw',
  height: '100%',
  zIndex: -1,
  transform: 'translateX(-100vw)',
})

// 该占位符高度和 TopBar 保持一致
const Placeholder = muiStyled('div')(({ theme }) => ({
  height: 56,
  backgroundColor: theme.palette.primary.main,
}))

const BackGround: React.FC = ({ children }) => (
  <>
    <Background />
    <Placeholder />
    {children}
  </>
)

export default BackGround
