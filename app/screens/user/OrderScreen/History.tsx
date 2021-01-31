import React, { useContext } from 'react';
import moment from 'moment';
import {
  Text,View, FlatList, TouchableOpacity,
  ImageBackground, RefreshControl } from 'react-native';
import {historyStyles as styles} from "./styles"
import { CurrentUserContext, OrdersContext } from "../../../Store";
import images from 'assets/images'
import strings from 'constants/strings';

const OrderHistory = (props: any) => {
  
  const [orders] = useContext<any>(OrdersContext);
  const [currentUser] = useContext<any>(CurrentUserContext)
  const data = orders.data.filter((o: any) => o.customer && o.customer.id == currentUser.id)

  return (
    <View style={styles.container}>
      <ImageBackground source={images.homeBg} style={{ width: "100%", height: "100%", }}>
        {orders.length === 0 && !orders.inProgress
          ? <FlatList
            refreshControl={<RefreshControl
              colors={["orange", "#689F38"]}
              refreshing={orders.inProgress}
            />}
            style={styles.eventList}
            data={data.reverse()}
            keyExtractor={(item: any) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetails', { order: item })}>
                  <View style={styles.eventBox}>
                    <View style={styles.eventDate}>
                      <Text style={styles.eventDay}>{moment(item.createdAt).format('DD')}</Text>
                      <Text style={styles.eventMonth}>{moment(item.createdAt).format('MMM')}</Text>
                    </View>
                    <View style={styles.eventContent}>
                      <Text style={styles.eventDateTime}>{moment(item.createdAt).format('DD MMM YYYY HH:ss')}</Text>
                      <View style={styles.tripDetails}>
                        <Text style={styles.description}>{item.orderType}</Text>
                        <Text style={styles.description}>{item.total && `N${item.total}`}</Text>
                      </View>
                      <Text style={styles.destination}>{item.dropOffAddress && item.dropOffAddress.description}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
          : <View style={styles.noDataText}>
            <Text style={{ color: '#fff' }}>{strings.noOrderHistory}</Text>
          </View>
        }
      </ImageBackground>
    </View>
  );
}

export default OrderHistory;
