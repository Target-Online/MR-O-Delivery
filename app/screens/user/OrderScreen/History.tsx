import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import { OrdersContext } from "../../../Store";

import images from '../../../assets/images'

const OrderHistory = (props: any) => {
  const [orders] = useContext(OrdersContext);
  console.log("orders", orders)

  return (
    <View style={styles.container}>
      <ImageBackground  source={images.homeBg} style={{ width: "100%", height: "100%", }}>
        <FlatList
          style={styles.eventList}
          data={orders.data.reverse()}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetails')}>
                <View style={styles.eventBox}>
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDay}>{item.day}</Text>
                    <Text style={styles.eventMonth}>{item.month}</Text>
                  </View>
                  <View style={styles.eventContent}>
                    <Text style={styles.eventDateTime}>21 Jan 2020 13:43</Text>
                    <View style={styles.tripDetails}>
                      <Text style={styles.description}>Pick Up</Text>
                      <Text style={styles.description}>N130</Text>
                    </View>
                    <Text style={styles.destination}>No.3 Olise Okolie Street, Asaba, Delta State, Nigeria</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }} />
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
    fontSize: 50,
    color: "#fff",
    fontWeight: "600"
  },
  eventMonth: {
    fontSize: 16,
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
});