import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { height, width } from '../../constants/utils';
import Card from './Card';
import { RequestsContext, CurrentUserContext, SessionContext } from "../../Store";

const RequestsHistory = props => {
    const [requests] = useContext(RequestsContext);
    const [activeRequest] = useContext(SessionContext);
    const [currentUser] = useContext(CurrentUserContext);
    const [currentUserRequests, setCurrentUserRequests] = useState([]);

    const requestAccepted = activeRequest && requests.data.some(r => activeRequest.id == r.id && r.status.isAcceptedByDriver)

    useEffect(() => {
        if(requestAccepted) {
            props.navigation.navigate("Request Details", { request: activeRequest })
        }
    }, [requestAccepted])

    useEffect(() => {
        if(currentUser){
            setCurrentUserRequests(requests.data.filter(r => (r.status.inProgress || r.status.isComplete) && (r.customer.id === currentUser.id || r.driver.id == currentUser.id) ))
        }
    },[currentUser])

    return (
        <ScrollView contentContainerStyle={styles.container}>
          {requests.inProgress || !currentUser
            ? <ActivityIndicator style={{ height: '82%' }} size="large" color="#FB9211" />
            : currentUserRequests
                .sort((a, b) => b.createdAt - a.createdAt)
                .map(r => <Card request={r} props={props}/>)
          }
          {currentUserRequests.length === 0 && <Text style={styles.noDataText}>No requests history.</Text>}
          <LinearGradient style={styles.lineGradient} colors={['#fff', '#fff', '#FDD39F', '#FB9211', '#FB9211']} />
        </ScrollView>
    );
}

export default RequestsHistory;

const styles = StyleSheet.create({
    container: {
        minHeight: height,
        width: width,
        paddingHorizontal: "5%",
        backgroundColor: 'white'
    },
    noDataText: {
        marginVertical: Platform.OS == 'ios' ? height * 0.35 : 0,
        height: '82%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25,
        color: '#FB9211'
    },
    lineGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        padding: 30,
        zIndex: -1
    }
})

