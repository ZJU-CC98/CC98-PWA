// FIXME:

declare module 'remark'
declare module 'remark-react'
declare module 'dayjs/plugin/relativeTime'
declare module 'dayjs' {
  import { Dayjs } from 'dayjs'
  interface Dayjs {
    fromNow(): () => void
  }
}
