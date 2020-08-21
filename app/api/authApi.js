import * as firebase from "firebase";

import { onSuccess, onError } from '../utils/notifications'

import appsettings from "../appsettings.json";
import { set } from "./index";

if (!firebase.apps.length)
  firebase.initializeApp(appsettings[appsettings.environment].firebaseConfig);

export const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

export const verifyPhoneNumber = async (phoneNumber, recaptchaVerifier, setVerificationId) => {
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

export const signInWithCredential = async (verificationId, verificationCode, onCodeConfirmed) => {
  try {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    await firebase.auth().signInWithCredential(credential);
    onSuccess("Phone authentication successful 👍");
    onCodeConfirmed && onCodeConfirmed()
  } catch (err) {
    onError(err.message);
    // console.log(verificationCode)
  }
}

export const login = (user, setUser, navigation, setInprogress) => {
  setInprogress(true);
  firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(function (response) {
          setInprogress(false);
          setUser({
              ...user,
              isConnected: true
          })
          onSuccess('Welcome ' + response.user.displayName)
          navigation.navigate('Stores')
      }, function (error) {
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

export const updateAuthUser = async (data) => {
  firebase.auth().currentUser.updateProfile({
    ...data,
  });
  onSuccess("Account updated successfully");
};

export const newUser = (ref, data, key) => {
  set(ref, data, key);
  updateAuthUser(data);
};
