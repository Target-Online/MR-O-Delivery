import React, { useState, useEffect, useReducer } from "react";
import firebase from "firebase";

import appsettings from "appsettings.json";
import * as api from "api/index.js";
import * as rootReducer from "shared/utils/rootReducer";

export const CurrentUserContext = React.createContext();
export const UsersContext = React.createContext();
export const OrdersContext = React.createContext();

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
  const [users, setUsers] = useReducer(rootReducer.setStateReducer, initalState);
  const [order, setOrders] = useReducer(rootReducer.setStateReducer, initalState);

  useEffect(() => {
    api.getCollection("users", setUsers);
    api.getCollection("orders", setUsers);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var dbUser = users.data.find((u) => u.id == user.phoneNumber);
        dbUser ? setCurrentUser(dbUser) : setCurrentUser(user);
      }
    });
  }, [users.inProgress]);

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      <UsersContext.Provider value={[users, setUsers]}>
        <OrdersContext.Provider value={[order, setOrders]}>
          {children}
        </OrdersContext.Provider>
      </UsersContext.Provider>
    </CurrentUserContext.Provider>
  );
};
export default Store;
