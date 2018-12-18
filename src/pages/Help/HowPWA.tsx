import React from 'react'
import styled from 'styled-components'

import pwa from '@/assets/pwa.jpg'

const Img = styled.img`
  width: 100%;
`
export default () => (
  <div>
    <Img src={pwa} />
  </div>
)
