import React from 'react'
import { css } from 'emotion'

import bg9 from '@/assets/bg9.png'
import LayoutCenter from '@/components/LayoutCenter'
import basicInstance from '@/model/basicInstance'
import { Button, Typography } from '@material-ui/core'

const img = css`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  background-image: url(${bg9});
  background-size: cover;
`

const button = css`
  && {
    transform: translateY(30px);
  }
`

const text = css`
  && {
    /* variant h6 */
    font-size: 1.25rem;
    font-weight: normal;
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
