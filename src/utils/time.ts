import Timeago from 'timeago.js'

const timeagoInstance = Timeago()

export function timeago(date: Date | string | number, locale = 'zh_CN') {
  return timeagoInstance.format(date, locale)
}
