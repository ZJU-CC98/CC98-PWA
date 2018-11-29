import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import LoadingCircle from '@/components/LoadingCircle'

import { debounce } from 'lodash-es'
import { bindURL } from '@/router'

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

interface Props {
  /**
   * 列表正在加载中，回调不会重复触发
   */
  isLoading: boolean
  /**
   * 列表已加载完成，不需要再触发回调
   */
  isEnd: boolean
  /**
   * 列表底部 loading 出现的回调
   */
  // tslint:disable-next-line
  callback: Function
  /**
   * loadingCircle 的位置
   */
  loadingPosition?: 'top' | 'bottom'
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
        // loadingDom 出现在可视区域
        const distance =
          loadingDom.current && window.innerHeight - loadingDom.current.getBoundingClientRect().top
        if (distance === null || distance < 0) {
          return
        }

        callback()
      }, window.location.href),

      250
    )
    window.addEventListener('scroll', bindFunc)

    return () => {
      window.removeEventListener('scroll', bindFunc)
    }
  }, [])

  const { isEnd, loadingPosition = 'bottom', children } = props

  const Loading = isEnd ? null : (
    <div ref={loadingDom}>
      <LoadingCircle />
    </div>
  )

  return (
    <WrapperDiv>
      {loadingPosition === 'top' && Loading}
      {children}
      {loadingPosition === 'bottom' && Loading}
    </WrapperDiv>
  )
}

export default InfiniteList
