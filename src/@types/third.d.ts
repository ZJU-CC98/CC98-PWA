// FIXME:

declare module 'remark'
declare module 'remark-react'
declare module 'dayjs/plugin/relativeTime'
declare module 'dayjs' {
  interface Dayjs {
    fromNow(): () => void
  }
}
