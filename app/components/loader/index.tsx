
import React from 'react';
import {  Modal, StyleSheet,Text,TouchableOpacity as Btn,View,Dimensions } from 'react-native';
import PhoneIcon from '../../assets/icons/PhoneIcon';
const Pulse = require('react-native-pulse').default

interface IProps { 
    visible: boolean;
    text : string;
    onCancel : () => void;
}

type Props = IProps;
const {width} = Dimensions.get("window")
interface IState { isModalVisible: boolean; authType:string;}
class Loader extends React.Component<Props, IState> {
  
    render(){
      const { visible,text, onCancel } = this.props

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
                <View style={styles.bottomContainer}>
                  <Text>{text}</Text>
                  <Btn onPress={()=> onCancel && onCancel()} style={styles.cancelBtn}>
                    <Text style={{fontSize : 12, color : '#F57301'}} > 
                      Cancel 
                    </Text>
                  </Btn>
                </View>
          </View>
        </Modal>)
    }
}

export default Loader

const styles = StyleSheet.create({
    cancelBtn : {
      width : 160 , height : 36, 
      borderColor : '#F57301', borderRadius : 3,
      justifyContent : "center", alignItems: "center" ,
      borderWidth : 1, alignSelf: "center" 
    },
    bottomContainer : {
      width : "100%" ,position:"absolute",
      bottom : 48 ,height : 180,
      justifyContent : "space-between", 
      alignItems : "center"
    },
})  