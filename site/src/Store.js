import React, { useState, useEffect, useReducer } from "react";
import firebase from "firebase";

import appsettings from "appsettings.json";
import * as api from "api/index.js";
import * as rootReducer from "shared/utils/rootReducer";

export const CurrentUserContext = React.createContext();
export const UsersContext = React.createContext();

if (!firebase.apps.length)
  firebase.initializeApp(appsettings[appsettings.environment].firebaseConfig);

const initalState = {
  data: [],
  search: "",
  inProgress: true,
};

// eslint-disable-next-line react/prop-types
const Store = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [users, setUsers] = useReducer(
    rootReducer.setStateReducer,
    initalState
  );

  useEffect(() => {
    api.getCollection("users", setUsers);

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log("user", user);
        var dbUser = users.data.find((u) => u.id == user.phoneNumber);
        dbUser ? setCurrentUser(dbUser) : setCurrentUser(user);
      }
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </CurrentUserContext.Provider>
  );
};
export default Store;
