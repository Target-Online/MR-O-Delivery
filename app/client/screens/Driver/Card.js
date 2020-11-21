import React from "react";
import { TouchableHighlight, Image, View, StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Images, materialTheme } from "../../constants";
import { CurrentUserContext } from "../../Store";

export default function Card({ request }) {
    const [currentUser] = React.useContext(CurrentUserContext);

    return (
        <TouchableHighlight>
            <Block center style={styles.conatiner}>
                {currentUser.isDriver
                    ? <Block center style={styles.cardDriverProfile}>
                        <Image source={request.customer.photoUrl ? { uri: request.customer.photoUrl } : Images.photoPlaceHolder} style={styles.avatar} />
                        <Text> {request.customer.displayName} </Text>
                      </Block>
                    : <Block center style={styles.cardDriverProfile}>
                        <Image source={request.driver.photoUrl ? { uri: request.driver.photoUrl } : Images.photoPlaceHolder} style={styles.avatar} />
                        <Text> {request.driver.displayName} </Text>
                      </Block>
                }
                <Block center style={styles.tripDetailsContainer}>
                    <View style={styles.locationPointsContaier}>
                        <View style={styles.fromToArrow}>
                            <View style={[styles.arrowPoint, { borderRadius: 4 }]} />
                            <View style={styles.arrowLine} />
                            <View style={styles.arrowPoint} />
                        </View>
                        <View style={styles.locationTextContainer}>
                            <View style={[styles.textAreaStyles, { borderColor: request.currentStep === 0 ? materialTheme.COLORS.PRIMARY : '#f9f9f9' }]} >
                                <Text numberOfLines={2} style={{ fontSize: 10 }} >
                                    {request.fromLocation.formatted_address}
                                </Text>
                            </View>
                            <View style={[styles.textAreaStyles, {
                                borderColor: (request.isPickUp && request.currentStep === 1) || (request.isShopping && request.currentStep === 3)
                                    ? materialTheme.COLORS.PRIMARY : '#f9f9f9'
                            }]} >
                                <Text numberOfLines={2} style={{ fontSize: 10 }} >
                                    {request.toLocation.formatted_address}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.priceAndDate}>
                        {request && (request.status.driverHasConfirmedPrices || request.isPickUp) &&
                            <React.Fragment>
                                <Text bold>{`N${request.isPickUp ? request.actualCost : request.actualCost + request.shoppingCost}`}</Text>
                                <Text>{' | '}</Text>
                            </React.Fragment>
                        }
                        <Text bold>{request.isPickUp ? 'PICK-UP' : 'SHOPPING'}</Text>
                        {request && (request.isCashPayment || request.isCardPayment) && (
                            <React.Fragment>
                                <Text>{' | '}</Text>
                                <Text>{request.isCashPayment ? 'CASH' : 'CARD'}</Text>
                            </React.Fragment>
                        )}
                    </View>
                </Block>
            </Block>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        borderWidth: 0,
        borderColor: '#FDD39F',
        height: 150,
        width: "100%",
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'white',
        elevation: 5,
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: {
            height: 2
        }
    },
    cardDriverProfile: {
        height: "100%",
        width: "30%",
        borderRightWidth: 1,
        borderRightColor: '#FDD39F',
        backgroundColor: 'white'
    },
    tripDetailsContainer: {
        width: '65%',
        paddingLeft: 15
    },
    locationPointsContaier: {
        height: 80,
        width: '100%',
        flexDirection: "row",
    },
    avatar: {
        marginTop: 15,
        height: 80,
        width: 80,
        borderRadius: 100,
        marginBottom: theme.SIZES.BASE,
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
    priceAndDate: {
        height: 40,
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: "row",
        alignItems: "flex-end",
        width: '100%'
    },
    fromToArrow: {
        width: 20,
        justifyContent: "space-between",
        paddingVertical: 10,
        alignItems: "flex-start"
    },
    arrowPoint: {
        width: 8,
        height: 8,
        backgroundColor: "#000"
    },
    arrowLine: {
        width: 1,
        height: 24,
        marginLeft: 3.5,
        borderRadius: 4,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    locationTextContainer: {
        flex: 1,
        height: 80,
        justifyContent: "space-between",
        backgroundColor: "#fff"
    }
})

