
import React from 'react'
import { Modal,TouchableOpacity as Btn,View,Text,TextInput,FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import TruckIcon from '../../../assets/icons/TruckIcon'
import PinIcon from '../../../assets/icons/PinIcon'
import BagIcon from '../../../assets/icons/BagIcon'
import { AntDesign } from '@expo/vector-icons';
import Loader from '../../../components/loader'
import BackScreen from '../../../layouts/BackScreen'
import { IContextProps, withAppContext } from '../../../AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../../constants'
import {  IUser } from 'types'
import AddItemPrompt from './AddItemComponent'
import { getPreciseDistance } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types'
import { getOrderTotal, showNoDriversAlert } from  '../../../utils/orderModules'
import ShoppingListItem from '../../../components/ShoppingListItem'
import { database } from 'firebase'
import strings from '@constants/strings'
import styles from "./styles"
import AddressInput from '@components/AdressInput'

interface IProps { title?: string;} 

type Props = IProps & StackScreenProps<{navigation : any}> &  IContextProps;

interface IState {
  isModalVisible: boolean;
  showPlaces : boolean;
  showPrompt : boolean;
  items : any[];
  orderType : "Pick-Up" | "Shopping";
  addressKey : string;
  storeName : string;
  instructions : string;
  loaderVisible : boolean;
}

class ShoppingRequest extends React.Component<Props, IState> {
    state = {
      isModalVisible : false,
      dropOff : {},
      pickUp :{},
      orderType : "Shopping",
      items : [],
      addressKey: "",
      showPrompt : false,
      showPlaces: false,
      storeName : "",
      instructions : "",
      loaderVisible : false
    }
  onOrderUpdated: any
  storeInstructionsRef: any
  storeDetsRef: any

    renderPlacesModal(){
      const {addressKey} = this.state
      const addressLabel = addressKey === "pickUp" ? "Pick Up Address" : "Delivery Address"
      return(
        <Modal
            visible={this.state.showPlaces}
            animationType="fade"
        >
          <SafeAreaView style={{flex : 1 , width : "100%"}}>
            <View style={styles.placesModalHeader} >
              <Btn 
                  onPress={()=>{ this.setState({showPlaces : false})}}
                  style={{width : 26,height : 26,marginTop :4}}>
                  <Ionicons name="md-arrow-round-back" color="#000" style={{fontSize : 24, fontWeight : "600"}} size={24} />
              </Btn>
              <Text>
                {addressLabel}
              </Text>
              <Btn style={{width : 40,height : 40}} ></Btn>
            </View>
            <AddressInput
              onPress={(data, details) => {
                this.setState({[addressKey] :  {...data , ...details}})
                this.setState({showPlaces:false})
              }}
            />
          </SafeAreaView>
      </Modal>
      )
    }

    openSearchModal(key : string) { this.setState({showPlaces :  true , addressKey : key}) }
  
    openModal(authType : string){ this.setState({authType, isModalVisible : true})}

    renderLoader = () => <Loader visible={this.state.loaderVisible} button={{text : "Cancel" , onPress :()=>{}}} text={"Requesting a driver"} />

    renderAddressSelector = (addressVariant:string , key : string ) =>{
      const address = this.state[key].address || this.state[key].description
      
      return [  
        <View style={{width : "100%", marginVertical : 8}}>
          <Text style={styles.addressVariant} >
            {addressVariant}
          </Text>
          <View style={styles.addressSelector} >
            <Btn onPress={()=>{
                this.openSearchModal(key)
              }} 
              style={{ flex : 1, height : 43, justifyContent : "center" , paddingVertical : 2}}>
              <Text numberOfLines={2} style={{ fontSize : 10 , color : address?  "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.4)"}} >
                {address || `Select ${addressVariant}`}
              </Text>
            </Btn>
            <PinIcon />
          </View>
        </View>
      ]
    }

    handleCancel = () => {
      const {context : {updateOrderStatus, order}} = this.props
      updateOrderStatus(order.orderId, {...order, status : "cancelled"})
      this.setState({loaderVisible : false})
    }

    convertLocation = (location : {lat: string, lng:string}) => ({ latitude : location.lat, longitude : location.lng})

    getTotalDistance = (pickUp: GeolibInputCoordinates, dropOff: GeolibInputCoordinates) => (getPreciseDistance(pickUp,dropOff)+ 300 )/1000

    processRequest = () => {

      if(this.props.context){
          const {context : {sendRequest , order,setOrder,generateOrderId, currentUser : {phoneNumber,displayName} , users}} = this.props
          const {pickUp, dropOff , items , storeName, instructions} = this.state
          this.setState({loaderVisible : true})
          const freeDrivers = users.data.filter((user: IUser) =>  user.isDriver && user.isActive && user.isOnline && user.isVacant )
          const distance = this.getTotalDistance(this.convertLocation(pickUp.geometry.location),this.convertLocation(dropOff.geometry.location))
          const orderTotal = getOrderTotal(distance)
          const orderId = generateOrderId(phoneNumber)

          if (freeDrivers[0]){
              let myOrder  = {
                ...order, 
                storeName,
                storeInstructions : instructions,
                orderId,
                orderType : "Shopping",
                pickUpAddress : pickUp,
                dropOffAddress :  dropOff,
                total : orderTotal,
                distance,
                customer : {displayName , phoneNumber},
                items,
                status : "pending",
                paymentMethod : "cash" 
              }
              myOrder.driver = freeDrivers[0]
              setOrder(myOrder)
              sendRequest(orderId, myOrder, ()=>{
                this.onOrderUpdated = database().ref(`/orders/${orderId}`).on('value', (snapshot: { val: () => any; key: any; }) => {
                  const order = snapshot.val()
                  if(order){
                    if (order.status === "confirmed"){
                        setTimeout(()=> {
                          this.setState({loaderVisible : false})
                          this.props.navigation.navigate('ShoppingProgress')
                        },2000)
                    }
                  }         
                })
              },()=>{})
          }
          
          else{
              setTimeout(()=>{ this.setState({loaderVisible : false})},1000) 
              setTimeout(()=>{ showNoDriversAlert(this.props.context) },1000) 
          }
      }
    }

    newItemPrompt = () => { this.setState({showPrompt : true})}

    removeItem = (index : number) => {
      let itemsCopy = [...this.state.items]
      delete itemsCopy[index]
      itemsCopy = itemsCopy.filter((i)=> i)
      this.setState({items : itemsCopy})
    }

    renderAddItemPrompt = () => {
      const {showPrompt , items} = this.state
        return (
          <AddItemPrompt 
            onClose={()=>{ this.setState({showPrompt : false}) }}
            addItem={(item)=>{
              this.setState({items : [...items, item]})
              this.setState({showPrompt : false})
            }}
            showPrompt={showPrompt} 
          />)
    }

    renderListEmpty = () => {
      return(
          <View style={styles.emptyList}>
            <BagIcon />
            <Text style={{textAlign : "center",marginVertical : 8 , color : Colors.overlayDark70}}>
              {strings.emptyBasketCopy}
            </Text>
          </View>
        )
    }

    render(){

        const { dropOff ,items , storeName, instructions ,loaderVisible} = this.state
        const dislabled = ( _.isEmpty(dropOff) || _.isEmpty(items))

        return [
          this.renderPlacesModal(),
          this.renderAddItemPrompt(),
          <Loader text={"Requesting a driver."} onCancel={()=> this.handleCancel()} visible={loaderVisible} />,          
          <BackScreen {...this.props} title="Request Delivery">
            <View style={{flex : 1, paddingHorizontal : 24}}>
              <View style={{width : "100%", height:  140, flexDirection : "row",justifyContent:"flex-end" ,alignItems : "center"}}>
                <View style={{transform:[ {scaleX : -1 }], alignSelf: "flex-start", marginTop : 8,marginBottom : 24 }}>
                  <TruckIcon />
                </View>
              </View>
            
              <Text style={styles.pickUpHeading} >{strings.shopAndDrop}</Text>
              <Text style={styles.subHead} >{strings.weWillBuy}</Text>

              <View style={{ paddingVertical : 24}} >
                {this.renderAddressSelector("Store Address","pickUp")}
                {this.renderAddressSelector("Delivery Address","dropOff")}
                <Text style={styles.subtitles} >
                  {strings.storeDetails}
                </Text>
                <KeyboardAvoidingView 
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                  style={[styles.textAreaStyles,{height : 42,paddingVertical :2}]} 
                > 
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>    
                  <TextInput 
                    ref={r => { this.storeDetsRef = r }}
                    value={storeName}
                    onChangeText={(storeName)=> {  this.setState({storeName})}}
                    placeholder={strings.storeName} 
                    style={{ fontSize :  12, height: "100%", flex : 1 ,textAlignVertical : "center"}}
                  />     
                  </TouchableWithoutFeedback>     
                </KeyboardAvoidingView>
                <KeyboardAvoidingView 
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                  style={styles.textAreaStyles} 
                >              
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput 
                      ref={r => { this.storeInstructionsRef = r }}
                      value={instructions}
                      placeholder={strings.storeInstructions}  
                      onChangeText={(instructions)=> { 
                        this.setState({instructions})
                       }}
                      multiline  
                      style={{ fontSize :  12, height: "100%", flex : 1 ,textAlignVertical : "top"}} 
                    />     
                  </TouchableWithoutFeedback>   
                </KeyboardAvoidingView>

                <Text style={styles.subtitles} >{"Shopping List"}</Text>
                <FlatList 
                    data={items}
                    contentContainerStyle={{flex : 1,width : "100%" }}
                    ListEmptyComponent={this.renderListEmpty()}
                    style={{flex : 1, width : "100%"}}
                    renderItem={({item,index})=>(
                      <ShoppingListItem onDelete={()=>{ this.removeItem(index) }}  item={item} />
                    )}
                />
                <Btn onPress={()=> this.newItemPrompt()} style={styles.addItemBtn}>
                      <AntDesign name="plus" style={{fontWeight : "bold"}} size={22} color="white" />
                </Btn>

                <Btn disabled={dislabled}
                    onPress={()=>{  this.processRequest()}} 
                      style={[styles.continueBtn, {opacity : dislabled ? 0.6 : 1}]}>
                    <Text style={styles.continueBtnText}>
                      {strings.continue}
                    </Text>
                </Btn>
              </View>
            </View>  
          </BackScreen>
        ]
    }
};

export default withAppContext(ShoppingRequest)

const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};