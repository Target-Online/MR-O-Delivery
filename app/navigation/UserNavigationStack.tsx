import React from 'react'
import Payment from '../screens/user/Payment'
import Contact from '../screens/user/Contact'
import Home from '../screens/user/Home'
import Profile from '../screens/user/Profile'
import PickUp from '../screens/user/PickUp'
import OrderProgress from '../screens/user/OrderProgress'
import Auth from '../screens/user/Auth'
import SignIn from '../screens/user/Auth/SignIn'
import SignUp from '../screens/user/Auth/SignUp'
import ForgotPassword from '../screens/user/Auth/ForgotPassword'
import { BottomMenu } from '../components'
import OrderHistory from '../screens/user/OrderScreen/History'
import OrderDetails from '../screens/user/OrderScreen/Details'

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const noOptions = {
  header : null
}

function HomeStack() {
  return (
    <Stack.Navigator  initialRouteName="Components" mode="card" headerMode="screen">
      <Stack.Screen  name="Home" component={Home}  />
      <Stack.Screen name="OrderProgress" component={OrderProgress} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="PickUpRequest" component={PickUp} />
    </Stack.Navigator>
  );
}

function RNApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <BottomMenu  {...props} />} >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="OrderHistory" component={OrderHistory} />
        <Tab.Screen name="OrderDetails" component={OrderDetails} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Receipts" component={OrderHistory} />
        <Tab.Screen name="Contact" component={Contact} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
  
export default (RNApp)
