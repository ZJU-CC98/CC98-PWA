import styled from 'styled-components'

import vpn from '@/assets/vpn.jpg'

const Img = styled.img`
  width: 100%;
`
export default () => (
  <div>
    <Img src={vpn} />
  </div>
)
