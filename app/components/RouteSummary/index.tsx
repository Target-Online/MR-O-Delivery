
import React, { Component} from 'react'
import { View, Text , TouchableOpacity as Btn, ScrollView, StyleSheet} from 'react-native'
import ParcelIcon from '../../assets/icons/ParcelIcon'
import { withAppContext, IContextProps, IAddress } from '../AppContext'
import BackScreen from '../../layouts/BackScreen'
import Loader from '../../'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { getDistance, getPreciseDistance } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types'
import shadow from 'utils/shadow'

const RouteSummary = (props : IAddressParams) => {

    const {item,dropOffAddress,pickUpAddress,total, isGroceries } = props
    return (

        <View style={styles.orderSummary} >
           {item && <View style={{height : 40, flexDirection : "row",}}>
                <ParcelIcon /> 
                <View style={{marginLeft : 16, }}>
                    <Text numberOfLines={2} >
                    <Text style={{fontSize : 14, fontWeight : "bold"}}>
                        {isGroceries ? `Shopping from`:`Delivering : `}
                    </Text>
                        {item}
                    </Text>
                </View>
            </View>}
            <View style={{height : 80, flexDirection : "row"}}>
                <View style={{width:  20,marginRight : 8,justifyContent:"space-between",paddingVertical:10 ,alignItems: "flex-start"}}>
                    <View style={{width:8,height:8,borderRadius:4,backgroundColor :"#000" }} />
                    <View style={{width:1,height:24,marginLeft : 3.5,borderRadius:4,backgroundColor :"rgba(0,0,0,0.5)" }} />
                    <View style={{width:8,height:8,backgroundColor :"#000" }} />
                </View>

                <View style={{flex:1, height: 80,justifyContent  :"space-between",backgroundColor : "#fff" }}> 
                    {!isGroceries && <View style={styles.textAreaStyles} >
                        <Text numberOfLines={2} style={styles.addressInput} >
                            {pickUpAddress.description}
                        </Text>    
                    </View>}
                    <View style={styles.textAreaStyles} >
                        <Text numberOfLines={2} style={styles.addressInput} >
                        {dropOffAddress.description}
                        </Text>   
                    </View>
                </View>
            </View>
            {total && <View style={{height : 40,justifyContent:"space-between",flexDirection : "row",alignItems : "flex-end"}}>
                <Text>Total</Text>
                <Text>{`N${total}`}</Text>
            </View>}

        </View>
    )
}

export default RouteSummary

const styles = StyleSheet.create({
    orderSummary: {
        marginTop : 24, height: 180,
        width: "88%",borderRadius: 3, 
        justifyContent : "space-between", backgroundColor : "#fff", 
        ...shadow ,padding : 24
    },
    addressInput : { 
      fontSize :  10, 
    },
    textAreaStyles:{
      height : 36, borderRadius : 2,paddingVertical : 4,
      borderWidth : 1, borderColor: "#f9f9f9", 
      paddingHorizontal : 16, justifyContent : "center" 
    },  
})

interface IAddressParams {
    dropOffAddress : IAddress  ,
    pickUpAddress : IAddress,
    item? : string;
    total?: string;
    isGroceries?: boolean;
}
