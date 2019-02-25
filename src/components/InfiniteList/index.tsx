import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import LoadingCircle from '@/components/LoadingCircle'

import { debounce } from 'lodash-es'
import { bindURL } from '@/router/utils'

const WrapperDiv = styled.div<{
  reverse: boolean
}>`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'column-reverse' : 'column')};
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
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
   * 是否翻转列表（且 Loading 将出现在上面）
   */
  reverse?: boolean
  /**
   * 是否相对一个定高容器滚动（需要组件外层容器定高）
   */
  inFixedContainer?: boolean
}

const InfiniteList: React.FC<Props> = props => {
  const wrapperDom = useRef<HTMLDivElement>(null)
  const loadingDom = useRef<HTMLDivElement>(null)
  // 保证 bindFunc 取到最新的值
  const refProps = useRef(props)

  useEffect(() => {
    refProps.current = props
  })

  useEffect(() => {
    const bindFunc = debounce(
      bindURL(() => {
        const { isEnd, isLoading, callback, inFixedContainer = false } = refProps.current
        if (isLoading || isEnd) {
          return
        }
        if (loadingDom.current === null || wrapperDom.current === null) {
          return
        }

        // 判断 loadingDom 是否出现在容器内部
        let isInViewport: boolean
        const loadingRect = loadingDom.current.getBoundingClientRect()

        if (inFixedContainer) {
          // 相对 wrapperDom
          const wrapperRect = wrapperDom.current.getBoundingClientRect()
          isInViewport =
            loadingRect.top < wrapperRect.bottom && loadingRect.bottom > wrapperRect.top
        } else {
          // 相对 windows
          isInViewport = loadingRect.top < window.innerHeight && loadingRect.bottom > 0
        }

        if (isInViewport) {
          callback()
        }
      }, window.location.href),
      250
    )

    const { inFixedContainer = false } = refProps.current

    if (inFixedContainer) {
      if (!wrapperDom.current) {
        return
      }
      wrapperDom.current.onscroll = bindFunc
    } else {
      window.addEventListener('scroll', bindFunc)

      return () => {
        window.removeEventListener('scroll', bindFunc)
      }
    }
  }, [])

  const { isEnd, reverse = false, children } = props

  return (
    <WrapperDiv ref={wrapperDom} reverse={reverse}>
      {children}
      {!isEnd && (
        <div ref={loadingDom}>
          <LoadingCircle />
        </div>
      )}
    </WrapperDiv>
  )
}

export default InfiniteList
