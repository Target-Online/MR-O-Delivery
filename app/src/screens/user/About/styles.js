import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '@constants'
import { iPhoneLarge } from '@utils/screenSize'


const tinyBorder = {
  borderColor : Colors.textGrey,
  borderWidth:1
}
const noBorder = {
  borderWidth :0
}
const styles = StyleSheet.create({
  bottomButtonBar:{
    alignItems :'center' , backgroundColor : Colors.focusColor ,
    bottom :0, flexDirection:'row', 
    flex:1 ,
    height: iPhoneLarge ? 74 : 56, justifyContent : 'space-between' , paddingHorizontal : Metrics.base * 2,
    position: 'absolute',width : '100%' ,
    zIndex :1 
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop : 42,
    width:'100%'
  },

  modalWrapper:{
    alignItems : 'center' ,
    backgroundColor : Colors.focusColor,
    borderTopLeftRadius : Metrics.base * 3,
    borderTopRightRadius : Metrics.base * 3,flex:1 , marginTop: Metrics.base * 2,
    paddingTop: Metrics.base
  },

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
  },
  tittleWrapper: {
    flexDirection :'row' , justifyContent : 'space-between',marginBottom : Metrics.base * 4.5,
    paddingHorizontal: Metrics.base * 3,
    width:'100%'
  }

})

export default styles
