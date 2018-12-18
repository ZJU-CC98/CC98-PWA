import React from 'react'

import { EditorContainer } from '../EditorContainer'
import styled from 'styled-components'

import { GridList, Paper } from '@material-ui/core'

interface Props {
  editor: EditorContainer
}
const SquareDiv = styled.div`
  padding-bottom: 16% !important;
  height: 0px !important;
`
const Root = styled(Paper)`
  box-shadow: 0px 0px 0px 0px !important;
`
const SquareGridList = styled(GridList).attrs({
  cols: 6,
})`
  && {
    height: 150px;
  }
`
const SquareImg = styled.img`
  width: 100% !important;
`
const acfunEmo = [
  { url: '/ac/01.png', value: 'ac01' },
  { url: '/ac/02.png', value: 'ac02' },
  { url: '/ac/03.png', value: 'ac03' },
  { url: '/ac/04.png', value: 'ac04' },
  { url: '/ac/05.png', value: 'ac05' },
  { url: '/ac/06.png', value: 'ac06' },
  { url: '/ac/07.png', value: 'ac07' },
  { url: '/ac/08.png', value: 'ac08' },
  { url: '/ac/09.png', value: 'ac09' },
  { url: '/ac/10.png', value: 'ac10' },
  { url: '/ac/11.png', value: 'ac11' },
  { url: '/ac/12.png', value: 'ac12' },
  { url: '/ac/13.png', value: 'ac13' },
  { url: '/ac/14.png', value: 'ac14' },
  { url: '/ac/15.png', value: 'ac15' },
  { url: '/ac/16.png', value: 'ac16' },
  { url: '/ac/17.png', value: 'ac17' },
  { url: '/ac/18.png', value: 'ac18' },
  { url: '/ac/19.png', value: 'ac19' },
  { url: '/ac/20.png', value: 'ac20' },
  { url: '/ac/21.png', value: 'ac21' },
  { url: '/ac/22.png', value: 'ac22' },
]
const acBaseUrl = 'https://www.cc98.org/static/images'
const tileData = acfunEmo.map(k => ({
  url: acBaseUrl + k.url,
  value: k.value,
}))
export default ({ editor }: Props) => (
  <Root>
    <SquareGridList>
      {tileData.map(tile => (
        <SquareDiv>
          <SquareImg
            src={tile.url}
            key={tile.value}
            alt={tile.value}
            onClick={e => editor.appendMainContent(`[${tile.value}]`)}
          />
        </SquareDiv>
      ))}
    </SquareGridList>
  </Root>
)
