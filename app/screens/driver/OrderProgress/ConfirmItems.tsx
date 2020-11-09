import React, { Component} from 'react'
import { View, Text , TouchableOpacity as Btn, Image, StyleSheet , Linking, Dimensions, FlatList} from 'react-native'
import InfoIcon from '../../../assets/icons/InfoIcon'
import BackScreen from '../../../layouts/BackScreen'
import { IContextProps, withAppContext } from '../../../AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import firebase from 'firebase'
import UserCard from '../../../components/UserCard'
import ShoppingListItem from '../../../components/ShoppingListItem'
import { Colors } from '../../../constants'
import { getOrderTotal } from '../../../utils/orderModules'
const  { width } = Dimensions.get('window')


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
                <View style={{flex : 1}}>
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
                
                </View>
            </BackScreen>
      )
    }

}

export default withAppContext(ConfirmItems)

const shadow =  {
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      height: 2
    },
    elevation: 10
}

const styles = StyleSheet.create({
    driverName:{
        color : '#fff',
        fontSize : 10,
    },
    continueBtn : {
        width : width - 48 ,marginHorizontal : 16,
        height : 42, marginTop : 16,alignSelf : "center",
        alignItems : "center" , justifyContent : "center",
        borderRadius : 4, backgroundColor : Colors.primaryOrange,
    },
    orderTrackHead : {
        fontSize : 16,fontWeight : "bold",
    },
    slipAmount:{
        color : Colors.primaryOrange,fontSize : 13
    },
    slipSubHead : {
        color : Colors.overlayDark60,fontSize : 14
    },
    summaryHead : {
        fontWeight  : "bold",
        fontSize : 13,
    },
    trackingId : {
        height: 26 , borderColor :  "grey", 
        borderWidth : 1, borderRadius : 3,
        padding : 4, marginVertical : 8
    },
    summaryRow:{

    },
    deliveryStep :{
        alignItems : "center",
        textAlign:"center",
        marginTop : 16
    },
    nbText: {
        color : Colors.overlayDark60,
        fontSize : 12,marginLeft : 8
    },
    nbCard: {
        height : 52,alignItems : "center", backgroundColor : "white",
        width : "100%" , paddingHorizontal : 16,
        flexDirection : "row",...shadow
    },
    contactBtn:{
        width : 50,
        height : 50,
        borderRadius : 25,
        backgroundColor: "#F57301",
        justifyContent : "center",
        alignItems : "center"
    },
    orderSummary: {
        marginTop : 4, height: 280,
        width: width - 48 ,borderRadius: 3, 
        justifyContent : "space-between", backgroundColor : "#fff", 
        ...shadow ,padding : 24,
        alignSelf : "center"
    },
    backBtnStyle:{
      alignSelf : "flex-start",
      width : 30,height: 30
    },
    addressResultsItem : { 
      height :  54, borderBottomColor : "rgba(0,0,0,0.09)", 
      borderBottomWidth :  0.5, flexDirection : "row",
      alignItems : "center",
    },
    addressInputWrapper: { 
      height : 38, flex :0, 
      backgroundColor : "rgba(0,0,0,0.04)",
      borderRadius : 2  ,paddingVertical : 0
    },
    addressInput : { 
      fontSize :  10, 
    },
    textAreaStyles:{
      flex : 1, height : 32, borderRadius : 2,
      paddingHorizontal : 16 
    },
    container: {
      flex : 1 ,
      paddingTop : 42,
      backgroundColor : "#FEFEFE", 
      paddingHorizontal : 24,
      paddingVertical : 36,
      alignItems : "center"
    },
    btnStyle:{ 
      width: 250, height: 86,
      borderRadius: 3, ...shadow,
      backgroundColor :"#fff",alignItems : "center",
      justifyContent : "flex-start", 
      flexDirection : "row",
      paddingHorizontal : 24 
    },
    tabStyle : {backgroundColor : 'white'}
  
  })
