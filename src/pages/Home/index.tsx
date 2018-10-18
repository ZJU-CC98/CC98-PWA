import React from 'react'
import { css } from 'emotion'

import bg9 from '@/assets/background-9.png'
import LayoutCenter from '@/components/LayoutCenter'
import { Typography } from '@material-ui/core'

const img = css`
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 450px;
  z-index: -1;
  opacity: 0.75;
`

const title = css`
  && {
    color: #333;
    transform: translateY(-20px);
  }
`

const Home: React.SFC = () => (
  <>
    <img className={img}
      src={bg9}
    />
    <LayoutCenter>
      <Typography variant="h5" className={title}>
        琪露诺 の 98 教室
      </Typography>
    </LayoutCenter>
  </>
)

export default Home
