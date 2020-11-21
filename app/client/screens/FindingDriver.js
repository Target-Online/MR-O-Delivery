import React, { useContext, useEffect } from "react";
import {
    Text,
    TouchableHighlight,
    SafeAreaView,
    StyleSheet,
    ImageBackground
} from "react-native";
import { Block } from 'galio-framework';

import { height, width } from '../constants/utils';
import { update } from "../api";
import { SessionContext, RequestsContext } from "../Store";

const runningScotter = require('../assets/gif/running-scotter.gif')

const FindingDriver = props => {
    const [request, setRequest] = useContext(SessionContext);
    const [requests] = useContext(RequestsContext);
    const requestAccepted = requests.data.some(r => request && request.id == r.id && r.status.isAcceptedByDriver)

    const onCancel = () => {
        props.navigation.goBack();
        update("requests", request.id, {
            status: {
                isWaitingForDriverConfirmation: false,
                isCancelled: true
            }
        })
    }

    useEffect(() => {
        if(requestAccepted) {
            // Reset crusial fields in active request stored state.
            setRequest({ ...request, isSubmitted: false, isPaymentComplete: false })
            props.navigation.navigate("History");
        }
    }, [requestAccepted])
    
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={runningScotter}
                style={styles.gifBackground}
            >
                <Block center>
                    <Text>Finding you a driver please wait...</Text>
                </Block>
            </ImageBackground>

            <TouchableHighlight style={styles.continueButton} onPress={() => onCancel()}>
                <Block center>
                    <Text style={styles.cancel}> Cancel </Text>
                </Block>
            </TouchableHighlight>
        </SafeAreaView>
    );
}

export default FindingDriver;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    gifBackground: {
        flex: 1,
        height: height * 0.6,
        width: width,
        resizeMode: "cover",
        justifyContent: "center",
    },
    continueButton: {
        padding: 10,
        width: width * 0.8,
        bottom: 100,
        borderRadius: 3,
        position: 'absolute',
        backgroundColor: '#FB9211',
        elevation: 10,
        alignSelf: "center",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: {
            height: 2
        }
    },
    cancel: { 
        fontSize: 13, 
        color: "#fff", 
        fontWeight: "600" 
    }
})

