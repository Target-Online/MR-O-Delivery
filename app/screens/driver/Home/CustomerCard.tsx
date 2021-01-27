import React from "react"
import { Image as RnImg,View,Text } from 'react-native';
import { Colors } from '../../../constants';
import styles from './styles'
import { IAppContext, IOrder } from "types";
import images from '../../../assets/images'

interface Props {
    order : IOrder;
    context : IAppContext
}

const CustomerCard : React.FC<Props> = (props) =>  {  
    
        const {context : {order}} = props
        const { customer , distance,paymentMethod ,items} = order || {}
        const {displayName , firstname} = customer || {}
        const profilePicURL = ""
        const cardSource = profilePicURL || images.headShot
  
        return(
          <View style={{borderBottomWidth : 0.75 , borderBottomColor : Colors.overlayDark10,flexDirection : "row" , height : 74, alignItems : "center", width: "100%"}} >  
            <View style={{width : 40, height : 40, borderRadius : 20, backgroundColor : Colors.overlayDark10 ,marginRight: 12}} >
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
