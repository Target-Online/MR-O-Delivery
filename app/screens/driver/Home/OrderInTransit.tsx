import React from "react"
import { TouchableOpacity as Btn,View,Text } from 'react-native';
import { Colors } from '../../../constants';
import styles from './styles'
import { IAppContext, IOrder, OrderState } from "types";
import CustomerCard from "./CustomerCard";
import { withAppContext } from "../../../AppContext";
import ParcelDetails from "components/ParcelDetails";
import strings from "constants/strings";
import LocationIcon from "assets/icons/LocationIcon";

interface Props {
    order : IOrder;
    orderStatus : OrderState;
    context : IAppContext
    onButtonPress : () =>  void;
    onGetDirections : () => void;
}

const OrderInTransit : React.FC<Props> = (props) =>  {  
    
    const { orderStatus , onGetDirections , onButtonPress} = props    
    const {order : {pickUpAddress, dropOffAddress , orderType ,  customer }} = props.context
    const orderCollected = orderStatus === "collected"
    const isGroceries =  orderType === "Shopping"

    return(
      <View style={styles.modalInnerContainer}>
       <View style={styles.newReqContainer}>
        <CustomerCard />
        <ParcelDetails order={props.order} />
        <Text style={{alignSelf : "center" , marginVertical : 4}} >{
          !orderCollected ? (isGroceries ? strings.goPurchase.replace("{0}",customer.displayName) : strings.onRouteCollect) :
           strings.droppingOff} 
        </Text>
        <View style={styles.newReqInnerContainer}>        
            <View style={[styles.routePath,{height : 42} ]}>
              <View style={{width:8,height:8,alignItems : "center" }} >
                <LocationIcon width={12} height={12} />
              </View>
            </View>
            <View style={[styles.addressesWrapper,{height : 42}]}>                
                <View style={styles.textAreaStyles} >
                    <Text style={[styles.addressInput,{fontSize :12, color : "grey"}]} > {orderCollected? "Drop-Off" : isGroceries ? "Store Address" : "Pick-Up"}</Text>
                    <Text numberOfLines={2} style={styles.addressInput} >
                      {orderCollected ? dropOffAddress.description : pickUpAddress.description }
                    </Text>   
                </View>
            </View>
          </View>

          <View style={[styles.bottomBtnswrapper,{flexDirection : "column",height : 130,alignItems : "center" } ]}>
            <Btn
              onPress={() => onGetDirections && onGetDirections()}
              style={[styles.btnStyle , { backgroundColor : "#fff", borderWidth : 1 , borderColor : Colors.overlayDark70 ,width : 192} ]}>
              <Text style={[styles.acceptDeclineText,{color : Colors.overlayDark70, }]} >{strings.getDirections}</Text>
            </Btn>
            <Btn onPress={()=>{ onButtonPress && onButtonPress() }} 
              style={[styles.btnStyle, {backgroundColor : Colors.primaryOrange, width : 192,marginTop:4 }]} >
              <Text  style={styles.acceptDeclineText} >
                {orderCollected ? strings.confirmDelivery : isGroceries ? strings.viewList: strings.confirmCollection }
              </Text>
            </Btn>
          </View>
        </View>
      </View>
    )
}

export default withAppContext(OrderInTransit)