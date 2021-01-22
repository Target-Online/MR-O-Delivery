import { createContext, useState , useEffect, useRef } from "react";
import React from "react";
import { IAlertProps } from "../components/AlertModal";
import { Platform } from 'react-native'
import _ from "lodash";
export const AppContext = createContext({});
import { IAppContext } from "src/types";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { initAudio  , playSound, disableSound, initSound } from "../api/audioApi";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
})
  
require('firebase/firestore')

const AppContextProvider : React.SFC = ({children}) => {

        const [profile, setProfile] = useState<any>({})
        const [alertBoxData , setAlertData] = useState<IAlertProps>({  text: "string",buttons : [ {label : "Test",onPress : ()=>{}} ],title : "test title",})
        const [showAlert , setShowAlert] = useState<boolean>(false)
        const [expoPushToken, setExpoPushToken] = useState('')
        const [userInRating, setUserInRating] = useState({})
        const [ratingsVisible, setRatingsVisible] = useState<boolean>(false)
        const notificationListener = useRef()
        const responseListener = useRef()
        const [verificationId, setVerificationId] = useState<string>("")

        useEffect(() => {
          initAudio()
          initSound()
          registerForPushNotificationsAsync().then(token => {
              setExpoPushToken(token)
          })
                       
          notificationListener.current = Notifications.addNotificationReceivedListener(notification => {});

          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {});

          return () => {
              Notifications.removeNotificationSubscription(notificationListener);
              Notifications.removeNotificationSubscription(responseListener);
              // disableSound()
          };
        }, [])

        const sendPushNotification = async () => {
            await Notifications.presentNotificationAsync({
                    title: "New incoming request",
                    body: '',
                    // data: { data: 'goes here' }
            })
        }
          
        const registerForPushNotificationsAsync = async () => {
            let token;
            if (Constants.isDevice) {
                const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                return;
                }
                token = (await Notifications.getExpoPushTokenAsync()).data;    
            } else {}
            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
                });
            } 
            return token
        }

        return (
            <AppContext.Provider
              value={{ 
                showAlert, setShowAlert,
                ratingsVisible, setRatingsVisible,
                alertBoxData, setAlertData,
                profile,setProfile,
                sendPushNotification,
                verificationId, setVerificationId, playSound,
                userInRating, setUserInRating
              }}
            >
                {children}
            </AppContext.Provider>
        )
  };

export default AppContextProvider

export const ContextConsumer = AppContext.Consumer
export type IContextProps = {
    context : IAppContext
}

export const withAppContext = (Component : React.Component) => {

    const Wrapper : React.SFC = (props) => (
        <ContextConsumer>
            {(context: any) =>(
                <Component {...props} context={context} />
            )}
        </ContextConsumer>
    )
    return Wrapper
}