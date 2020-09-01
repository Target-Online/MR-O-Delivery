import React, { useState, useEffect, useReducer } from "react";
import firebase from "firebase";

import appsettings from "./appsettings.json";
import * as api from "./api/index";
import * as rootReducer from "./utils/rootReducer";

const initalState = {
  data: [],
  search: "",
  inProgress: true,
};

export const CurrentUserContext = React.createContext({});
export const UsersContext = React.createContext({});
export const OrdersContext = React.createContext({});

const _appsettings: any = appsettings;

if (!firebase.apps.length)
  firebase.initializeApp(_appsettings[appsettings.environment].firebaseConfig);

// eslint-disable-next-line react/prop-types
const Store: React.FunctionComponent = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [users, setUsers] = useReducer(rootReducer.setStateReducer, initalState);
  const [orders, setOrders] = useReducer(rootReducer.setStateReducer, initalState);

  useEffect(() => {
    api.getCollection("users", setUsers);
    api.getCollection("orders", setOrders);

    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        var dbUser = users.data.find((u: any) => u.id == user.phoneNumber);
        dbUser ? setCurrentUser(dbUser) : setCurrentUser(user);
      }
    });
  }, [users.inProgress]);

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      <UsersContext.Provider value={[users, setUsers]}>
        <OrdersContext.Provider value={[orders, setOrders]}>
          {children}
        </OrdersContext.Provider>
      </UsersContext.Provider>
    </CurrentUserContext.Provider>
  );
};
export default Store;
