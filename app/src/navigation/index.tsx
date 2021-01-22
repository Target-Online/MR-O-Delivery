import React, { Component, useContext, useState, useEffect } from 'react'
import { StatusBar, View, ActivityIndicator } from 'react-native'
import { Colors } from '../constants'
import AuthStack from './AuthStack'
import NavigationStack  from './UserNavigationStack'
import DriverNavigationStack  from './DriverNavigationStack'
import { IUser, withAppContext, IContextProps } from '../context/AppContext'
import _ from 'lodash'
import { useKeepAwake } from 'expo-keep-awake';

type IProps =  IContextProps  & { user : any; profile : IUser; }
const AppNavigator : any = (props: IProps) => {

    const {currentUser, users}  = props.context
    const driverCheck = (phoneNumber : string) =>{
      let res = users.data.find(u =>  u.id == phoneNumber && u.isDriver)
      return !_.isEmpty(res)
    }

    function renderStack(){
      const isDriver =  false //driverCheck(currentUser.phoneNumber)
      return isDriver ? <DriverNavigationStack isDriver={isDriver} /> : <NavigationStack isDriver={isDriver} />
    }

    function renderLoader(){
      return (
        <View style={{flex : 1 , width : "100%" , height : "100%", justifyContent : "center"}}>
            <ActivityIndicator size={"large"} color={Colors.primaryOrange}  />
        </View>
      )
    }

    useKeepAwake()

    return [
      <StatusBar backgroundColor ={Colors.focusColor}
        barStyle = 'dark-content'
        hidden = {false}
        key={1}
      />,
      users.inProgress ? renderLoader() : currentUser ? renderStack() : <AuthStack  />
    ]
}

export default withAppContext(AppNavigator)
