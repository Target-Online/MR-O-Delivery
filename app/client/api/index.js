import firebase from "firebase";
import { O2A } from "object-to-array-convert";

import appsettings from "../../appsettings.json";

if (!firebase.apps.length)
  firebase.initializeApp(appsettings[appsettings.environment].firebaseConfig);

export const db = firebase.database();

export const getCollection = async (ref, dispatch) =>
  db.ref(ref).on(
    "value",
    (data) => {
      data.val() && dispatch({ type: "setData", data: O2A(data) });
      dispatch({ type: "setInProgress", inProgress: false });
    },
    () => dispatch({ type: "setInProgress", inProgress: false })
  );

export const set = (ref, data) => {
  var id = firebase.database().ref().child(ref).push().key;
  db.ref(ref)
    .child(id)
    .set({
      ...data,
      id: id,
      createdAt: Date.now(),
    });

    return id;
};

export const update = (ref, id, data) =>
  db
    .ref(ref)
    .child(id)
    .update({ ...data });

export const remove = (ref, id) => db.ref(ref).child(id).remove();
