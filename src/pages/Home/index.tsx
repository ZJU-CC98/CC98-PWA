import React from 'react'
import { css } from 'emotion'

import bg9 from '@/assets/background-9.png'
import LayoutCenter from '@/components/LayoutCenter'
import basicInstance from '@/model/basicInstance'
import { Button, Typography } from '@material-ui/core'

const img = css`
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: -1;
  opacity: 0.45;
`

const button = css`
  && {
    transform: translateY(-35px);
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
    <img className={img}
      src={bg9}
    />
    <LayoutCenter>
      <Button className={button}
        variant="outlined"
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
