interface T {
  name: string
  id: number
}
export default function (tags: T[], id: number) {
  for (const t of tags) {
    if (t.id === id) return t.name
  }

  return '未找到标签'
}
