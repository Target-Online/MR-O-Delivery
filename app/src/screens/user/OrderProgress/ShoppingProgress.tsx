import React, { Component} from 'react'
import { View, Text , TouchableOpacity as Btn , FlatList} from 'react-native'
import InfoIcon from '@assets/icons/InfoIcon'
import BackScreen from '@layouts/BackScreen'
import { IContextProps, withAppContext } from '@context/AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import firebase from 'firebase'
import { getOrderTotal } from  '@utils/orderModules'
import UserCard from '@components/UserCard'
import ShoppingListItem from '@components/ShoppingListItem'
import { Colors } from '@constants'
import { withOrdersContext } from 'context/OrdersContext'

import styles from "./progressStyles"

type IProps = IContextProps &
StackScreenProps<{navigation : any}> ;

class ShoppingProgress extends Component<IProps> {
    constructor (props) {
      super(props)
    }

    componentDidMount(){
        const {context : {order,setOrder}} = this.props
        var ref = firebase.database().ref(`orders/${order.orderId}`);
        ref.on('value', function(snapshot) {
            if(snapshot.val()){ setOrder(snapshot.val()) }
        })
    }

    removeItem = (index : number) => {
        const {context : {setAlertData, setShowAlert}} = this.props
        setAlertData({ text: "Remove this item from your list ?" ,buttons : [ {label : "Yes",onPress : ()=>{ this.deleteItem(index) }}, {label : "No",onPress : ()=>{}} ],title : "Remove",})
        setShowAlert(true)
    }

    deleteItem = (index : number) =>{
        const {context : {updateOrderStatus, order,setOrder}} = this.props
        const {items, orderId}  = order
        let itemsCopy = [...items]
        delete itemsCopy[index]
        itemsCopy = itemsCopy.filter((i)=> i)
        const newOrderObject = {...order, items : itemsCopy}
        setOrder(newOrderObject)
        updateOrderStatus(orderId, newOrderObject)  
    }

    confirmOrderTotal = (total : number) =>{
        const {context : {updateOrderStatus, order}} = this.props
        updateOrderStatus(order.orderId, {...order, total})
        this.props.navigation.navigate("Payment")
    }

    render () {
        const {context : { order }} = this.props
        const { items, driver,distance }  = order
        const { displayName }  = driver || {} 
        const itemsCost  = items.reduce((prev,next)=> { return Number(prev) + Number(next.price) }, 0) || 0

        const allPriced = items && items.reduce((prev,next)=> { return prev &&  (next.price || next.outOfStock) },true)
        const deliveryCost =  getOrderTotal(distance)
        return ( 
            <BackScreen 
                title={"Confirm Your Order"}
                navigation={this.props.navigation}          
            >
                <View style={{flex : 1 , }}>
                   <UserCard user={driver} />
                   <View style={styles.nbCard}>

                        <InfoIcon fill={Colors.primaryOrange} />
                        <Text style={styles.nbText} > { allPriced  ? `${displayName} has confirmed the prices and stock availability. Press continue to confirm your order.` :
                        `We have to wait for ${displayName} to confirm the prices and stock availability`
                        } </Text>

                    </View>
                    <View style={{height: 30,marginTop : 16, paddingHorizontal : 24, width : "100%", justifyContent : "center" }}>
                        <Text style={{fontSize : 18, fontWeight : "bold"}}>Your Shopping List</Text>
                    </View>

                    <FlatList 
                        data={items}
                        contentContainerStyle={{ flex : 1,width : "100%",paddingHorizontal : 24}}
                        style={{flex : 1, width : "100%" }}
                        renderItem={({item,index})=>(
                            <ShoppingListItem onDelete={()=>{ this.removeItem(index) }}  item={item} />
                        )}
                    />
                    {itemsCost > 0 && <View style={styles.orderSummary}>
                        <Text style={styles.summaryHead}> {`Your Order Summary`} </Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.slipSubHead} >Items Cost</Text>
                        <Text style={styles.slipAmount}>{`N ${itemsCost}`}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.slipSubHead} >Delivery Fee  </Text>
                            <Text style={styles.slipAmount}>{`N ${deliveryCost}`}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryHead} >Order Total </Text>
                            <Text style={[styles.summaryHead ,styles.slipAmount]}>{`N ${itemsCost+deliveryCost}`}</Text>
                        </View>
                    </View>}

                    <Btn disabled={!allPriced} onPress={()=> this.confirmOrderTotal(itemsCost+deliveryCost)} style={styles.continueBtn}>
                        <Text style={{fontSize : 16 , fontWeight : "bold", color : "white"}}>
                            Continue
                        </Text>
                    </Btn>
                
                </View>
            </BackScreen>
      )
    }

}

export default withAppContext(withOrdersContext(ShoppingProgress))
