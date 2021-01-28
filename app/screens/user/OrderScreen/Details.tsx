import React, { useRef } from "react"
import moment from 'moment'
import { StyleSheet,Image,ScrollView,Dimensions,View,Text} from "react-native"
import { Block, theme, Icon } from "galio-framework"
import MapView, { Marker } from 'react-native-maps'
import nowTheme from "../../../constants/Theme"
import * as images from '../../../assets/images'
import strings from "@constants/strings"
const { width } = Dimensions.get("window")

const TripDetails = (props: any) => {
    const order = props.route.params.order
    const mapRef = useRef(null);

    return (
        <View style={{flex : 1}}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{flex : 1 , width}}
                contentContainerStyle={styles.settings}
            >
                <Block style={styles.rows}>
                    <Block row middle space="between" style={{ paddingTop: 7 }}>
                        <Icon
                            name="neuter"
                            family="font-awesome-5"
                            color='green'
                            style={{ marginRight: 8 }}
                        />
                        <Text  style={styles.addressText} numberOfLines={2} color="#525F7F">{order.pickUpAddress && order.pickUpAddress.description.substring(0, 50)}</Text>
                        <Text  color="#525F7F">{moment(order.collectedAt).format('HH:ss')}</Text>
                    </Block>
                </Block>
                <Block style={styles.rows}>
                    <Block row middle space="between" style={{ paddingTop: 7 }}>
                        <Icon
                            name="neuter"
                            family="font-awesome-5"
                            color='red'
                            style={{ marginRight: 8, transform: [{ rotate: '180deg' }] }}
                        />
                        <Text  style={styles.addressText} color="#525F7F">{order.dropOffAddress && order.dropOffAddress.description.substring(0, 50)}</Text>
                        <Text  color="#525F7F">{moment(order.deliveredAt).format('HH:ss')}</Text>
                    </Block>
                </Block>
                <View style={styles.mapContainer}>
                    {order.pickUpAddress &&
                    <MapView
                        ref={mapRef}
                        region={{
                            ...order.pickUpAddress.location,
                            latitudeDelta: 0.01354,
                            longitudeDelta: 0.02454,
                        }}
                        style={styles.mapStyle}
                        onPress={() => mapRef && mapRef!.current.fitToSuppliedMarkers(['pick-up','drop-off'])}
                        onMapReady={() =>  mapRef && mapRef.current.fitToSuppliedMarkers(['pick-up','drop-off'])}
                        onLayout={() => mapRef &&  mapRef.current.fitToSuppliedMarkers(['pick-up','drop-off'])}
                    >
                        <Marker
                            coordinate={order.dropOffAddress.location}
                            title={order.dropOffAddress.address}
                            description={order.dropOffAddress.address}
                            identifier={'drop-off'}
                        />
                        {order.pickUpAddress && 
                        <Marker
                            coordinate={order.pickUpAddress.location}
                            title={order.pickUpAddress.address}
                            description={order.pickUpAddress.address}
                            pinColor={'green'}
                            identifier={'pick-up'}
                        />}
                    </MapView>}
                </View>
                {order.driver &&
                <Block style={styles.rows}>
                    <Block row middle space="between" style={{ paddingTop: 7 }}>
                        <Image source={order.driver.profilePicUrl ? { uri: order.driver.profilePicUrl} : images.default.userPlaceholder } style={styles.pic} />
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
                        {strings.paymentMethod}
                        </Text>
                </Block>
                <Block style={styles.rows}>
                    <Block row middle space="between" style={{ paddingTop: 7 }}>
                        <Icon
                            name={true ? 'money' : "credit-card"}
                            family="font-awesome"
                            color='green'
                        />
                        <Text  color="#525F7F">{true ? 'Cash' : 'Card'}</Text>
                        <Text  color="#525F7F">N{order.total}</Text>
                    </Block>
                </Block>
                <Block center style={styles.title}>
                    <Text style={{ paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                        Need Help ?
                    </Text>
                </Block>
                <Block style={styles.rows}>
                    <Block row middle center style={{ paddingTop: 7 }}>
                        <Text  color="#525F7F">{'09046659629 / 07042556007'}</Text>
                    </Block>
                </Block>
            </ScrollView>
        </View>
    )
}

export default TripDetails