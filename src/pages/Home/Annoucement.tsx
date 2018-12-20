import React from 'react'
import UBB from '@/UBB'
interface Props {
  content: string
}
export default ({ content }: Props) => <div>{UBB(content)}</div>
