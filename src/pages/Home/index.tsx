import React from 'react'
import { css } from 'emotion'

import bg9 from '@/assets/bg9.jpg'
import LayoutCenter from '@/components/LayoutCenter'
import basicInstance from '@/model/basicInstance'
import { Button, Typography } from '@material-ui/core'

const img = css`
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(${bg9});
  background-size: cover;
  opacity: 0.85;
`

const button = css`
  && {
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(30px);
  }
`

const text = css`
  && {
    /* variant h6 */
    font-size: 1.25rem;
    font-weight: normal;
    color: #ddd;
  }
`


const Home: React.SFC = () => (
  <>
    <div className={img} />
    <LayoutCenter>
      <Button className={button}
        variant="outlined"
        disableRipple
        onClick={() => basicInstance.OpenDrawer()}
      >
        <Typography className={text}>
          琪露诺 の CC98
        </Typography>
      </Button>
    </LayoutCenter>
  </>
)

export default Home
