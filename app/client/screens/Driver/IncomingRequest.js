import React, { useState, useEffect, useContext } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { Audio } from 'expo-av';

import { update } from "../../api";
import { materialTheme } from "../../constants";
import { CurrentUserContext, RequestsContext } from "../../Store";
import RequestDetailsCard from './Card';
import { SessionContext } from '../../Store';

export default function IncomingRequests(props) {
  const [currentUser] = useContext(CurrentUserContext);
  const [requests] = useContext(RequestsContext);
  const [isVisible, setVisible] = useState(false);
  const [incomingRequest, setIncomingRequest] = useState();

  useEffect(() => {
    setIncomingRequest(requests.data.find(r => r.status.isWaitingForDriverConfirmation && !r.status.isAcceptedByDriver));

    incomingRequest ? setVisible(true) : setVisible(false);
  }, [requests])

  useEffect(() => { incomingRequest && _playSound() }, [incomingRequest])

  const _playSound = async () => {
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(require('app/client/assets/audio/notif_tone.mp3'));
    await soundObject.playAsync();
  }

  function onAccept() {
    update('requests', incomingRequest.id, {
      driver: currentUser,
      status: { 
        ...incomingRequest.status, 
        inProgress: true, 
        isAcceptedByDriver: true,
        driverOnShoppingRoute: true,
        isWaitingForDriverConfirmation: false
      },
      currentStep: 0
    });
    update('users', currentUser.id, { isBusy: true });

    props.navigation.navigate('Home');
  }

  return (
    <ConfirmDialog
      title="Inconming Request"
      titleStyle={styles.confirmDialogTitle}
      visible={isVisible}
      buttonsStyle={styles.buttons}
      positiveButton={{
        titleStyle: styles.positiveButtonTitle,
        title: "Accept",
        onPress: () => onAccept()
      }}
      negativeButton={{
        titleStyle: styles.negativeButtonTitle,
        title: "Reject",
        onPress: () => setVisible(false)
      }}>
      <View>
        {incomingRequest && <RequestDetailsCard request={incomingRequest} />}
      </View>
    </ConfirmDialog>
  );
}

const styles = StyleSheet.create({
  confirmDialogTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: materialTheme.COLORS.PRIMARY
  },
  buttons: {
    borderTopWidth: 1,
    borderColor: 'white',
    paddingLeft: Platform.OS == 'ios' ? 50 : 'auto',
    paddingBottom: 40,
    alignItems: Platform.OS == 'ios' ? 'stretch' : 'center',
  },
  positiveButtonTitle: {
    marginTop: Platform.OS == 'ios' ? 35 : 0,
    padding: Platform.OS == 'ios' ? 22 : 19,
    height: 55,
    width: 100,
    backgroundColor: materialTheme.COLORS.PRIMARY,
    color: 'white'
  },
  negativeButtonTitle: {
    marginTop: Platform.OS == 'ios' ? 35 : 0,
    padding: Platform.OS == 'ios' ? 22 : 19,
    height: 55,
    width: 100,
    backgroundColor: materialTheme.COLORS.MUTED,
    color: 'white'
  }
});