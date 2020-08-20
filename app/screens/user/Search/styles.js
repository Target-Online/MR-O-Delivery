import { StyleSheet } from 'react-native'
import { Metrics , Colors } from '../../../constants'

const tinyBorder = {
  borderColor : Colors.textGrey,
  borderWidth:1
}
const noBorder = {
  borderWidth :0
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop : Metrics.base * 5.25
  }
  ,
  normalizeButton:{
    alignItems: 'center',
    backgroundColor :  Colors.transparent,
    borderRadius : Metrics.base * 2,
    height : Metrics.base * 4 ,
    justifyContent: 'center',
    width : Metrics.base * 26.625,
    ...tinyBorder   
  },

  normalizeButtonON:{
    backgroundColor : Colors.secondayGreen ,
    ...noBorder   
  },
  textInput:{
    alignItems: 'flex-start',
    alignSelf : 'center',
    backgroundColor :  Colors.transparent,
    borderRadius : Metrics.base * 2.75,
    height : Metrics.base * 5.5,
    justifyContent: 'center' ,
    marginVertical: Metrics.base * 3,
    paddingHorizontal : 20,
    width :  Metrics.window.width - Metrics.base * 4,
    //marginHorizontal : Metrics.base *2,
    ...tinyBorder   
  },
  range:{
    alignItems : 'center', 
    backgroundColor:Colors.transparent,
    borderRadius: Metrics.base * 2 ,
    height: Metrics.base * 4,
    justifyContent: 'center' ,
    width: Metrics.base * 7,
    ...tinyBorder
  },
  rangeSelected :{
    backgroundColor:Colors.secondayGreen, 
    ...noBorder
  }


})

export default styles
