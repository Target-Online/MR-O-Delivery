import React from 'react'
import OTPScreen from '../screens/login/OTPScreen'
import PhoneNumberCapture from '../screens/login/PhoneNumberCapture'
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none"  initialRouteName={"OTPScreen"} >
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="PhoneNumberCapture" component={PhoneNumberCapture} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default (AuthStack)
