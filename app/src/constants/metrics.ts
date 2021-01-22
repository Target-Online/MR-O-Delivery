import { Dimensions } from 'react-native'

let base = 8
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default {
  base,
  border: {
    thin: 2,
    thick: 4
  },
  radius: 5,
  navBarHeight: 54,
  size: {
    xs: base / 2,
    s: base,
    m: base * 2,
    l: base * 3,
    xl: base * 4,
    xxl: base * 5
  },
  window: {
    width: windowWidth,
    height: windowHeight,
    heightLessTabBar: windowHeight - base * 6
  }
}
