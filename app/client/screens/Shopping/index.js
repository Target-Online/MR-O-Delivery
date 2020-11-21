import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Platform, ScrollView, Dimensions } from 'react-native';
import { Input, theme } from 'galio-framework';
import { FontAwesome5, MaterialCommunityIcons, SimpleLineIcons, Octicons } from '@expo/vector-icons';

import materialTheme from '../../constants/Theme';
import { SessionContext, UsersContext } from "../../Store";
import { toastInfo } from '../../utils/notifications';
import AddShoppingItem from './AddShoppingItem';
import ShoppingList from './ShoppingList';
import { set, update } from '../../api';
import { sendPushNotifications } from '../../utils/expo-notifications';

const { height } = Dimensions.get('screen');

export default function Shopping(props) {
    const [users] = useContext(UsersContext);
    const [request, setRequest] = useContext(SessionContext);
    const [isAddItemVisible, setAddItemVisible] = useState(false);
    const [shoppingList, setShoppingList] = useState([])

    const updateShoppingDetails = (key, value) => {
        setRequest({
            ...request,
            shoppingDetails: {
                ...request.shoppingDetails,
                [key]: value
            }
        })
    }

    const onValidation = () => {
        if (
            request.shoppingDetails &&
            request.shoppingDetails.storeName &&
            shoppingList && shoppingList.length > 0
        ) {
            onSubmitRequest()
        }
        else toastInfo('Enter shopping details.')
    }

    const onSubmitRequest = () => {
            if(request.isSubmitted) update(
                "requests", 
                request.id, { 
                    status: { 
                        isWaitingForDriverConfirmation: true ,
                        isWaitingForPricesConfirmation: true
                    }
            });
            else  setRequest({ 
                    ...request, 
                    id: set("requests", {  
                        ...request, 
                        shoppingList: shoppingList, 
                        status: { 
                            isWaitingForDriverConfirmation: true,
                            isWaitingForPricesConfirmation: true
                        }
                    }), 
                    isSubmitted: true 
            });

            sendPushNotifications(
                users.data.filter(u => u.isActive && u.isDriver && u.isOnline && !u.isBusy),
                'Incoming Request',
                'Shopping request has been logged'
            )

            props.navigation.navigate("Finding Driver");
    }

    return (
        <ScrollView>
            <ScrollView style={styles.container}>
                <React.Fragment>
                    <View style={styles.truckIconContainer}>
                        <View style={styles.truckIcon}>
                            <MaterialCommunityIcons name="truck-fast" size={130} color={materialTheme.COLORS.PRIMARY} />
                        </View>
                    </View>
                    <Text style={styles.pickUpHeading}>Pick up & Shopping</Text>
                    <Text style={styles.pickUpDropOffMessage}>
                        We will pick up documents, goods, electronics,groceries and whatever you need and drop off wherever you want!
                </Text>
                </React.Fragment>
                <ScrollView style={{ paddingVertical: 24, minHeight: height }} >
                    <Input
                        right
                        value={request && request.fromLocation.formatted_address.substring(0, 50)}
                        editable={false}
                        color={materialTheme.COLORS.PRIMARY}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.DEFAULT }}
                        iconContent={<SimpleLineIcons size={16} color={theme.COLORS.ICON} name="location-pin" />}
                    />
                    <Input
                        right
                        editable={false}
                        value={request && request.toLocation.formatted_address.substring(0, 50)}
                        color={materialTheme.COLORS.PRIMARY}
                        style={{ borderRadius: 3, color: materialTheme.COLORS.PRIMARY, borderColor: materialTheme.COLORS.DEFAULT }}
                        iconContent={<SimpleLineIcons size={16} color={theme.COLORS.ICON} name="location-pin" />}
                    />
                    <Input
                        right
                        placeholder="Store Name"
                        value={request && request.shoppingDetails ? request.shoppingDetails.storeName : ""}
                        color={materialTheme.COLORS.PRIMARY}
                        onChangeText={value => updateShoppingDetails('storeName', value)}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        iconContent={<Octicons size={16} color={theme.COLORS.ICON} name="package" />}
                    />
                    <TextInput
                        multiline
                        value={request && request.shoppingDetails ? request.shoppingDetails.storeInstructions : ""}
                        numberOfLines={8}
                        minHeight={Platform.OS === 'ios' ? 20 * 8 : null}
                        onChangeText={value => updateShoppingDetails('storeInstructions', value)}
                        placeholder='Store Instructions'
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={styles.textArea}
                    />
                    <ShoppingList 
                       shoppingList={shoppingList}
                       setShoppingList={setShoppingList} 
                    />
                    <TouchableOpacity style={{ marginTop: 40, alignSelf: 'center'}} onPress={() => setAddItemVisible(true)}>
                        <FontAwesome5
                            size={70}
                            name="cart-plus"
                            color={materialTheme.COLORS.PRIMARY}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => onValidation()} 
                        style={[
                            styles.continueButton, 
                            shoppingList && shoppingList.length > 0 
                                ? {  backgroundColor: materialTheme.COLORS.PRIMARY }
                                : {  backgroundColor: '#FFCB9D' }
                        ]}>
                        <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ScrollView>
            <AddShoppingItem
                shoppingList={shoppingList}
                isVisible={isAddItemVisible}
                setShoppingList={setShoppingList}
                setVisible={setAddItemVisible}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24
    },
    pickUpHeading: {
        fontSize: 22, fontWeight: "700",
        color: "rgba(0,0,0,0.8)",
        alignSelf: "flex-start",
        marginBottom: 8
    },
    continueButton: {
        width: "100%",
        height: 40,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        marginTop: 40,
        alignItems: 'center',
        borderRadius: 5
    },
    continueText: {
        fontSize: 13,
        color: "#fff",
        fontWeight: "600"
    },
    truckIcon: {
        transform: [{ scaleX: -1 }],
        alignSelf: "flex-start",
        marginTop: 8,
        marginBottom: 24
    },
    truckIconContainer: {
        width: "100%",
        height: 140,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    pickUpDropOffMessage: {
        fontSize: 12,
        fontWeight: "400",
        color: "rgba(0,0,0,0.5)",
        alignSelf: "flex-start"
    },
    textArea: {
        color: materialTheme.COLORS.PRIMARY,
        textAlignVertical: "top",
        marginTop: theme.SIZES.BASE / 2,
        borderRadius: 3,
        padding: 15,
        backgroundColor: "white",
        paddingTop: Platform.OS === 'ios' ? 15 : 15
    }
});
