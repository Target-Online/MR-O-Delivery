import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Platform, ScrollView, Dimensions } from 'react-native';
import { Input, theme } from 'galio-framework';
import { MaterialCommunityIcons, SimpleLineIcons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import materialTheme from '../constants/Theme';
import { SessionContext } from "../Store";
import { toastInfo } from '../utils/notifications';

const { height } = Dimensions.get('screen');

export default function ParcelDetails(props) {
    const [request, setRequest] = useContext(SessionContext);

    const updateParcelDetails = (key, value) => {
        setRequest({
            ...request,
            parcelDetails: {
                ...request.parcelDetails,
                [key]: value
            }
        })
    }

    const onValidation = () => {
        if (
            request.parcelDetails &&
            request.parcelDetails.name &&
            request.parcelDetails.description
        ) props.navigation.navigate('Payment')
        else toastInfo('Enter package details')
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
                        placeholder="Package Name"
                        value={request && request.parcelDetails ? request.parcelDetails.name : ""}
                        color={materialTheme.COLORS.PRIMARY}
                        onChangeText={value => updateParcelDetails('name', value)}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        iconContent={<Octicons size={16} color={theme.COLORS.ICON} name="package" />}
                    />
                    <TextInput
                        multiline
                        value={request && request.parcelDetails ? request.parcelDetails.description : ""}
                        numberOfLines={8}
                        minHeight={Platform.OS === 'ios' ? 20 * 8 : null}
                        onChangeText={value => updateParcelDetails('description', value)}
                        placeholder='Package Description'
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={styles.textArea}
                    />
                    <TouchableOpacity onPress={() => onValidation()} style={styles.continueButton}>
                        <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ScrollView>
            <LinearGradient style={styles.pageBackgroundColor} colors={['#fff', '#fff', '#FDD39F', '#FB9211', '#FB9211']} />
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
        backgroundColor: materialTheme.COLORS.PRIMARY,
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
    },
    pageBackgroundColor: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        padding: 30,
        zIndex: -1,
    },
});
