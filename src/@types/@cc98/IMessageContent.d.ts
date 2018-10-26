/**
 * @author dongyansong
 * @date 2018-10-26
 */
declare module '@cc98/api' {
  export interface IMessageContent {
    id: number
    senderId: number
    receiverId: number
    time: string
    isRead: boolean
    content: string
  }
}
