import * as firebase from "firebase";

import { onSuccess, onError, toastSuccess } from '../utils/notifications'

import appsettings from "../../appsettings.json";
import { update, db } from "./index";

export const firebaseConfig = appsettings[appsettings.environment].firebaseConfig;

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

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

export const signInWithCredential = async (verificationId, verificationCode, navigation) => {
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
  }
}


export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      toastSuccess("Signed out successfully");
      //window.location.reload();
    });
};

export const updateAuthUser = async (data) => {
  await firebase.auth().currentUser.updateProfile({
    ...data,
  });
  onSuccess("Account updated successfully");
}

export const updateUser = (id, data) => {
  update('users', id, data);
  updateAuthUser(data);
};

export const newUser = (ref, key, data) =>
  db
    .ref(ref)
    .child(key)
    .set({
      ...data,
      id: key,
      createdAt: Date.now()
    });
