import React from "react";
import moment from 'moment';
import {
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    View
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import MapView, { Marker } from 'react-native-maps';

import nowTheme from "../../../constants/Theme";

const TripDetails = (props: any) => {
    const order = props.route.params.order;

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.settings}
        >
            <Block style={styles.rows}>
                <Block row middle space="between" style={{ paddingTop: 7 }}>
                    <Icon
                        name="neuter"
                        family="font-awesome-5"
                        color='green'
                        style={{ paddingRight: 0 }}
                    />
                    <Text size={14} color="#525F7F">{order.pickUpAddress.address}</Text>
                    <Text size={14} color="#525F7F">{moment(order.packagePickupAt).format('HH:ss')}</Text>
                </Block>
            </Block>
            <Block style={styles.rows}>
                <Block row middle space="between" style={{ paddingTop: 7 }}>
                    <Icon
                        name="neuter"
                        family="font-awesome-5"
                        color='red'
                        style={{ paddingRight: 1, transform: [{ rotate: '180deg' }] }}
                    />
                    <Text size={14} color="#525F7F">{order.dropOffAddress.address}</Text>
                    <Text size={14} color="#525F7F">{moment(order.orderCompletedAt).format('HH:ss')}</Text>
                </Block>
            </Block>
            <View style={styles.mapContainer}>
                <MapView
                    region={{
                        latitude: 6.2048043,
                        longitude: 6.6814971,
                        latitudeDelta: 0.01354,
                        longitudeDelta: 0.02454,
                    }}
                    style={styles.mapStyle}
                >
                    <Marker
                        coordinate={order.dropOffAddress.location}
                        title={order.dropOffAddress.address}
                        description={order.dropOffAddress.address}
                    />
                    <Marker
                        coordinate={order.pickUpAddress.address.location}
                        title={order.pickUpAddress.address}
                        description={order.pickUpAddress.address}
                        pinColor={'green'}
                    />
                </MapView>
            </View>
            {order.driver &&
            <Block style={styles.rows}>
                <Block row middle space="between" style={{ paddingTop: 7 }}>
                    <Image source={{ uri: order.driver.profilePicUrl }} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{order.driver.displayName}</Text>
                            <Text style={styles.mblTxt}>{order.driver.vehicleRegistration}</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}>{moment(order.createdAt).format('DD MMM YYYY HH:ss')}</Text>
                        </View>
                    </View>
                </Block>
            </Block>
            }
            <Block center style={styles.title}>
                <Text style={{ padding: 30 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                    Payment Method
                    </Text>
            </Block>
            <Block style={styles.rows}>
                <Block row middle space="between" style={{ paddingTop: 7 }}>
                    <Icon
                        name={true ? 'money' : "credit-card"}
                        family="font-awesome"
                        color='green'
                    />
                    <Text size={14} color="#525F7F">{true ? 'Cash' : 'Card'}</Text>
                    <Text size={14} color="#525F7F">N{order.total}</Text>
                </Block>
            </Block>
            <Block center style={styles.title}>
                <Text style={{ paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                    Need Help ?
                </Text>
            </Block>
            <Block style={styles.rows}>
                <Block row middle center style={{ paddingTop: 7 }}>
                    <Text size={14} color="#525F7F">{'09046659629 / 07042556007'}</Text>
                </Block>
            </Block>
        </ScrollView>
    )
}

export default TripDetails;

const styles = StyleSheet.create({
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
        height: theme.SIZES.BASE * 2,
        paddingHorizontal: theme.SIZES.BASE,
        marginBottom: theme.SIZES.BASE / 2
    },
    mapContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

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
