import React, { useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { RequestsContext, CurrentUserContext } from "app/client/Store";
import { sendPushNotifications } from 'app/client/utils/expo-notifications';
import { update } from 'app/client/api';
import { toastInfo } from '../../../utils/notifications';
import { Images } from "app/client/constants";

export default function ChatRoom (props) {
    const [requests] = useContext(RequestsContext);
    const [currentUser] = useContext(CurrentUserContext);
    const request = requests.data.find(r => r.id === props.route.params.request.id);
     
    const onSendNotification = text => sendPushNotifications(
        currentUser.isDriver ? [request.customer] : [request.driver],
        `Message from: ${currentUser.displayName}`,
        text
    );

    const onSend = message => {
        if(request.status.inProgress){
            update('requests', request.id, {  
                messages: request.messages 
                    ? request.messages.concat({ 
                            ...message, index: request.messages.length
                        }) 
                    : [{ ...message, index: 0 }]
            });
            onSendNotification(message.text)
        }
        else toastInfo('Chat closed.')
    }

    return (
        <GiftedChat
            renderUsernameOnMessage
            isLoadingEarlier
            messages={request.messages 
                ? request.messages.sort((a, b) => b.index - a.index) 
                : []
            } 
            onSend={messages => onSend(messages[0])}
            user={{ 
                ...currentUser, 
                _id: currentUser.id, 
                avatar: currentUser.photoUrl ? currentUser.photoUrl : Images.photoPlaceHolder
            }}
        />
    )
}