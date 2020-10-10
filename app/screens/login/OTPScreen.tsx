import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions,Image,Text,TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { theme } from 'galio-framework';
import { Images,Colors } from '../../constants';
import { Button,TextInput } from '../../components';
import PhoneIcon from  '../../assets/icons/PhoneIcon'
import { firebaseConfig, verifyPhoneNumber, signInWithCredential } from '../../api/authApi'
import { withAppContext } from "../../AppContext";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');
type StringNo = string | number

const OTPScreen = (props: any) => {
  const recaptchaVerifier = useRef(null);
  const {verificationId, setVerificationId, } = props.context
  const phoneNumber = props.route.params.phoneNumber
  const [verificationCode, setVerificationCode] = useState<string>("")

  console.log({phoneNumber})
  const numberConfirmed = (id : string) => {
    setVerificationId(id)
  }

  return (
    <SafeAreaView style={{flex :1}}>
    <View style={styles.curvedLoginWrapper} >
        <TouchableOpacity 
          onPress={()=>{
            props.navigation.canGoBack() && props.navigation.goBack()
          }} 
          style={styles.backButton}
        >
          <Ionicons name="md-arrow-round-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title} >{"Confirm OTP"} </Text>
      <TouchableOpacity  style={styles.backButton} />
    </View>
    <KeyboardAvoidingView style={styles.mainWrapper}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Image resizeMode="contain" source={Images.MROLogo} style={{ width: 100, height: 64}} />
        <Text style={styles.promptText}>
          {(codeText)}
          <Text style={[styles.promptText, {fontWeight : "bold"}]}>{phoneNumber}</Text>
        </Text>
        <View style={{paddingHorizontal : 24, width : "100%"}}>
          <TextInput
            keyboardType="phone-pad"
            onBlur={() => {}}
            label={"Enter OTP..."}
            onChangeText={(value) => setVerificationCode(value)}
            value={verificationCode.toString()}
          />
        </View>

        <Button
          textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
          style={styles.button}
          onPress={() => signInWithCredential(verificationId, verificationCode, props.navigation)}
        >
          {"Confirm Code"}
        </Button>

        <View style={{flexDirection : "row", marginVertical : 16}}>
          <Text>
            {"Did not receive SMS ?"} 
          </Text>
          <TouchableOpacity onPress={()=>{  
             verifyPhoneNumber(phoneNumber, recaptchaVerifier, numberConfirmed)}
            }
          >
            <Text style={styles.resendOTPText}>{" Resend OTP"}</Text>
          </TouchableOpacity>      
        </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
  );
}

export default  withAppContext(OTPScreen)

const codeText = "Please enter the verfication code that was sent by SMS to "
const styles = StyleSheet.create({
  button: {
    marginTop: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 7,
    backgroundColor : Colors.primaryOrange
  },
  promptText :{ 
    marginTop : 42,marginBottom :16 , textAlign : "center",
    fontSize : 12, color : "rgba(0,0,0,0.65)",marginVertical : 1
  },
  title: {
    color : "white" , fontSize : 18,
    fontWeight : "500"
  },
  resendOTPText : {
    color : Colors.primaryOrange,
    fontSize : 14,
    fontWeight :"bold"
  },
  backButton : {
    width : 36,
    height : 36,
  },
  mainWrapper : { 
    paddingHorizontal: 24, paddingTop: 62, 
    backgroundColor : "white",
    alignItems : "center",flex : 1,
    marginTop : 102, 
    borderTopRightRadius : 42
  },
  curvedLoginWrapper : {
    backgroundColor : Colors.primaryOrange ,
    height : 300,width : "100%",flexDirection:"row",justifyContent : "space-between",
    position : "absolute", top : 0,paddingHorizontal : 24,
    alignItems : "flex-start",paddingTop : 62
  }
})