import { StyleSheet } from 'react-native'
import { Colors } from '../../../constants'

const styles = StyleSheet.create({
  activeTextStyle:{
      color : 'red'
  },
  parcelDetailsWrapper : {
    flexDirection : "row", height: 56, 
    width : "100%",alignItems : "center"
  },
  customerCard : {
    borderBottomWidth : 0.75 , borderBottomColor : Colors.overlayDark10,
    flexDirection : "row" , height : 74,
    alignItems : "center", width: "100%"
  },
  headShot : {
    width : 40, height : 40, 
    borderRadius : 20, backgroundColor : Colors.overlayDark10,
    marginRight: 12
  },
  switchWrapper : {
    flexDirection : "row", justifyContent: "flex-end",
    width : "100%" , alignItems : "center",
    paddingHorizontal : 24 ,position: "absolute",
    top :24
  },
  displayName : {
    fontSize : 20, fontWeight : "700", 
    color : "#fff",alignSelf : "flex-start" 
  },
  topHeaderWrapper : {
    width : "100%",justifyContent:"flex-end",
    alignItems : "flex-start",height: "35%",
    paddingHorizontal : 24,paddingBottom : 32
  },
  customerHeader : {
    fontSize : 11,
    color : "#878787",
  },
  displayPic : {
    borderRadius : 20 , height : 40,
    width:  40
  },
  imgWrapper : {
    width : 40,height: 40, 
    borderRadius : 20,backgroundColor : "grey", 
    borderWidth : 0.75, borderColor : "#fff",marginBottom : 12
  },
  switchLabel : {
    fontSize : 16, fontWeight : "bold",
    marginRight : 16 
  },
  welcomeText : {
    fontSize : 16, fontWeight : "400",
    color : "#fff",alignSelf : "flex-start" 
  },
  routeSummaryRow :{ 
    height: 122,flexDirection : "row", 
    alignItems : "center", justifyContent :"flex-start",
    paddingVertical : 8 
  },
  addMockOrder : {
    width : 120,height:46 ,
    justifyContent : "center" , alignItems : "center",
    backgroundColor : Colors.primaryOrange , 
    borderRadius :3
  },
  newReqInnerContainer : { 
    height: 70, flexDirection : "row", 
    justifyContent :"flex-start",
    backgroundColor : "#fff",
    paddingVertical : 8 
  },
})

export default styles