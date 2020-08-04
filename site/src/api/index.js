import firebase from "firebase";
import { O2A } from "object-to-array-convert";

import appsettings from "appsettings.json";

if (!firebase.apps.length)
  firebase.initializeApp(appsettings[appsettings.environment].firebaseConfig);

const db = firebase.database();

export const getCollection = (ref, dispatch) =>
  db.ref(ref).on(
    "value",
    (data) => {
      data.val() && dispatch({ type: "setData", data: O2A(data) });
      dispatch({ type: "setInProgress", inProgress: false });
    },
    (error) => {
      console.log("Error getting document", error);
      dispatch({ type: "setInProgress", inProgress: false });
    }
  );

export const setData = (ref, data, key = 0) => {
  var id = key == 0 ? firebase.database().ref().child(ref).push().key : key;
  db.ref(ref)
    .child(id)
    .set({
      ...data,
      id: id,
      createdAt: Date.now(),
    });
};

export const getData = (ref, id, setData) =>
  db
    .ref(ref)
    .child(id)
    .on(
      "value",
      (data) => setData(data.val()),
      (error) => {
        console.log("Error getting document", error);
      }
    );

export const updateData = (ref, id, data) =>
  db
    .ref(ref)
    .child(id)
    .update({ ...data });

export const removeData = (ref, id) => db.ref(ref).child(id).remove();
