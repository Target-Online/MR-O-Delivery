import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  serviceDescriptionText: {
    marginBottom: 16, textAlign: "center", 
    fontSize: 12, color: "rgba(0,0,0,0.8)"
  },
  targetLogo :{
    height: 40, width: 60
  },
  scrollContent : {
    alignItems : "center", paddingVertical : 42, 
    paddingHorizontal : 24 , flex : 1, 
    backgroundColor : "white"
  },
  title : {
    marginVertical: 8,fontWeight: "bold", 
    fontSize: 14, color: "#000" 
  },
  topLogo : {
    width : 100, height: 62,
    marginBottom : 24
  },
  underline : {
    height : 1, backgroundColor : "grey",
    width : "100%"
  },
  tabStyle: { backgroundColor: 'white' }
})


export default styles
