import { StyleSheet, Platform } from "react-native";

import { height, width } from 'app/client/constants/utils';
import { color } from "react-native-reanimated";

export const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 15,
    },
    lineGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        padding: 30,
        zIndex: -1
    },
    driverDetails: {
        color: '#fff',
        fontSize: 10,
        lineHeight: 15
    },
    driverContactAction: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#FB9211",
        justifyContent: "center",
        alignItems: "center"
    },
    driverContactActions: {
        position: "absolute", 
        right: 0, 
        width: 120, 
        marginRight: 16, 
        flexDirection: "row", 
        flex: 1, 
        justifyContent: "space-between" 
    },
    requestInfoContainer: {
        width: width,
        height: '50%',
        backgroundColor: "#FB9211"
    },
    driverInfoContainer: {
        width: "100%",
        backgroundColor: "black",
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24
    },
    driverPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textAreaStyles: {
        height: 30,
        paddingTop: 10,
        paddingHorizontal: 16
    },
    priceAndDate: {
        height: 40,
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: "row",
        alignItems: "flex-end",
        width: '100%',
        paddingHorizontal: 100
    },
    locationsPriceTimeStamp: {
        height: 150, 
        padding: 20, 
        justifyContent: "center"
    },
    locationsDetails: {
        height: 60, 
        flexDirection: "row", 
        justifyContent: "center"
    },
    locationArrow: {
        width: 20, 
        marginRight: 10, 
        justifyContent: "center", 
        alignItems: "flex-start"
    },
    locationArrowHead: {
        width: 10, 
        height: 10, 
        backgroundColor: "black"
    },
    locationArrowLine: {
        width: 1, 
        height: 24, 
        marginLeft: 4, 
        borderRadius: 4, 
        backgroundColor: "black"
    },
    orderTrackHeader: {
        fontSize: 16,
        fontWeight: "bold",
    },
    deliveryStep: {
        alignItems: "center",
        textAlign: "center",
        marginTop: 16
    },
    button: {
        paddingTop: Platform.OS === 'ios' ? 15 : 10,
        borderRadius: 5,
        alignItems: 'center',
        height: 40,
        width: 150,
        elevation: 5,
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: {
            height: 2
        }
    },
})
