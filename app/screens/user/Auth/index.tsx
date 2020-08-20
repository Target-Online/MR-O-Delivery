
import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity as Btn,View,
  Text,StatusBar,
} from 'react-native';
import { Container,Button, Header, Tab, Tabs, ScrollableTab } from 'native-base'
import images from '../../../assets/images'
import { Image } from '../../../components';
import { Colors } from '../../../constants';
import Icon from 'react-native-vector-icons/EvilIcons'
import SignUp from './SignUp';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import AlertModal from '../../../components/AlertModal';
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';


interface IProps {
  title?: string;
  signIn() : () => void;
}

type Props = IProps & StackScreenProps<{navigation : any}>;

interface IState {
  isModalVisible: boolean;
  authType:string;
}
class Auth extends React.Component<Props, IState> {
  
    state = {
      isModalVisible : false,
      authType: "login"
    }

    closeModal = () =>{
      this.setState({isModalVisible : false})
    }

    onForgotPassword = () => {
      this.setState({authType : "forgot"})
    }

    renderAuthModal(){

      const {isModalVisible , authType} = this.state
      return(
        <Modal 
          animated
          key="mod"
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={()=> this.closeModal()}
        >
          <View style={{width : "100%",flex :1}}>
            <View style={{width : "100%" , alignItems : "flex-end",paddingTop: 36, paddingHorizontal : 24}}>
              <Btn onPress={()=> this.closeModal()}>
                <Icon name="close" color="#000" style={{fontSize : 24, fontWeight : "100"}} size={24} />
              </Btn>
            </View>
            <View style={{flex :1}}>
            {
              authType === "register" ? 
              <SignUp  signIn={this.props.signIn} /> : 
              ( authType === "forgot" ?  <ForgotPassword onCancel={()=> { this.setState({authType : "login"})}} /> :
                  <SignIn onRegister={()=> this.openModal("register")}  onForgotPassword={this.onForgotPassword} signIn={this.props.signIn} /> 
              )
            }
            </View>

          </View>
        </Modal>
      )
    }

    openModal(authType : string){
        this.setState({authType, isModalVisible : true})
    }

    render(){
      const { navigation : {navigate}} = this.props
        return (
            <View key="main" style={styles.container} >

              <StatusBar barStyle="dark-content" />    
              <Image width={150} height={150} resizeMode="contain" source={images.logo}/>

              <View style={{width : "100%",flexDirection : "row",justifyContent:"space-between"}}>
                  <Btn
                      onPress={()=> {
                          navigate("SignIn",{type : "user"})
                      }}
                       style={[styles.btnStyle, {borderColor : "#fff"}]} >
                      <Text style={{color:"#fff", fontSize : 12 }} >User login</Text>
                  </Btn>

                  <Btn
                    onPress={()=> {
                      navigate("SignIn",{type : "driver"})
                    }}
                    style={styles.btnStyle} >
                    <Text style={{color:"#fff", fontSize : 12 }} >Driver login</Text>
                  </Btn>
              </View>

              <View style={{width:"100%", flexDirection:"row", height:32 ,justifyContent:"center", marginTop : 12}} >
                  <Text style={{fontSize : 13, fontWeight : "600" }} >
                      Don't have an account?
                  </Text>
                  <Btn 
                    onPress={()=> navigate("SignUp",{type : "user"})} 
                    style={{}} 
                  >  
                    <Text style={{fontSize : 13, fontWeight : "600", color:"#2c59e0",marginLeft: 2}} >
                      Register
                    </Text>
                  </Btn>   
              </View>  
              
            </View>
        )
    }

};

export default Auth;




const styles = StyleSheet.create({
    activeTextStyle:{
        color : 'red'
    },
    container: {
      flex : 1 , width : "100%", 
      paddingTop : 62,
      height : "100%",
      backgroundColor : "#FEFEFE", 
      paddingHorizontal : 24,
      paddingVertical : 36,
      justifyContent : "space-between",
      alignItems : "center"
    },
    btnStyle:{
      width :  "45%", justifyContent : 'center', 
      alignItems : 'center', borderWidth : 1, 
      height: 46, borderColor : "#fff",
      backgroundColor : Colors.primaryOrange,
      borderRadius: 4, marginTop : 30
    },
    tabStyle : {backgroundColor : 'white'}
  
  })