import { FetchError } from '../../utils/fetch'
import { navigate } from '@/utils/history'

export const notificationHandler = () => {}

export const navigateHandler = (err: FetchError) => {
  if (err.status === 400) {
    navigate('/error/400')
  } else if (err.status === 401) {
    navigate('/error/401')
  } else if (err.status === 403) {
    navigate('/error/403')
  } else if (err.status === 404) {
    navigate('/error/404')
  } else if (err.status === 500 || err.status === 502 || err.status === 503) {
    navigate('/error/500')
  }
}

export const loginHandler = (err: FetchError) => {}
