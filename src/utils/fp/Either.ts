interface Either<Left = {
  status: number,
  msg: string,
}, Right = any> {
  Left: Left
  Right: Right
}
