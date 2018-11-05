declare module '@cc98/api' {
  export interface ITag {
    layer: number
    tags: { name: string, id: number }[]
  }
}
