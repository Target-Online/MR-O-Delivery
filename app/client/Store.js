import React, { useState, useEffect, useReducer } from "react";
import firebase from "firebase";

import appsettings from "../appsettings.json";
import * as api from "./api/index";
import * as rootReducer from "./utils/rootReducer";
import { newUser } from "./api/authApi";

const initalState = {
  data: [],
  search: "",
  inProgress: true,
};

export const CurrentUserContext = React.createContext({});
export const UsersContext = React.createContext({});
export const RequestsContext = React.createContext({});
export const SessionContext = React.createContext({});

if (!firebase.apps.length)
  firebase.initializeApp(appsettings[appsettings.environment].firebaseConfig);

export default function Store({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [request, setRequest] = useState({ currentStep: 0 });
  const [users, setUsers] = useReducer(rootReducer.setStateReducer, initalState);
  const [requests, setRequets] = useReducer(rootReducer.setStateReducer, initalState);

  useEffect(() => {
    if(users.inProgress) {
       api.getCollection("users", setUsers);
       api.getCollection("requests", setRequets);
    }
  
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var dbUser = users.data.find(u => u.id === user.phoneNumber || u.email === user.email);

        if (!dbUser && !users.inProgress) {
          var isEmailRegistered = user.email != '';
          
          newUser("users", isEmailRegistered 
            ? user.email.replace(/[^0-9a-z]/gi, '') 
            : user.phoneNumber, { 
              ...user.providerData[0], 
              isEmailRegistered: isEmailRegistered 
            })

            setCurrentUser({ 
              ...user, 
              isNew: true, 
              isEmailRegistered: isEmailRegistered 
            });
        } 
        else setCurrentUser(dbUser);
      }
    });
  
  }, [users.inProgress]);

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      <UsersContext.Provider value={[users, users.inProgress]}>
        <RequestsContext.Provider value={[requests, setRequets]}>
          <SessionContext.Provider value={[request, setRequest]}>
            {children}
          </SessionContext.Provider>
        </RequestsContext.Provider>
      </UsersContext.Provider>
    </CurrentUserContext.Provider>
  );
};