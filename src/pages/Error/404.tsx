import { css } from 'emotion'
import React from 'react'

import img404 from '@/assets/404.png'

import LayoutCenter from '@/components/LayoutCenter'

import { goback } from '@/utils/history'

const img = css`
  width: 60%;
  max-width: 600px;
`

const Page404: React.FunctionComponent = () => (
  <LayoutCenter>
    <img className={img} src={img404} alt="404" onClick={goback} />
  </LayoutCenter>
)

export default Page404

// TODO:  彩蛋：戳樱桃 - “哥哥不要这样啦~”
