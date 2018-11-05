import asuka from '@/assets/asuka.jpg'
import bg9 from '@/assets/bg9.jpg'

const Time = parseInt(Date.now().toString(), 10)
export let Background = ''
export let HomeText = ''
switch (Time % 2) {
  case 0:
    Background = asuka
    HomeText = 'Asuka の CC98'
    break
  case 1:
    Background = bg9
    HomeText = '琪露诺 の CC98'
    break
}
