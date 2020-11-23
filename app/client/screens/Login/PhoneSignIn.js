import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Platform } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { theme } from 'galio-framework';

import { ArButton as Button, TextInput } from '../../components';
import { firebaseConfig, verifyPhoneNumber, signInWithCredential } from '../../api/authApi'

const { width } = Dimensions.get('screen');

const PhoneSignIn = props => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <View style={{ padding: 22, marginTop: 50 }}>
      <React.Fragment>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <View >
          <TextInput
            keyboardType="phone-pad"
            label={!verificationId ? "+234..." : "Verification code"}
            onClear={() => !verificationId ? setPhoneNumber("") : setVerificationCode("")}
            onChangeText={value => !verificationId ? setPhoneNumber(value) : setVerificationCode(value)}
            value={!verificationId ? phoneNumber.toString() : verificationCode.toString()}
          />

          <Button
            textStyle={{ fontSize: 12 }}
            style={styles.button}
            onPress={() => !verificationId 
              ? verifyPhoneNumber(phoneNumber, recaptchaVerifier, setVerificationId) 
              : signInWithCredential(verificationId, verificationCode, props.navigation)}
          >
            {!verificationId ? "Submit" : "Confirm Code"}
          </Button>

          {!!verificationId &&
            <TouchableOpacity style={styles.codeResedMessageContainer} onPress={() => verifyPhoneNumber(phoneNumber, recaptchaVerifier, setVerificationId)}>
              <Text style={styles.codeDidYouReceiveMessage}>SMS received?</Text>
              <Text style={styles.codeResedMessage}>Click here to re-send</Text>
            </TouchableOpacity>
          }
        </View>
      </React.Fragment>
    </View>
  );
}

export default PhoneSignIn;

const styles = StyleSheet.create({
  button: {
    marginTop: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 7,
  },
  codeResedMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15
  },
  codeDidYouReceiveMessage: {
    color: 'orange',
    fontWeight: 'bold'
  },
  codeResedMessage: {
    color: 'orange',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
})