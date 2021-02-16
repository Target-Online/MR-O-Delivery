import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner  } from "expo-firebase-recaptcha";
import { theme } from 'galio-framework';

import { ArButton as Button, TextInput } from '../../components';
import { firebaseConfig, verifyPhoneNumber, signInWithCredential } from '../../api/authApi'

const { width, height } = Dimensions.get('screen');
const attemptInvisibleVerification = true;

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
          attemptInvisibleVerification={attemptInvisibleVerification}
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
            onPress={() => !verificationId ? verifyPhoneNumber(phoneNumber, recaptchaVerifier, setVerificationId) : signInWithCredential(verificationId, verificationCode, props.navigation)}
          >
            {!verificationId ? "Submit" : "Confirm Code"}
          </Button>

          {!!verificationId &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity style={styles.codeResedMessageContainer} onPress={() => setVerificationId('')}>
                <Text style={styles.actionsText}>Change number</Text>
              </TouchableOpacity><TouchableOpacity style={styles.codeResedMessageContainer} onPress={() => verifyPhoneNumber(phoneNumber, recaptchaVerifier, setVerificationId)}>
                <Text style={styles.actionsText}>Resend code</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </React.Fragment>
      <View>
      {attemptInvisibleVerification && (
        <FirebaseRecaptchaBanner
          linkStyle={styles.firebaseRecaptchabannerLink} 
          textStyle={styles.firebaseRecaptchabannerText} 
          style={styles.firebaseRecaptchabanner} 
        />
      )}
      </View>
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
  actionsText: {
    color: 'orange',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  firebaseRecaptchabanner: {
    top: height * 0.15
  },
  firebaseRecaptchabannerLink: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'none'
  },
  firebaseRecaptchabannerText: {
    color: 'white',
    margin: 10,
    textAlign: 'center'
  }
})