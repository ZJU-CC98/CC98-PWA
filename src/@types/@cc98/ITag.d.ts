declare module '@cc98/api' {
  export interface ITag {
    layer: number
    tags: Array<{
      name: string
      id: number
    }>
  }
}
