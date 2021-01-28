import React, { Component} from 'react'
import { View, Text , TouchableOpacity as Btn, Image, StyleSheet , ScrollView, Dimensions, FlatList} from 'react-native'
import InfoIcon from '../../../assets/icons/InfoIcon'
import BackScreen from '../../../layouts/BackScreen'
import { IContextProps, withAppContext } from '../../../AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import firebase from 'firebase'
import UserCard from '../../../components/UserCard'
import ShoppingListItem from '../../../components/ShoppingListItem'
import { Colors } from '../../../constants'
import { getOrderTotal } from '../../../utils/orderModules'
import {confirmStyles as styles} from "./styles"
const  { width, height } = Dimensions.get('window')


type IProps = IContextProps & { onConfirmed : () => void; } & StackScreenProps<{navigation : any}> ;
const orderProgress = [ "pending", "confirmed" , "collected" , "delivered"]

class ConfirmItems extends Component<IProps> {
    constructor (props) {
      super(props)
    }

    componentDidMount(){
        const {context : {sendRequest , order,setOrder, drivers, getAllDrivers}} = this.props
        const {orderId} = order
        var ref = firebase.database().ref(`orders/${orderId}`);
        ref.on('value', function(snapshot) {
            if(snapshot.val()){
                const order = snapshot.val()
                setOrder(order)
            }
        });

    }


    removeItem = (index : number) => {
        const {context : {updateOrderStatus , order }} = this.props
        const {items, orderId}  = order
        let itemsCopy = [...items]
        delete itemsCopy[index]
        itemsCopy = itemsCopy.filter((i)=> i)
        const newOrderObject = {...order, items : itemsCopy}
        updateOrderStatus(orderId, newOrderObject)  
    }

    updatePrice = (index : number, price : any ) => {
        const {context : {updateOrderStatus , order }} = this.props
        const { items, orderId}  = order
        let itemsCopy = [...items]
        itemsCopy[index] = { ...itemsCopy[index] , price }
        const newOrderObject = {...order, items : itemsCopy}
        updateOrderStatus(orderId, newOrderObject)
    }

    markOutOfStock = (index : number ) => { 
        const {context : {updateOrderStatus , order,setOrder }} = this.props
        const { items, orderId}  = order
        let itemsCopy = [...items]
        itemsCopy[index] = { ...itemsCopy[index] , outOfStock : true }
        const newOrderObject = {...order, items : itemsCopy}
        setOrder(newOrderObject)
        updateOrderStatus(orderId, newOrderObject)
    }
    
    badgeText = () => {
        const {context : {order}} = this.props
        const {items,customer, orderConfirmed}  = order
        const allPriced = items && items.reduce((prev,next)=> { return prev  &&  next.price  },true)
        console.log({allPriced})
        const displayText = allPriced ? !orderConfirmed ? `Please wait for ${customer.displayName}'s to confirm the prices and the items.`:
        `You may proceed and buy the items in ${customer.displayName}'s list. When done, press contiue` : 
        `Please confirm the store prices for items in ${customer.displayName}'s list.`

        return displayText
    }

    render () {

        const {context : {order },onConfirmed} = this.props
        const { items,customer, orderConfirmed, distance  }  = order
        const inStockItems = items.filter(item => !item.outOfStock)
        const ready  = inStockItems.reduce((prev,next)=> { return prev  &&  next.price },true) && orderConfirmed
        const allPriced = items && items.reduce((prev,next)=> { return prev &&  next.price },true)
        const itemsCost  = items.reduce((prev,next)=> { return Number(prev) + Number(next.price) }, 0) 
        const deliveryCost =  getOrderTotal(distance)

        return ( 
            <BackScreen 
                // scroll
                title={"Order Confirmation"}
                navigation={this.props.navigation}          
            >
                <ScrollView style={{ minHeight: height * items.length, flex : 1}}>
                   <UserCard isUser  user={customer} />
                   <View style={styles.nbCard}>
                        <InfoIcon fill={Colors.primaryOrange} />
                        <Text style={styles.nbText} > {this.badgeText()} </Text>
                    </View>
                    <View style={{height: 30,marginTop : 16, paddingHorizontal : 24, width : "100%", justifyContent : "center" }}>
                        <Text style={{fontSize : 18, fontWeight : "bold"}}>{`${customer.displayName}'s Shopping List`}</Text>
                    </View>
                    <FlatList 
                        data={items}
                        contentContainerStyle={{
                            flex : 1,width : "100%",
                            paddingHorizontal : 24
                        }}
                        // ListEmptyComponent={this.renderListEmpty()}
                        style={{flex : 1, width : "100%" }}
                        renderItem={({item,index})=>(
                            <ShoppingListItem 
                                driverVariant 
                                markOutOfStock={()=> this.markOutOfStock(index)}
                                onPriceEnter={(price : string)=> this.updatePrice(index,price)} 
                                onDelete={()=>{ this.removeItem(index) }}  item={item} 
                            />
                        )}
                    />
                    {allPriced && <View style={styles.orderSummary}>
                        <Text style={styles.summaryHead}> {`${customer.displayName}'s Order Summary`} </Text>
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

                    <Btn  
                        onPress={()=>{
                        onConfirmed && onConfirmed()
                        }}
                        disabled={!ready} style={[styles.continueBtn, !ready && {opacity : 0.5}]}>
                        <Text style={{fontSize : 16 , fontWeight : "bold", color : "white"}}>
                            Continue
                        </Text>
                    </Btn>
                
                </ScrollView>
            </BackScreen>
      )
    }

}

export default withAppContext(ConfirmItems)