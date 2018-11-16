import { PUT } from '@/utils/fetch'

export function rate(id: number, value: number, reason: string) {
  const url = `/post/${id}/rating`

  return PUT(url, {
    params: {
      value,
      reason,
    },
  })
}
