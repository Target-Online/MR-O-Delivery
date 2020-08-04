import firebase from "firebase";
import { toast } from "react-toastify";

import appsettings from "appsettings.json";
import { setData } from "./index";

if (!firebase.apps.length)
  firebase.initializeApp(appsettings[appsettings.environment].firebaseConfig);

export const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      toast.success("Signed out successfully");
      window.location.reload();
    });
};

export const updateAuthUser = async (data) => {
  firebase.auth().currentUser.updateProfile({
    ...data,
  });
  toast.success("Account updated successfully");
};

export const newUser = (ref, data, key) => {
  setData(ref, data, key);
  updateAuthUser(data);
};
