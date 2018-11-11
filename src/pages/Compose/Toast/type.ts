export interface ToastData {
  content: string
  duration?: number
  onClose?: () => void
}
export interface NotifFnData {
  type: 'success' | 'error' | 'loading' | 'info'
  content: string
  duration?: number
  onClose?: () => void
}
