import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import RequestsHistoryScreen from '../screens/RequestsHistory';
import RequestDetailsScreen from '../screens/RequestsHistory/RequestDetails';
import ChatRoomScreen from '../screens/RequestsHistory/RequestDetails/Chat';
import FindingDriverScreen from '../screens/FindingDriver';
import HomeScreen from '../screens/Home';
import DriverScreen from '../screens/Driver';
import ShoppingListScreen from '../screens/Driver/ShoppingList';
import ParcelDetailsScreen from '../screens/ParcelDetails';
import ShoppingDetailsScreen from '../screens/Shopping';
import PaymentScreen from '../screens/Payment';
import LoginScreen from '../screens/Login/Login';
import OnboardingScreen from '../screens/Onboarding';
import ProfileScreen from '../screens/Profile';
import SettingsScreen from '../screens/Settings';
import AboutScreen from '../screens/Settings/About';
import PrivacyPolicyScreen from '../screens/Settings/PrivacyPolicy';
import TermsAndConditionsScreen from '../screens/Settings/TermsAndConditions';
import { Header } from '../components';
import { AppStack } from "./AppStack";

const Stack = createStackNavigator();

export function ProfileStack() {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

export function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header white title="Settings" scene={scene} navigation={navigation} />
          )
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back white title="About" navigation={navigation} scene={scene} />
          ),
        }}
      />
      <Stack.Screen
        name="Privacy Policy"
        component={PrivacyPolicyScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back white title="Privacy Policy" navigation={navigation} scene={scene} />
          ),
        }}
      />
      <Stack.Screen
        name="Terms & Conditions"
        component={TermsAndConditionsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back white title="Terms & Conditions" navigation={navigation} scene={scene} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export function RequestsHistoryStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="History"
        component={RequestsHistoryScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="History" white scene={scene} navigation={navigation} />
          )
        }}
      />
      <Stack.Screen
        name="Request Details"
        component={RequestDetailsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back white title="Request Details" navigation={navigation} scene={scene} />
          ),
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatRoomScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back white title="Chat" navigation={navigation} scene={scene} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export function Home() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              white
              title="Home"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

export function Driver() {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Driver"
        component={DriverScreen}
      />
    </Stack.Navigator>
  );
}

export function ShoppingList() {
  return (
    <Stack.Navigator mode="card"  initialRouteName="Shopping List"  headerMode="screen">
      <Stack.Screen
        name="Shopping List"
        component={ShoppingListScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back white title="Shopping List" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

export function Payment() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back white title="Payment" navigation={navigation} scene={scene} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export function FindingDriver() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Finding Driver"
        component={FindingDriverScreen}
      />
    </Stack.Navigator>
  );
}

export function ParcelDetails() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Parcel Details"
        component={ParcelDetailsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back white title="Parcel Details" navigation={navigation} scene={scene} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export function ShoppingDetails() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Shopping"
        component={ShoppingDetailsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back white title="Shopping Details" navigation={navigation} scene={scene} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="App"
        component={AppStack}
      />
    </Stack.Navigator>
  );
}