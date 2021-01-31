import React from "react"
import { Image as RnImg,View,Text } from 'react-native';
import styles from './styles'
import { IAppContext, IOrder } from "types";
import images from '../../../assets/images'
import { withAppContext } from "../../../AppContext";

interface Props {
    order : IOrder;
    context : IAppContext
}

const CustomerCard : React.FC<Props> = (props) =>  {  
    
        const {context : {order}} = props
        const { customer , distance,paymentMethod } = order || {}
        const {displayName , firstname} = customer || {}
        const profilePicURL = ""
        const cardSource = profilePicURL || images.headShot
  
        return(
          <View style={styles.customerCard} >  
            <View style={styles.headShot} >
              <RnImg style={{width : "100%", height : "100%"}} source={cardSource} />
            </View>
            <View style={{height : "100%",width : "100%",justifyContent : "center"}}>
       
              <Text style={styles.customerHeader} >{displayName || firstname}</Text>
              <Text style={styles.customerHeader} >{`${distance} km`}  
                <Text style={[styles.activeTextStyle,{marginLeft : 32}]} >{` ${paymentMethod || "Cash"} Payment`}</Text>
              </Text>
  
            </View>
          </View>
        )
}

export default withAppContext(CustomerCard)
