import { Dimensions, StyleSheet } from "react-native"
import { theme } from "galio-framework"
import { width } from "@constants/utils";

const historyStyles = StyleSheet.create({
    container: {
    },
    eventList: {
      marginTop: 20,
    },
    tripDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    },
    eventBox: {
      padding: 10,
      marginTop: 5,
      marginBottom: 5,
      flexDirection: 'row',
    },
    eventDate: {
      flexDirection: 'column',
    },
    eventDay: {
      fontSize: 30,
      color: "#fff",
      fontWeight: "600"
    },
    eventMonth: {
      fontSize: 20,
      color: "#fff",
      fontWeight: "600",
    },
    eventContent: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: 10,
      backgroundColor: '#FFFFFF',
      padding: 10,
      borderRadius: 10
    },
    destination: {
      fontSize: 15,
      color: "#646464",
    },
    eventDateTime: {
      fontSize: 18,
      color: "#151515",
    },
    description: {
      fontSize: 16,
      color: "#151515",
    },
    noDataText: {
      height: '50%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
});

const detailsStyles = StyleSheet.create({
    settings: {
        marginTop: theme.SIZES.BASE,
        paddingVertical: theme.SIZES.BASE / 3,
        backgroundColor: '#fff'
    },
    title: {
        paddingTop: theme.SIZES.BASE,
        paddingBottom: theme.SIZES.BASE / 2
    },
    rows: {
        height: theme.SIZES.BASE * 3,
        paddingHorizontal: 16,
        width :  width,
        marginBottom: theme.SIZES.BASE / 2
    },
    mapContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    addressText : {
        fontSize : 14,
        flexWrap : "wrap",
        width : "90%"
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#FFF',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
    },
    pic: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 30,
        fontWeight: '600',
        color: '#525F7F',
        fontSize: 18,
        width: 150,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#525F7F',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#525F7F',
        fontSize: 12,
        marginLeft: 30,
    },
});


export {
    historyStyles,
    detailsStyles
}