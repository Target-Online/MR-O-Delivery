import React from 'react'
import Payment from '../screens/user/Payment'
import Contact from '../screens/user/Contact'
import Home from '../screens/user/Home'
import Profile from '../screens/user/Profile'
import PickUp from '../screens/user/PickUp'
import OrderProgress from '../screens/user/OrderProgress'
import About from '../screens/user/About'
import { BottomMenu } from '../components'
import OrderHistory from '../screens/user/OrderScreen/History'
import OrderDetails from '../screens/user/OrderScreen/Details'
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator  initialRouteName="Home" mode="card" headerMode={"none"}>
      <Stack.Screen  name="Home" component={Home}  />
      <Stack.Screen name="OrderProgress" component={OrderProgress} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="PickUpRequest" component={PickUp} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator  initialRouteName="Profile" mode="card" headerMode={"none"}>
      <Stack.Screen  name="Profile" component={Profile}  />
      <Stack.Screen name="AboutUs" component={About} />
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
        <Tab.Screen name="Profile" component={ProfileStack} />
        <Tab.Screen name="Receipts" component={OrderHistory} />
        <Tab.Screen name="Contact" component={Contact} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
  
export default (RNApp)
