import * as React from 'react';
import { PickerItemProps, TextStyle,TouchableHighlight, View, Modal, Text, StyleProp, ViewStyle, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import * as Animatable from "react-native-animatable"
import { Colors } from '../../constants';
import {  withAppContext } from '../../AppContext';
import OfflineIcon from '../../assets/icons/OfflineIcon'

const { width } = Dimensions.get('window')
interface IBtn {
    label : string;
    onPress : () =>void
}
export interface IAlertProps {
  text: string;
  buttons : IBtn[],
  onClose ?: () => void;
  title : string;
  children?: React.ReactNode ;
}

type IProps = {
    isActive : boolean;
}
const Inactive  : React.SFC<IProps>  = (props) => {

    const { isActive } = props

    return (
        <Modal 
            visible={!isActive}
            transparent
            animationType="fade"
        >
            <View style={styles.wrapper}>
                <Animatable.View duration={300} easing="ease-in" animation="fadeIn" style={styles.dialogContainer} >
                    <OfflineIcon />
                    <Text numberOfLines={6} style={[styles.btnText,{textAlign :"center",marginVertical :24}]} >
                        {"You profile is inactive.\nPlease contact the admin regarding the matter."}
                    </Text>           
                </Animatable.View>
            </View>
        </Modal>       
    );
}

const styles = StyleSheet.create({
    wrapper : { 
        backgroundColor : "rgba(33,44,54,0.9)", 
        flex : 1,alignItems: "center", 
        justifyContent : "center" 
    },
    closeIcon : {
        width : 50 ,height : 50,
        borderRadius : 25 , position: "absolute" ,
        top: 4,right: 4,alignItems : "center",justifyContent : "center"
    },
    btnsWrapper: {
        width : "100%", position  : "absolute",
        bottom : 16, justifyContent:"flex-end",
        alignSelf : "center"
    },
    buttonStyle:{
        width : 200 ,height : 42,marginTop: 4,
        borderRadius : 3  ,backgroundColor: Colors.primaryOrange , 
        alignSelf : "center",alignItems : "center",justifyContent : "center"
    },
    dialogContainer : { 
        width : width*0.9 ,height : 300 ,
        backgroundColor : "#fff" , borderRadius : 6,
        justifyContent : "center",
        padding : 16, alignItems : "center"
    },
    title : {
        fontSize : 16,fontWeight: "700",
        textAlign :"center",alignSelf : "center", 
        position : "absolute", top : 36
    },
    btnText:{
        color:"#454F5B",
        fontSize :14,

    },
    textBold : {
      fontSize :14
  },
  searchBarWrapper: {
      width : "60%",
      flex : 1,
      alignSelf : "center",
      alignItems : "center",
      flexDirection : "row",
      backgroundColor : "rgba(0,0,0,0.1)",
      borderRadius :24,
      paddingHorizontal : 16,
      marginRight : 6
  },
});


export default withAppContext(Inactive)





