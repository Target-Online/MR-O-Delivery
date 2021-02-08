import { StyleSheet } from 'react-native'
import shadow from 'utils/shadow'
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
  bottom : { 
    padding : 24, backgroundColor : "#fff",
    width : "100%", height : "65%", ...shadow , 
    alignItems : "center",justifyContent : "center",
    position : "absolute", bottom : 0, borderTopLeftRadius : 24, 
    borderTopRightRadius: 24
  },
  onOffText:{
    alignSelf : "center",
    textAlign : "center",
    color : "#878787",
    marginVertical : 8,
  },
  serviceDescriptionText: {
    marginVertical :  8,textAlign  :"center",
    fontSize : 12 , color : "#878787" 
  },
  acceptDeclineText : {
    fontSize : 14,
    fontWeight : "bold",
    color : "#fff"
  },
  incomingText : {
    alignSelf : "center", 
    textAlign : "center", 
    fontSize : 16 , fontWeight : "bold",
    color : "red" 
  },
  customerHeader : {
    fontSize : 11,
    color : "#878787",
  },
  paymentMethod : { 
    borderWidth : 1.25 , borderColor : "green", 
    width : 100,height:24,marginVertical:2,
    alignItems : "center",borderRadius : 3, 
    justifyContent : "center" 
  },
  newReqContainer : {
    width : "100%" , minHeight : 400, maxHeight : 560,
    borderRadius : 3, backgroundColor : "#fff",
    paddingTop: 12, paddingHorizontal : 24
  },
  bottomBtnswrapper : { 
    height : 64, width : "100%" ,position : "absolute", 
    bottom : 4 ,paddingHorizontal : 16,
    flexDirection : "row", justifyContent :"center", 
    alignSelf : "center"
  },
  path : { 
    width:1,height:32,borderRadius:4,
    backgroundColor :"rgba(0,0,0,0.5)"
  },
  pickupIconInner : { 
    width:8,height:8,borderRadius:4,
    backgroundColor :"#000" 
  },
  pickupIconOutter : { 
    width:14,height:14,
    justifyContent : "center",alignItems : "center",
    borderRadius: 7, borderWidth : 1,
    backgroundColor : "#fff", 
    borderColor :"#000" 
  },
  routePath : {
    width:  14,marginRight : 8,
    justifyContent:"space-between",
    paddingVertical:10 ,
    alignItems: "center"
  },
  modalInnerContainer : { 
    width : "100%",height: "100%",
    paddingHorizontal : 16, backgroundColor : "rgba(0,0,0,0.3)", 
    justifyContent: "center",paddingBottom : 46
  },
  container: {
    flex : 1 , width : "100%", height : "100%",
    backgroundColor : "#FEFEFE", 
    alignItems : "center"
  },
  addressesWrapper : {flex : 1, height : 122, justifyContent : "space-evenly"},
  inputWrapper :{ 
    width: "100%" , height : 54 , borderColor : Colors.primaryOrange ,
    borderWidth : 1,borderRadius : 8,justifyContent : "space-between" ,
    flexDirection : "row",alignItems : "center"
  },
  btnStyle:{ 
        height: 46,borderRadius: 4, backgroundColor :"#EDF4F9",width : 150,
        alignItems : "center",justifyContent : "center",paddingHorizontal : 24 
  },
  tabStyle : {backgroundColor : 'white'},
  orderSummary: {
    marginTop : 46, height: 180,
    width: "88%",borderRadius: 3, 
    justifyContent : "space-between", backgroundColor : "#fff", 
    padding : 24
  },
  addressInputWrapper: { 
    height : 38, flex :0, 
    backgroundColor : "rgba(0,0,0,0.04)",
    borderRadius : 2  ,paddingVertical : 0
  },
  addressInput : { 
    fontSize :  10,
  },
  textAreaStyles:{
    height : 56, borderRadius : 2,
    borderWidth : 1, borderColor: "#f9f9f9",paddingVertical:2,
    paddingHorizontal : 12, justifyContent : "center" 
  },

})



export default styles