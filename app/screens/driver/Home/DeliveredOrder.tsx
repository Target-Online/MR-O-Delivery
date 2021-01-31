import React from "react"
import { TouchableOpacity as Btn,View,Text } from 'react-native';
import { Colors } from '../../../constants';
import DriverConfirmIcon from '../../../assets/icons/DriverConfirmIcon';
import styles from './styles'
import { IAppContext, IOrder } from "types";
import CustomerCard from "./CustomerCard";
import { withAppContext } from "../../../AppContext";

interface Props {
    order : IOrder;
    context : IAppContext
    onDone : () =>  void;
}

const DeliveredOrder : React.FC<Props> = (props) =>  {  
    
    const {order : {total , paymentMethod , distance} , onDone} = props
    const cashPayment =  paymentMethod === "cash"
    
    return(
        <View style={styles.modalInnerContainer}>
          <View style={[styles.newReqContainer, {height : 430}]}>
            <CustomerCard />
            <View style={{ height: 100, justifyContent :"flex-start", alignItems : "center", backgroundColor : "#fff",paddingTop : 24 }}>
              <DriverConfirmIcon/>
              <Text style={{alignSelf : "center" ,fontSize : 18, color : Colors.overlayDark80}}> Trip Complete </Text> 
              <Text style={[styles.activeTextStyle, {color : Colors.overlayDark30 ,fontSize : 12}]} >Amount due </Text>
              <Text style={[styles.activeTextStyle, {color : Colors.primaryOrange,marginVertical: 4, fontSize : 11, fontWeight : "bold" }]} >
                {`N${total}`}
              </Text>
              <Text style={[styles.activeTextStyle, {color : Colors.overlayDark30, fontSize :12}]}>Distance Travelled </Text>
              <Text style={[styles.activeTextStyle, {color : Colors.primaryOrange,marginVertical: 4,marginBottom : 16,fontSize : 11, fontWeight : "bold" }]}> 
                {`${distance} km`} 
              </Text>
  
              <View style={styles.paymentMethod}>
              <Text style={{fontWeight : "bold", fontSize :12, color : "green" }} >{cashPayment || true ? "Cash Payement" : "Card Payment"}</Text>
          </View>
          {cashPayment && <Text style={{fontSize : 8, color : "red", marginTop: 8}}>*Please remember to collect cash upon deliver</Text> }         
              <View style={styles.addressesWrapper}>               
              </View>
            </View>

            <View style={[styles.bottomBtnswrapper,{flexDirection : "column",alignItems : "center" } ]}>
              <Btn onPress={()=> onDone && onDone()} 
                style={[styles.btnStyle, {backgroundColor : Colors.primaryOrange ,width : 192}]} >
                <Text  style={styles.acceptDeclineText} > Done </Text>
              </Btn>

            </View>
          </View>
        </View>
      )
}

export default withAppContext(DeliveredOrder)