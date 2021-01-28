import React, { Component} from 'react'
import { View, Text , TouchableOpacity as Btn, Dimensions, FlatList} from 'react-native'
import InfoIcon from 'assets/icons/InfoIcon'
import BackScreen from 'layouts/BackScreen'
import { IContextProps, withAppContext } from '../../../AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import firebase from 'firebase'
import { getOrderTotal, showNoDriversAlert } from  'utils/orderModules'
import UserCard from 'components/UserCard'
import ShoppingListItem from 'components/ShoppingListItem'
import { Colors } from 'constants'
import strings from '@constants/strings'
import {progressStyles as styles} from "./styles"

type IProps = IContextProps &
StackScreenProps<{navigation : any}> ;

class ShoppingProgress extends Component<IProps> {
    constructor (props) {
      super(props)
    }

    componentDidMount(){
        const {context : {order,setOrder}} = this.props
        const {orderId} = order
        var ref = firebase.database().ref(`orders/${orderId}`);
        ref.on('value', function(snapshot) {
            if(snapshot.val()){
                const order = snapshot.val()
                setOrder(order)
            }
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
                title={strings.confirmYourOrder}
                navigation={this.props.navigation}          
            >
                <View style={{flex : 1 , }}>
                   <UserCard user={driver} />
                   <View style={styles.nbCard}>
                        <InfoIcon fill={Colors.primaryOrange} />
                        <Text style={styles.nbText}> 
                            {allPriced  ? strings.hasPlacedOrder.replace("{0}",`${displayName}`) :strings.waitForConfirmation.replace("{0}",`${displayName}`)} 
                        </Text>
                    </View>
                    <View style={styles.yourShoppingList}>
                        <Text style={{fontSize : 18, fontWeight : "bold"}}>{strings.yourShoppingList}</Text>
                    </View>

                    <FlatList 
                        data={items}
                        contentContainerStyle={styles.shoppingListContainer}
                        style={styles.shoppingList}
                        renderItem={({item,index})=>(
                            <ShoppingListItem onDelete={()=>{ this.removeItem(index) }}  item={item} />
                        )}
                    />
                    {itemsCost > 0 && 
                    <View style={styles.orderSummary}>
                        <Text style={styles.summaryHead}> {strings.yourSummary} </Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.slipSubHead} >{strings.yourItems}</Text>
                            <Text style={styles.slipAmount}>{`N ${itemsCost}`}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.slipSubHead} >{strings.deliveryFee}</Text>
                            <Text style={styles.slipAmount}>{`N ${deliveryCost}`}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryHead} >{strings.orderTotal}</Text>
                            <Text style={[styles.summaryHead ,styles.slipAmount]}>{`N ${itemsCost+deliveryCost}`}</Text>
                        </View>
                    </View>}

                    <Btn disabled={!allPriced} onPress={()=> this.confirmOrderTotal(itemsCost+deliveryCost)} style={styles.continueBtn}>
                        <Text style={styles.continueText}>
                            {strings.continue}
                        </Text>
                    </Btn>
                
                </View>
            </BackScreen>
      )
    }
}

export default withAppContext(ShoppingProgress)