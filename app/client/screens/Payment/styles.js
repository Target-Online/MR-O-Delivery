import { StyleSheet } from 'react-native';
import { materialTheme } from '../../constants';

import { height, width } from '../../constants/utils';

const shadow = {
    elevation: 10,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
        height: 2
    }
}

export const styles = StyleSheet.create({
    container: {
        height: height * 1.1,
        width
    },
    pageBackgroundColor: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        padding: 30
    },
    continueButton: {
        padding: 10,
        width: width * 0.8,
        bottom: height / 3,
        borderRadius: 3,
        position: 'absolute',
        alignSelf: "center",
        backgroundColor: materialTheme.COLORS.PRIMARY,
        ...shadow
    },
    paymentOptions: {
        display: 'flex',
        width: width,
        justifyContent: 'space-around'
    },
    paymentActions: {
        display: 'flex',
        width: width,
        top: height / 2.5,
        justifyContent: 'space-around'
    },
    billingEmail: {
        display: 'flex',
        width: width,
        top: height / 2.5,
        justifyContent: 'space-around',
        padding: 50
    },
    payNow: {
        padding: 10,
        width: width * 0.8,
        marginHorizontal: 25,
        alignSelf: 'center',
        bottom: height / 3,
        borderRadius: 3,
        position: 'absolute',
        ...shadow
    },
    cashDeliveryNote: {
        fontSize: 12,
        marginVertical: 4,
        textAlign: "center"
    },
    cashOptionContainer: {
        width: "100%", 
        top: 20, 
        minHeight: 100, 
        justifyContent: "center", 
        alignItems: "center", 
        paddingHorizontal: 24 
    },
    text: {
        fontSize: 13, 
        color: "#fff", 
        fontWeight: "600"
    },
    paymentOptionContainer: {
        width: 108, 
        height: 60
    },
    paymentOptionChild: {
        width: 100, 
        height: 50, 
        borderWidth: 1, 
        position: "absolute", 
        top: 8, 
        justifyContent: "center" 
    },
    verifiedIcon: {
        width: 16, 
        height: 16, 
        borderRadius: 8, 
        backgroundColor: "transparent", 
        alignSelf: "flex-end", 
        marginRight: 4
    }
})