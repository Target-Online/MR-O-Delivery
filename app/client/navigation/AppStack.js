import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawerContent from './Menu';
import { materialTheme } from "../constants/";
import OnboardingScreen from '../screens/Onboarding';
import { 
    Home, 
    Driver,
    ShoppingList,
    ProfileStack, 
    ParcelDetails, 
    FindingDriver, 
    Payment, 
    RequestsHistoryStack,
    SettingsStack,
    ShoppingDetails
} from "./Screens";
import { CurrentUserContext } from '../Store';

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("screen");

export function AppStack() {
    const [currentUser] = useContext(CurrentUserContext);
    return (
      <Drawer.Navigator
        style={{ flex: 1 }}
        drawerContent={props => (
          <CustomDrawerContent {...props} />
        )}
        drawerStyle={{
          backgroundColor: "white",
          width: width * 0.8
        }}
        drawerContentOptions={{
          activeTintColor: "white",
          inactiveTintColor: "#000",
          activeBackgroundColor: materialTheme.COLORS.ACTIVE,
          inactiveBackgroundColor: "transparent",
          itemStyle: {
            width: width * 0.74,
            paddingHorizontal: 12,
            justifyContent: "center",
            alignContent: "center",
            overflow: "hidden"
          },
          labelStyle: {
            fontSize: 18,
            fontWeight: "normal"
          }
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen
          name="Home"
          component={currentUser && currentUser.isDriver ? Driver : Home}
        />
        {!currentUser.isDriver  && (
          <Drawer.Screen
            name="Profile"
            component={ProfileStack}
          />
        )}
        <Drawer.Screen
          name="History"
          component={RequestsHistoryStack}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsStack}
        />
        <Drawer.Screen
          name="Logout"
          component={OnboardingScreen}
        />
        <Drawer.Screen
          name="Parcel Details"
          component={ParcelDetails}
        />
        <Drawer.Screen
          name="Shopping"
          component={ShoppingDetails}
        />
        <Drawer.Screen
          name="Shopping List"
          component={ShoppingList}
        />
        <Drawer.Screen
          name="Payment"
          component={Payment}
        />
        <Drawer.Screen
          name="Finding Driver"
          component={FindingDriver}
        />
      </Drawer.Navigator>
    );
  }