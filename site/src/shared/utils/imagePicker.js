import firebase from "firebase";

import * as api from "api/index.js";
import * as authApi from "api/authApi.js";
import { toast } from "react-toastify";
import appsettings from "appsettings.json";

if (!firebase.apps.length)
  firebase.initializeApp(appsettings[appsettings.environment].firebaseConfig);

export const _updateUserAvatar = async (image, user, setInProgress) => {
  setInProgress(true);
  try {
    var url = await upload(image, user.id);
    if (user) {
      authApi.updateAuthUser({ photoURL: url });
      api.updateData("users", user.id, { profilePicUrl: url });
    }
  } catch (e) {
    toast.error(e.message);
  }
  setInProgress(false);
};

const upload = async (image, uid) => {
  const snapshot = await firebase
    .storage()
    .ref()
    .child(appsettings.environment + "/images/" + uid)
    .put(image);

  return await snapshot.ref.getDownloadURL();
};
