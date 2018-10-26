/**
 * @author dongyansong
 * @date 2018-10-26
 */
declare module '@cc98/api' {
  export interface IMessageContent {
    id: string
    senderId: string
    receiverId: boolean
    time: string
    isRead: boolean
    content: string
  }
}
