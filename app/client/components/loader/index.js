
import React from 'react';
import {  Modal, StyleSheet,Text,
  TouchableOpacity as Btn,View,Dimensions, 
} from 'react-native';
import PhoneIcon from '../../../assets/icons/PhoneIcon';
const Pulse = require('react-native-pulse').default

const shadow =  {
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      height: 2
    },
    elevation: 10
  }


class Loader extends React.Component {
  
    render(){

      const { visible,text } = this.props

      return(
        <Modal 
          animated
          key="mod"
          animationType="slide"
          visible={visible}
        //   onRequestClose={()=> onRequestClose && onRequestClose()}
        >
          <View style={{width : "100%",flex :1}}>  
                <Pulse style={{position : "absolute", top : 100}} color='#F57301' numPulses={3} diameter={width-48} speed={5} duration={500} />
                <View style={{position : "absolute", top : 230,alignSelf : "center"}}>
                    <PhoneIcon />
                </View>

                <View style={{width : "100%" ,position:"absolute", bottom : 48 ,height : 180,justifyContent : "space-between", 
                    alignItems : "center", }}>
                  <Text>{text}</Text>
                  {/* <Btn style={{width : 160 , height : 36, borderColor : '#F57301', borderRadius : 3,
                    justifyContent : "center", alignItems: "center" , borderWidth : 1, alignSelf: "center" }}>
                    <Text style={{fontSize : 12, color : '#F57301'}} > 
                      Cancel 
                    </Text>
 
                  </Btn> */}

                </View>
          </View>
        </Modal>
      )
    }
};

export default Loader

const styles = StyleSheet.create({
    activeTextStyle:{
        color : 'red'
    },
    backBtnStyle:{
      alignSelf : "flex-start",
      width : 30,height: 30
    },
    addressResultsItem : { 
      height :  54, borderBottomColor : "rgba(0,0,0,0.09)", 
      borderBottomWidth :  0.5, flexDirection : "row",
      alignItems : "center",
    },
    addressInputWrapper: { 
      height : 38, flex :0, 
      backgroundColor : "rgba(0,0,0,0.04)",
      borderRadius : 2  ,paddingVertical : 0
    },
    addressInput : { 
      flex : 1 ,
      fontSize :  14, height: "100%",
      textAlignVertical : "center"
    },
    textAreaStyles:{
      flex : 1, height : 243, borderRadius : 8,paddingVertical: 16,
      flexDirection : "row",backgroundColor : "rgba(0,0,0,0.035)",
      alignItems:"center" ,borderWidth : 2, borderColor: "#f9f9f9", 
      paddingHorizontal : 16 
    },
    container: {
      flex : 1 ,
      paddingTop : 42,
      backgroundColor : "#FEFEFE", 
      paddingHorizontal : 24,
      paddingVertical : 36,
      alignItems : "center"
    },
    btnStyle:{ 
      width: 250, height: 86,
      borderRadius: 3, ...shadow,
      backgroundColor :"#fff",alignItems : "center",
      justifyContent : "flex-start", 
      flexDirection : "row",
      paddingHorizontal : 24 
    },
    tabStyle : {backgroundColor : 'white'}
  
  })

  