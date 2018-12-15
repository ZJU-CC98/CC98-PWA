import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import LoadingCircle from '@/components/LoadingCircle'

import { debounce } from 'lodash-es'

// TODO: move to utils
import { bindURL } from '@/router'

const WrapperDiv = styled.div<{
  reverse: boolean
}>`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'column-reverse' : 'column')};
  width: 100%;
`

interface Props {
  /**
   * 新数据加载中，回调不会重复触发
   */
  isLoading: boolean
  /**
   * 已全部加载完成，不需要再触发回调
   */
  isEnd: boolean
  /**
   * 列表底部 loading 出现的回调
   */
  // tslint:disable-next-line
  callback: Function
  /**
   * 是否翻转（包括数据和 Loading 位置）
   */
  reverse?: boolean
}

const InfiniteList: React.FunctionComponent<Props> = props => {
  const loadingDom = useRef<HTMLDivElement>(null)
  // 保证 bindFunc 取到最新的值
  const refProps = useRef(props)

  useEffect(() => {
    refProps.current = props
  })

  useEffect(() => {
    const bindFunc = debounce(
      bindURL(() => {
        const { isEnd, isLoading, callback } = refProps.current
        if (isLoading || isEnd) {
          return
        }
        if (loadingDom.current === null) {
          return
        }

        // loadingDom 出现在可视区域
        const { top, bottom } = loadingDom.current.getBoundingClientRect()
        const inViewport = bottom > 0 && window.innerHeight - top > 0

        if (inViewport) {
          callback()
        }
      }, window.location.href),
      250
    )
    window.addEventListener('scroll', bindFunc)

    return () => {
      window.removeEventListener('scroll', bindFunc)
    }
  }, [])

  const { isEnd, reverse = false, children } = props

  const loading = isEnd ? null : (
    <div ref={loadingDom}>
      <LoadingCircle />
    </div>
  )

  return (
    <WrapperDiv reverse={reverse}>
      {children}
      {loading}
    </WrapperDiv>
  )
}

export default InfiniteList
