import { NativeBase, Picker } from 'native-base';
import * as React from 'react';
import { PickerItemProps, TextStyle,TouchableHighlight, View, Modal, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'
import * as Animatable from "react-native-animatable"
import { Colors } from '../../constants';
import { IAppContextProps, AppContext, withAppContext } from '../../AppContext';
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

type IProps = IAlertProps & {  context : IAppContextProps}
const AlertModal  : React.SFC<IProps>  = (props) => {

        const {user,setUser,login , register, setAlertData, alertBoxData, setShowAlert,showAlert }  = props.context
        const {text,title,buttons}  = alertBoxData 
        // const hideAlert = () => { setShowAlert(false)}


        return (
            <Modal 
                visible={showAlert}
                transparent
                animationType="fade"
                animated
            >

                <View style={{ backgroundColor : "rgba(33,44,54,0.9)", flex : 1,alignItems: "center", justifyContent : "center" }}>
                    <Animatable.View duration={300} easing="ease-in" animation="fadeIn" style={styles.dialogContainer} >
                        <TouchableHighlight
                            underlayColor={"#DFE3E8"}
                            onPress={()=> setShowAlert(false)}
                            style={styles.closeIcon}                        
                        >
                            <Icon  name="close" style={{fontSize : 24}} />

                        </TouchableHighlight>
                        <Text style={[styles.btnText,styles.title]}>
                            {title}
                        </Text>
                        <Text numberOfLines={6} style={[styles.btnText,{textAlign :"center"}]} >
                            {text}
                        </Text>
                        <View style={styles.btnsWrapper}>
                            {buttons && buttons.map(({label,onPress})=> (
                                <TouchableHighlight
                                    // rippleSize={290}
                                    underlayColor={"#DFE3E8"}
                                    onPress={()=>{ 
                                        onPress && onPress()
                                        hideAlert()
                                    }}
                                    style={styles.buttonStyle}                           
                                >
                                    <Text style={[styles.btnText,{color : "#fff"}]}>{label}</Text>    
                                </TouchableHighlight>
                            ))}
                        </View> 
                     </Animatable.View>

                </View>
            </Modal>       
        );
}



const styles = StyleSheet.create({
    wrapper : {
      color:"black",
      fontSize: 20,
      lineHeight: 20
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
        width : 200 ,height : 48,marginTop: 4,
        borderRadius : 3  ,backgroundColor: Colors.primaryOrange , 
        alignSelf : "center",alignItems : "center",justifyContent : "center"
    },
    dialogContainer : { 
        width : 300,height : 300 ,
        backgroundColor : "#fff" , borderRadius : 6,
        justifyContent : "center",
        padding : 16
    },
    title : {
       fontSize : 16,
        textAlign :"center",alignSelf : "center", 
        position : "absolute", top : 36
    },
    btnText:{
        color:"#454F5B",
        fontSize :14
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


export default withAppContext(AlertModal)





