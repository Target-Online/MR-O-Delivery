import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions,Image,Text,TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { theme } from 'galio-framework';
import { Images,Colors } from '../../constants';
import { Button,TextInput } from '../../components';
import PhoneIcon from  '../../assets/icons/PhoneIcon'
import { firebaseConfig, verifyPhoneNumber, signInWithCredential } from '../../api/authApi'
import { withAppContext } from "../../AppContext";


const { width } = Dimensions.get('screen');
type StringNo = string | number

const PhoneSignIn = (props: any) => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState<StringNo>("");
  const [verificationId, _setVerificationId] = useState<string>("");
  const {setVerificationId} = props.context

  const numberConfirmed = (id : string) => {
    setPhoneNumber("")
    props.navigation.navigate("OTPScreen")
    _setVerificationId(id)
    setVerificationId(id)
  }

  return (
    <SafeAreaView style={{flex :1}}>
    <View style={styles.curvedLoginWrapper} >
      <Text style={styles.title} >{"Login"} </Text>
    </View>
      <KeyboardAvoidingView style={styles.mainWrapper}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Image resizeMode="contain" source={Images.MROLogo} style={{ width: 100, height: 64}} />
        <Text style={styles.promptText}>
          {phoneText}
        </Text>
        <View style={{paddingHorizontal : 24, width : "100%"}}>
          <TextInput
            keyboardType="phone-pad"
            onBlur={() => {}}
            label={!verificationId ? "+234..." : "Verification code"}
            onChangeText={(value) =>  setPhoneNumber(value)}
            value={phoneNumber.toString()}
          />
        </View>

        <Button
          textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
          style={styles.button}
          onPress={() => verifyPhoneNumber(phoneNumber, recaptchaVerifier, numberConfirmed)}
        >
          {!verificationId ? "Submit" : "Confirm Code"}
        </Button>
      </KeyboardAvoidingView>
      </SafeAreaView>
  );
}

export default  withAppContext(PhoneSignIn)

const phoneText = "Please enter your mobile number to proceed."

const styles = StyleSheet.create({
  button: {
    marginTop: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 7,
  },
  promptText :{ 
    marginTop : 42,marginBottom :16 , 
    fontSize : 12, color : "rgba(0,0,0,0.65)"
  },
  resendOTPText : {
    color : Colors.primaryOrange,
    fontSize : 14,
    fontWeight :"bold"
  },
  title:{
    color : "white" , fontSize : 18,
    fontWeight : "500"
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
    height : 300,width : "100%",
    position : "absolute", top : 0,
    alignItems : "center",paddingTop : 62
  }
})