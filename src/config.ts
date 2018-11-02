import asuka from '@/assets/asuka.jpg'
import bg9 from '@/assets/bg9.jpg'
import megumi from '@/assets/megumi.jpg'

export const notExpandedBoards = [2, 29, 33, 35, 37, 604]

const Time = parseInt(Date.now().toString(), 10)
export let Background = ''

switch (Time % 3) {
  case 0: Background = megumi
    break
  case 1: Background = asuka
    break
  case 2: Background = bg9
    break
}
