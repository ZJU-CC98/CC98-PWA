import React from 'react'
import { debounce } from 'lodash-es'

import LoadingCircle from '@/components/LoadingCircle'


type Props = {
  isLoading: boolean
  isEnd: boolean
  callback: (...args: any[]) => any

  children: React.ReactNode
}


class InfinieList extends React.PureComponent<Props, {}> {
  /**
   * 存储 debounce 之后的函数
   */
  bindFunc: () => void
  /**
   * loading 图标 <CircularProgress />
   */
  loadingDom = React.createRef<HTMLDivElement>()

  componentDidMount() {
    const func = () => {
      const { isLoading, isEnd, callback } = this.props
      if (isLoading || isEnd)
        return

      // loadingDom 出现在可视区域
      const distance = this.loadingDom.current
        && (window.innerHeight - this.loadingDom.current.getBoundingClientRect().top)

      if (distance === null || distance < 0)
        return

      callback()
    }

    this.bindFunc = debounce(func, 250)
    window.addEventListener('scroll', this.bindFunc)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.bindFunc)
  }

  render() {
    const { isEnd, children } = this.props

    return (
      <>
        {children}
        {!isEnd && <div ref={this.loadingDom}>
            <LoadingCircle />
          </div>
        }
      </>
    )
  }
}

export default InfinieList
