import * as firebase from "firebase";

import { toastSuccess, toastError } from '../utils/notifications'

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
    toastSuccess("Verification code sent to your phone.");
  } catch (err) {
    toastError(err.message);
  }
}

export const signInWithCredential = async (verificationId, verificationCode, navigation) => {
  try {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    await firebase.auth().signInWithCredential(credential).then(() => navigation.navigate('App'))
  } catch (err) {
    toastError(err.message);
  }
}

export const signInWithEmailAndPassword = (user, navigation) => firebase.auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(() => navigation.navigate('Home'))
    .catch(error => {
      if(error.code === 'auth/user-not-found'){
        firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => navigation.navigate('Home'))
        .catch(error => toastError(error.message))
      }
      else toastError(error.message)
    })    

export const logout = () => firebase.auth().signOut().then(() => toastSuccess("Signed out successfully"));

export const updateAuthUser = data => firebase.auth().currentUser.updateProfile(data)

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
