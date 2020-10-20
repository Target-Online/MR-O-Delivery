import * as React from 'react';
import { PickerItemProps, TextStyle,TouchableHighlight, View, Modal, Text, StyleProp, ViewStyle, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import * as Animatable from "react-native-animatable"
import { Colors } from '../../constants';
import {  withAppContext } from '../../AppContext';
import * as Network from 'expo-network';
import { useState } from 'react';
import { useEffect } from 'react';
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

type IProps = {}
const NoConnection  : React.SFC<IProps>  = (props) => {

    const [show, setShow] = useState<boolean>(true)
    const [reload, setReload] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const checkNetwork = async () => {
            
        const netState = await Network.getNetworkStateAsync();
        const {isConnected} = netState

        if(!isConnected){ setShow(true) }
        else{
            setShow(false)
        }
        setLoading(false)
    }

    useEffect(()=>{
        checkNetwork()
    },[reload])
 


        return (
            <Modal 
                visible={show}
                transparent
                animationType="fade"
            >
                <View style={styles.wrapper}>
                    <Animatable.View duration={300} easing="ease-in" animation="fadeIn" style={styles.dialogContainer} >
                        <Text numberOfLines={6} style={[styles.btnText,{textAlign :"center",marginVertical :24}]} >
                            {"No Connection.\nPlease check your network or try again later."}
                        </Text>

                        <TouchableHighlight
                                    // rippleSize={290}
                                    underlayColor={"#DFE3E8"}
                                    onPress={()=>{                
                                        setLoading(true)
                                        setTimeout(()=> { checkNetwork() } , 2000)
                                    }}
                                    style={[styles.buttonStyle]}                           
                                >
                                   {loading ? 
                                            <ActivityIndicator size="small" color={Colors.white} />
                                    :
                                        <Text style={[styles.btnText,{color : "#fff"}]}>{"Reload"}</Text> 
                                    }
                        </TouchableHighlight>
                  
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


export default withAppContext(NoConnection)





