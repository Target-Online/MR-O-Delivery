import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native'
import { Text } from 'galio-framework';

import ParcelIcon from '../../../assets/icons/ParcelIcon';
import { height } from '../../constants/utils';
import { SessionContext } from "../../Store";

export const RouteSummary = () => {
    const [request] = useContext(SessionContext);

    return (
        <View style={[styles.orderSummary, { height: request.isShopping ? height * 0.4 : height * 0.3 }]} >
            <View style={{ height: 40, flexDirection: "row", }}>
                <ParcelIcon />
                <View style={{ marginLeft: 16, }}>
                    <Text numberOfLines={2} >
                        <Text bold style={{ fontSize: 14 }}>
                            {`Delivering : `}
                        </Text> {request && request.isPickUp ? request.parcelDetails.name : 'Shopping Item(s)'}</Text>
                </View>
            </View>
            <View style={{ height: 80, flexDirection: "row" }}>
                <View style={styles.locationsArrow}>
                    <View style={styles.locationsArrowHead} />
                    <View style={styles.locationsArrowBodyLine} />
                    <View style={styles.locationsArrowTail} />
                </View>

                <View style={styles.locationPoints}>
                    <View style={styles.textAreaStyles} >
                        <Text numberOfLines={2} style={styles.addressInput} >
                            {request && request.fromLocation.formatted_address}
                        </Text>
                    </View>
                    <View style={styles.textAreaStyles} >
                        <Text numberOfLines={2} style={styles.addressInput} >
                            {request && request.toLocation.formatted_address}
                        </Text>
                    </View>
                </View>
            </View>
            {request && request.isPickUp
                ? <View style={styles.totalCost}>
                    <Text bold>Total</Text>
                    <Text bold>{`N${request.isPickUp ? request.actualCost : request.actualCost + request.shoppingCost}`}</Text>
                </View>
                : <React.Fragment>
                    <View style={styles.totalCost}>
                        <Text >Delivery</Text>
                        <Text>{`N${request.actualCost}`}</Text>
                    </View>
                    <View style={styles.totalCost}>
                        <Text>Shopping</Text>
                        <Text>{`N${request.shoppingCost}`}</Text>
                    </View>
                    <View style={styles.totalCost}>
                        <Text bold>Total</Text>
                        <Text bold>{`N${request.actualCost + request.shoppingCost}`}</Text>
                    </View>
                </React.Fragment>
            }
        </View>
    )
}

export default RouteSummary;

const styles = StyleSheet.create({
    orderSummary: {
        marginTop: 20,
        width: "88%",
        borderRadius: 3,
        position: 'absolute',
        marginLeft: 25,
        marginRight: 25,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 24,
        shadowColor: '#000000',
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: {
            height: 2
        },
        elevation: 10
    },
    addressInput: {
        fontSize: 10,
    },
    textAreaStyles: {
        height: 36,
        borderRadius: 2,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: "#f9f9f9",
        paddingHorizontal: 16,
        justifyContent: "center"
    },
    locationsArrow: {
        width: 20,
        marginRight: 8,
        justifyContent: "space-between",
        paddingVertical: 10,
        alignItems: "flex-start"
    },
    locationsArrowHead: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "black"
    },
    locationsArrowBodyLine: {
        width: 1,
        height: 24,
        marginLeft: 3.5,
        borderRadius: 4,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    locationsArrowTail: {
        width: 8,
        height: 8,
        backgroundColor: "black"
    },
    locationPoints: {
        flex: 1,
        height: 80,
        justifyContent: "space-between",
        backgroundColor: "#fff"
    },
    totalCost: {
        height: 40,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-end"
    }
})