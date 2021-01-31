import { Dimensions, StyleSheet } from 'react-native'
import { Colors , StatusHeight } from '../../../constants'
import shadow from 'utils/shadow';
import { Constants } from 'expo';
const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  activeTextStyle: {
    color: 'red'
  },
  trackOrderTrigger : {
    width: 64, flex: 0, 
    height: 52, borderRadius: 0, 
    backgroundColor: Colors.primaryOrange, 
    paddingHorizontal: 0 
  },
  bgImage : { 
    width: "100%", height: "100%" 
  },
  topBgWrapper :{
    height : 300, width : "90%",alignSelf : "center" 
  },
  trackOrderTitle : { 
    marginBottom: 4, marginTop : 24 
  },
  orderOptButton : { 
    width: width*0.4, height: 200
  },
  trackOrderInput : { 
    flex: 1, height: "100%", 
    paddingHorizontal: 24, 
    paddingVertical: 4 
  },
  trackOrderWrapper:{
    paddingHorizontal :12
  },
  mainWrapper: {
    flex : 1 ,backgroundColor : "#fff",
    marginTop: StatusHeight,
    paddingBottom : 24  
  },
  serviceDescriptionText: {
    marginVertical: 4, textAlign: "center",
    fontSize: 11, color: "#878787"
  },
  requestType: { 
    marginVertical: 8, fontWeight: "500", 
    fontSize: 14, color: "#2B3135" 
  },
  welcomText:{
    fontSize: 20, fontWeight: "700", 
    color: "#fb9011",
    alignSelf: "center" , marginVertical : 24 
  },
  bottomMain:{
     paddingTop: 12, backgroundColor: "#fff",height: "100%", 
     width: "100%", ...shadow, flex : 1,paddingHorizontal : 24,
    alignItems: "center", justifyContent: "space-between", 
    borderTopLeftRadius: 24, borderTopRightRadius: 24 
  },
  orderOpts : { 
    flexDirection: "row", alignItems: "center", 
    width: "100%",
    justifyContent: "space-evenly" 
  },
  container: {
    flex: 1, width: "100%", height: "100%",
    backgroundColor: "#FEFEFE",
    alignItems: "center"
  },
  mainOptsWrapper: { 
    padding: 24, backgroundColor: "#fff", width: "100%",
    height: "65%", ...shadow, alignItems: "center", 
    justifyContent: "space-between", 
    position: "absolute", bottom: 0, borderTopLeftRadius: 24, 
    borderTopRightRadius: 24 
  },
  inputWrapper: {
    width: "100%", height: 54, borderColor: Colors.primaryOrange,
    borderWidth: 1, borderRadius: 8, justifyContent: "space-between",
    flexDirection: "row", alignItems: "center"
  },
  btnStyle: {
    flex: 1,
    height: 86, borderRadius: 8, backgroundColor: "#EDF4F9",
    alignItems: "center", justifyContent: "space-evenly", paddingHorizontal: 24
  }
})

export default styles