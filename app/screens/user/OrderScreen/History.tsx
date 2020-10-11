import React, { useContext } from 'react';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  RefreshControl
} from 'react-native';

import { CurrentUserContext, OrdersContext } from "../../../Store";
import images from '../../../assets/images'
import orders from "./testData";

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
            <Text style={{ color: '#fff' }}>No order history.</Text>
          </View>
        }
      </ImageBackground>
    </View>
  );
}

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#DCDCDC",
  },
  eventList: {
    marginTop: 20,
    //backgroundColor: 'rgba(0,0,0,0.3)'
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