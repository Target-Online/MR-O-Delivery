import firebase from "firebase";
import { O2A } from "object-to-array-convert";
import appsettings from "../../appsettings.json";

const _appsettings: any = appsettings;

if (!firebase.apps.length) firebase.initializeApp(_appsettings[appsettings.environment].firebaseConfig);

const db = firebase.database()

export const getCollection = async (ref: any, dispatch: any, callBack?: any) =>{

  return db.ref(ref).on(
    "value",
    (data: any) => {
      data.val() && dispatch({ type: "setData", data: O2A(data) });
      dispatch({ type: "setInProgress", inProgress: false });
      callBack && callBack()
    },
    (error: any) => {
      dispatch({ type: "setInProgress", inProgress: false });
    }
  )
}

export const set = (ref: any, data: any, key = 0) => {
  var id = key == 0 ? firebase.database().ref().child(ref).push().key : key;
  db.ref(ref)
    .child(id)
    .set({
      ...data,
      id: id,
      createdAt: Date.now(),
    });
};

export const update = (ref: any, id: any, data: any) =>
  db
    .ref(ref)
    .child(id)
    .update({ ...data });

export const remove = (ref: any, id: any) => db.ref(ref).child(id).remove();
