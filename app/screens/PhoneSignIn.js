import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { Block, theme } from 'galio-framework';

import { Button, Input } from '../components';

import { firebaseConfig,verifyPhoneNumber, signInWithCredential } from '../api/authApi'

const { width } = Dimensions.get('screen');

export default function PhoneSignIn(props) {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();

  return (
    <View style={{ padding: 20, marginTop: 50, marginBottom: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Block center>
        <Input
          primary
          type="phone-pad"
          placeholder={!verificationId ? "+234..." : "Verification code"}
          onChangeText={(value) => !verificationId ? setPhoneNumber(value) : setVerificationCode(value)}
          iconContent={<Block />}
        />
        <Button
          textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
          style={styles.button}
          onPress={() => !verificationId ? verifyPhoneNumber(phoneNumber, recaptchaVerifier, setVerificationId) : signInWithCredential(verificationId, verificationCode, props.navigation)}
        >
          {!verificationId ? "Phone Number Sign In" : "Confirm Code"}
        </Button>
      </Block>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 7,
    borderRadius: 100
  }
})