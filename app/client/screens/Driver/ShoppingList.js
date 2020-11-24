import React from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Input, Block } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { CurrentUserContext, SessionContext } from '../../Store';
import { materialTheme } from '../../constants';
import { shadow } from '../../constants/utils';
import { Icon } from '../../components';
import { toastInfo } from '../../utils/notifications';
import { update } from '../../api';

const { width, height } = Dimensions.get('screen');

export default function ShoppingList(props) {
    const [currentUser] = React.useContext(CurrentUserContext);
    const [request, setRequest] = React.useContext(SessionContext);

    const onEditAmount = (amount, item) => setRequest({
        ...request,
        shoppingList:
            request.shoppingList.map(i =>
                i.id === item.id
                    ? { ...item, amount: amount }
                    : i
            )
    })

    const onEditItemAvailability = (item) => {
        if (currentUser.isDriver && request.status && !request.status.driverHasConfirmedPrices) {
            setRequest({
                ...request,
                shoppingList:
                    request.shoppingList.map(i =>
                        i.id === item.id
                            ? { ...item, isUnavailable: !item.isUnavailable }
                            : i
                    )
            })
        }
    }

    const onSubmit = () => {
        var incompleteItem = request.shoppingList.find(i => !i.isUnavailable && !(parseInt(i.amount) >= 0));
        if (incompleteItem) {
            toastInfo(`Enter price amount for ${incompleteItem.name}`)
        }
        else if (request.status.driverOnShoppingRoute) {
            toastInfo(`Confirm prices when you get to shopping center.`)
        }
        else {
            update('requests', request.id, {
                currentStep: 2,
                shoppingList: request.shoppingList,
                shoppingCost: Math.round(
                    request.shoppingList.map(
                        i => !i.isUnavailable && (parseInt(i.amount) * i.quantity))
                        .reduce((a, c) => a + c)),
                status: {
                    ...request.status,
                    driverHasConfirmedPrices: true
                }
            });
            props.navigation.goBack();
        }
    }


    const ItemCard = ({ item }) => {
        const [amount, setAmount] = React.useState(item.amount);

        return (
            <TouchableOpacity onPress={() => { }} style={[styles.itemCard, { backgroundColor: item.isUnavailable ? materialTheme.COLORS.MUTED : materialTheme.COLORS.SECONDARY }]}>
                <View style={styles.itemNameAndDec}>
                    <Text size={20} color='white' bold center>{`${item.name} X ${item.quantity}`}</Text>
                    <Text size={15} color='black' center>{item.description}</Text>
                </View>
                <View style={styles.itemInputs}>
                    <Input
                        key={item.id}
                        right
                        placeholder='amount'
                        value={amount}
                        editable={currentUser.isDriver ? true : false}
                        onEndEditing={() => onEditAmount(amount, item)}
                        color={materialTheme.COLORS.PRIMARY}
                        type='numeric'
                        onChangeText={value => setAmount(value)}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        iconContent={<Icon size={16} name="attach-money" family="MaterialIcons" />}
                    />
                    <TouchableOpacity onPress={() => onEditItemAvailability(item)} style={[styles.button, { backgroundColor: materialTheme.COLORS.SECONDARY }]}>
                        <Text size={13} color='black'>{item.isUnavailable ? 'Unavailable' : 'Available'}</Text>
                    </TouchableOpacity>
                </View>
                <LinearGradient
                    style={styles.pageBackgroundColor}
                    colors={item.isUnavailable ? ['gray', 'gray'] : ['#FFCB9D', '#FFCB9D', 'orange', '#FB9211']}
                />
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView contentContainerStyle={{ minheight: height }}>
            {request.shoppingList && request.shoppingList.map((item, index) => <ItemCard item={item} key={index} />)}
            {currentUser && currentUser.isDriver
                ? !request.status.driverHasConfirmedPrices &&
                <TouchableOpacity onPress={() => onSubmit()} style={[styles.button, { margin: 15, alignSelf: 'center', width: '97%', backgroundColor: materialTheme.COLORS.PRIMARY }]}>
                    <Text size={13} color='white'>Submit</Text>
                </TouchableOpacity>
                : request.status.driverHasConfirmedPrices &&
                <Block center style={styles.totalInfo}>
                    <Text italic bold center h4 color='white'>{`Total: N${request.shoppingCost}`}</Text>
                </Block>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingTop: Platform.OS === 'ios' ? 14 : 10,
        borderRadius: 5,
        alignItems: 'center',
        height: 40,
        ...shadow
    },
    itemCard: {
        margin: 5,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        height: height * 0.2,
        flexDirection: 'row',
        ...shadow
    },
    itemNameAndDec: {
        justifyContent: 'space-around',
        height: height * 0.2,
        width: width / 2,
        borderWidth: 0,
        borderColor: 'red'
    },
    itemInputs: {
        justifyContent: 'space-around',
        height: height * 0.19,
        width: width / 2.25,
        borderWidth: 0,
        borderColor: 'green'
    },
    pageBackgroundColor: {
        position: 'absolute',
        borderRadius: 5,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        padding: 30,
        zIndex: -1,
    },
    totalInfo: {
        paddingTop: Platform.OS === 'ios' ? 14 : 10,
        borderRadius: 5,
        alignItems: 'center',
        height: 40,
        marginVertical: 10,
        height: 50,
        backgroundColor: '#FB9211',
        width: '97%',
        ...shadow
    }
});
