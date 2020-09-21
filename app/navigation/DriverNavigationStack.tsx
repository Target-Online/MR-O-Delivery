import React from 'react'
import Payment from '../screens/user/Payment'
import Contact from '../screens/user/Contact'
import Home from '../screens/driver/Home'
import Profile from '../screens/user/Profile'
import PickUp from '../screens/user/PickUp'
import OrderProgress from '../screens/user/OrderProgress'
import { BottomMenu } from '../components'
import OrderHistory from '../screens/driver/OrderScreen'
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator initialRouteName="Home" mode="card" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="OrderProgress" component={OrderProgress} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="PickUpRequest" component={PickUp} />
    </Stack.Navigator>
  );
}

function RNApp(props) {

  console.log("inside stack",props.isDriver)
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <BottomMenu  {...props} />} >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Receipts" component={OrderHistory} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

  

export default (RNApp)
