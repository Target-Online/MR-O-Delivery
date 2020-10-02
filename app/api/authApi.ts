import * as firebase from "firebase";

import { onSuccess, onError } from '../utils/notifications'

import appsettings from "../appsettings.json";
import { update } from "./index";

const _appsettings: any = appsettings;

if (!firebase.apps.length)
  firebase.initializeApp(_appsettings[appsettings.environment].firebaseConfig);

export const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

export const verifyPhoneNumber = async (phoneNumber: any, recaptchaVerifier: any, setVerificationId: any) => {
  try {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const verificationId = await phoneProvider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier.current
    );
    setVerificationId(verificationId);
    onSuccess("Verification code sent to your phone.");
  } catch (err) {
    onError(err.message);
  }
}

// export  const resendVerificationCode = (phoneNumber : string,token : string) => {
// PhoneAuthProvider.getInstance().verifyPhoneNumber(
// phoneNumber,        // Phone number to verify
// 60,                 // Timeout duration
// TimeUnit.SECONDS,   // Unit of timeout
// this,               // Activity (for callback binding)
// mCallbacks,         // OnVerificationStateChangedCallbacks
// token);             // ForceResendingToken from callbacks
// }

export const signInWithCredential = async (verificationId: string, verificationCode: string, navigation: any) => {
  try {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    await firebase.auth().signInWithCredential(credential);
    onSuccess("Phone authentication successful 👍");
    navigation.navigate('Home')
  } catch (err) {
    onError(err.message);
    console.log("Sign In Erro", err.message)
  }
}

export const login = (user: any, setUser: any, navigation: any, setInprogress: any) => {
  setInprogress(true);
  firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(function (response: any) {
          setInprogress(false);
          setUser({
              ...user,
              isConnected: true
          })
          onSuccess('Welcome ' + response.user.displayName)
          navigation.navigate('Stores')
      }, function (error: any) {
          setInprogress(false);
          onError(error.message);
      });
}

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      onSuccess("Signed out successfully");
      window.location.reload();
    });
};

export const updateAuthUser = async (data: any) => {
  await firebase.auth().currentUser.updateProfile({
    ...data,
  });
  onSuccess("Account updated successfully");
}

export const updateUser = (id: any, data: any) => {
  update('users', id, data);
  updateAuthUser(data);
};
