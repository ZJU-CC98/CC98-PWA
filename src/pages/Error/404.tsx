import React from 'react'
import { css } from 'emotion'

import img404 from '@/assets/404.png'

import LayoutCenter from '@/components/LayoutCenter'
import history from '@/utils/history'

const img = css`
  width: 60%;
`

const Page404: React.SFC = () => (
  <LayoutCenter>
    <img className={img}
      src={img404} alt="404"
      onClick={() => {history.goBack()}}
    />
  </LayoutCenter>
)


export default Page404

// TODO:  彩蛋：戳樱桃 - “哥哥不要这样啦~”
