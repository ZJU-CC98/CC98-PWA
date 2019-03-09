import { Theme } from '@/muiStyled'
import { useTheme } from '@material-ui/styles'

export default function usePalette() {
  const theme = useTheme<Theme>()

  return theme.palette
}
