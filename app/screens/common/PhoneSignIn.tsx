import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { Block, theme } from 'galio-framework';

import { Button, Input,TextInput } from '../../components';

import { firebaseConfig,verifyPhoneNumber, signInWithCredential } from '../../api/authApi'
import { withAppContext } from "../../AppContext";

const { width } = Dimensions.get('screen');
type StringNo = string | number

const PhoneSignIn = ({props}) => {

  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState<StringNo>("");
  const [verificationId, setVerificationId] = useState<StringNo>("");
  const [verificationCode, setVerificationCode] = useState<StringNo>("");

  const numberConfirmed = (id : string | number) => {
    setPhoneNumber("")
    setVerificationId(id)
  }

  const onSignIn = () => {
      
  }

  console.log({phoneNumber, verificationCode, verificationId })
  return (
    <View style={{ padding: 20, marginTop: 50, marginBottom: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View >
        <TextInput
          type="phone-pad"
          label={!verificationId ? "+234..." : "Verification code"}
          onChangeText={(value) => !verificationId ? setPhoneNumber(value) : setVerificationCode(value)}
          value={ !verificationId ? phoneNumber : verificationCode}
          iconContent={<Block />}
        />
        <Button
          textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
          style={styles.button}
          onPress={() => !verificationId ? verifyPhoneNumber(phoneNumber, recaptchaVerifier, numberConfirmed) : signInWithCredential(verificationId, verificationCode, onSignIn)}
        >
          {!verificationId ? "Submit" : "Confirm Code"}
        </Button>
      </View>
    </View>
  );
}

export default  withAppContext(PhoneSignIn)

const styles = StyleSheet.create({
  button: {
    marginTop: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 7,
    borderRadius: 100
  }
})