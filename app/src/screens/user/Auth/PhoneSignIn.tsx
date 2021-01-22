import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { theme } from 'galio-framework';

import { Button, TextInput } from '@components';

import { firebaseConfig, verifyPhoneNumber, signInWithCredential } from '@api/authApi'
import { withAppContext } from '@context/AppContext';

const { width } = Dimensions.get('screen');

const PhoneSignIn: any = (props: any) => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationId, setVerificationId] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  const numberConfirmed = (id : string) => {
    setPhoneNumber("")
    setVerificationId(id)
  }

  return (
    <View style={{ padding: 22, marginTop: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View >
        <TextInput
          keyboardType="phone-pad"
          onClear={() => setPhoneNumber('')}
          label={!verificationId ? "+234..." : "Verification code"}
          onChangeText={(value: string) => !verificationId ? setPhoneNumber(value) : setVerificationCode(value)}
          value={!verificationId ? phoneNumber.toString() : verificationCode.toString() }
        />
        <Button
          textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
          style={styles.button}
          disabled={!phoneNumber.length && !verificationCode.length}
          onPress={() => !verificationId ? verifyPhoneNumber(phoneNumber, recaptchaVerifier, numberConfirmed) : signInWithCredential(verificationId, verificationCode, props.navigation)}
        >
          {!verificationId ? "Submit" : "Confirm Code"}
        </Button>
      </View>
    </View>
  );
}

export default withAppContext(PhoneSignIn)

const styles = StyleSheet.create({
  button: {
    marginTop: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 7,
  }
})