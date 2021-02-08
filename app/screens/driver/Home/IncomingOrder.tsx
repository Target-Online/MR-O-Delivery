import React from "react"
import { TouchableOpacity as Btn,View,Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants';
import styles from './styles'
import { IAppContext, IOrder } from "types";
import CustomerCard from "./CustomerCard";
import { withAppContext } from "../../../AppContext";
import strings from "constants/strings";
import LocationIcon from "assets/icons/LocationIcon";
import ParcelDetails from "components/ParcelDetails";

interface Props {
    order : IOrder;
    context : IAppContext
    onDone : () =>  void;
}

const IncomingOrder : React.FC<Props> = (props) =>  {  
    
    const {order : {total ,  distance ,status}, order , onAccept} = props
    
    if(order){
        const {pickUpAddress, dropOffAddress } = order || { pickUpAddress : {}, dropOffAddress : {} }
        return(
        <View style={styles.modalInnerContainer}>
            <View style={styles.newReqContainer}>
            {status === "pending" && <Text style={styles.incomingText}>{strings.incomingRequest}</Text>}
            {<CustomerCard />}
            {<ParcelDetails order={order} />}
            <View style={styles.routeSummaryRow}> 
                <View style={styles.routePath}>
                    <View style={styles.pickupIconOutter} >
                    <View style={styles.pickupIconInner} />
                    </View>              
                    <View style={styles.path} />
                    <View style={{width:8,height:8,alignItems : "center" }} >
                    <LocationIcon width={12} height={12} />
                    </View>
                </View>
                <View style={styles.addressesWrapper}>
                    <View style={styles.textAreaStyles} >
                        <Text style={[styles.addressInput,{fontSize :11, color : "grey"}]} >{strings.pickUp}</Text>
                        <Text numberOfLines={2} style={styles.addressInput} > {pickUpAddress.description}</Text>    
                    </View>
                    <View style={innStyles.underline}></View>
                    <View style={styles.textAreaStyles} >
                        <Text style={[styles.addressInput,{fontSize :11, color : "grey"}]} >{strings.dropOff}</Text>
                        <Text numberOfLines={2} style={styles.addressInput} > {dropOffAddress.description}</Text>   
                    </View>
                </View>
                </View>

            <View style={styles.bottomBtnswrapper}>
                <Btn 
                onPress={()=> onAccept && onAccept()} 
                style={[styles.btnStyle, {backgroundColor : Colors.primaryOrange}]} 
                >
                <Text  style={styles.acceptDeclineText} >{strings.accept}</Text>
                </Btn>
            </View>
            </View>
        </View>
        )
    }
    return null

}
const innStyles =  StyleSheet.create({
    underline : {height : 1,backgroundColor: "white", width: "100%",alignSelf : "center"}
})

export default withAppContext(IncomingOrder)