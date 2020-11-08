
import React from 'react'
import { Modal,StyleSheet,TouchableOpacity as Btn,View,Text,TextInput,FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import TruckIcon from '../../../assets/icons/TruckIcon'
import PinIcon from '../../../assets/icons/PinIcon'
import BagIcon from '../../../assets/icons/BagIcon'
import { AntDesign } from '@expo/vector-icons';
import Loader from '../../../components/loader'
import BackScreen from '../../../layouts/BackScreen'
import { IContextProps, mockOrder, withAppContext } from '../../../AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../../constants'
import { IOrder, IUser } from 'types'
import AddItemPrompt from './AddItemComponent'
import { getPreciseDistance } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types'
import { getOrderTotal, showNoDriversAlert } from  '../../../utils/orderModules'
import ShoppingListItem from '../../../components/ShoppingListItem'
import { database } from 'firebase'

const shadow =  {
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      height: 2
    },
    elevation: 10
  }

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
      dropOff : mockOrder.dropOffAddress,
      pickUp : mockOrder.pickUpAddress,
      orderType : "Shopping",
      items : [
        {name : "Test item 1", description : "description"},
        {name : "Test item 2", description : "description"}
      ],
      addressKey: "",
      showPrompt : false,
      showPlaces: false,
      storeName : "Store Name",
      instructions : "Store Instructions",
      loaderVisible : false
    }
  onOrderUpdated: any

    renderPlacesModal(){
      const {addressKey} = this.state
      const addressLabel = addressKey === "pickUp" ? "Pick Up Address" : "Delivery Address"
      return(
        <Modal
            visible={this.state.showPlaces}
            animationType="fade"
            keyboardShouldPersistTaps='always'
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
            <GooglePlacesAutocomplete
              placeholder="Search"

              onFail={(error)=>{

              }}
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed={false} // true/false/undefined
              fetchDetails={true}
              // renderDescription={row => row.description} // custom description render
              onPress={(data, details) => {
                this.setState({[addressKey] :  {...data , ...details}})
                this.setState({showPlaces:false})
              }}

              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyDQBBCtTFs_pu7bJamKGWgEVaCf5KC_7LA',
                language: 'en', // language of the results
                // types: '(cities)', // default: 'geocode'
              }}

              nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'food',
              }}
              filterReverseGeocodingByTypes={[
                'locality',
                'administrative_area_level_3',
              ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              predefinedPlaces={[homePlace, workPlace]}
              debounce={200}
            />
          </SafeAreaView>
      </Modal>
      )
    }

    openSearchModal(key : string) {
      this.setState({showPlaces :  true , addressKey : key})
    }
  
    openModal(authType : string){
        this.setState({authType, isModalVisible : true})
    }

    renderLoader(){
      const {loaderVisible} = this.state
      return(
          <Loader visible={loaderVisible === true} button={{text : "Cancel" , onPress :()=>{}}} text={"Requesting a driver"} />)
    }

    renderAddressSelector = (addressVariant:string , key : string ) =>{

      const address = this.state[key].address || this.state[key].description
      
      return [  
        <View style={{width : "100%", marginVertical : 8}}>

        <Text style={{fontSize : 12, fontWeight : "700", color : "rgba(0,0,0,0.8)",alignSelf : "flex-start", marginBottom : 8 }} >
          {addressVariant}
        </Text>
        <View style={{width : "100%", height : 43, borderRadius : 8, flexDirection : "row",backgroundColor : "rgba(0,0,0,0.035)",
              alignItems:"center" ,borderWidth : 2, borderColor: "#f9f9f9", paddingHorizontal : 16 }} >

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

    processOrderPlacement = () => {
      const { dropOff ,items} = this.state
      if (_.isEmpty(dropOff) || _.isEmpty(items)){
      }
      else{
        const {context : {setOrder,currentUser,generateOrderId}} = this.props
        const {phoneNumber, displayName} = currentUser
        const orderId = generateOrderId(phoneNumber)

        const newOrder : IOrder = {
            orderId,
            orderType : "Shopping" ,
            driver : {},
            dropOffAddress : dropOff,
            items,
            customer : { phoneNumber , displayName },
            total : 0,
            status : "pending"
        }
        setOrder(newOrder)
        // this.props.navigation.navigate("Payment")
      } 
    }

    convertLocation = (location : {lat: string, lng:string}) => (
      { latitude : location.lat, longitude : location.lng}
    )

    getTotalDistance = (pickUp: GeolibInputCoordinates, dropOff: GeolibInputCoordinates) =>{
        var dis = getPreciseDistance(pickUp,dropOff)+ 300 //distance off by 200 metres
        return (dis)/1000
    }

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

                this.onOrderUpdated = database()
                .ref(`/orders/${orderId}`)
                .on('value', (snapshot: { val: () => any; key: any; }) => {
                  const order = snapshot.val()
                  if(order){
                    if (order.status === "confirmed"){
                        setTimeout(()=> {
                          this.setState({loaderVisible : false})
                          this.props.navigation.navigate('ShoppingProgress')
                        },2000)
                    }
                    console.log({driver : order.driver})

                  }         
                })

              }, ()=>{})
          }
          
          else{
              setTimeout(()=>{ this.setState({loaderVisible : false})},1000) 
              setTimeout(()=>{ showNoDriversAlert(this.props.context) },1000) 
          }
      }
    }


    newItemPrompt = () => {
      this.setState({showPrompt : true})
    }

    removeItem = (index : number) => {
      const {items} = this.state
      let itemsCopy = [...items]
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
          <View 
            style={{ width : "100%", height : 180,
              alignItems : "center",justifyContent : "center"
            }}
          >
            <BagIcon />
            <Text style={{textAlign : "center",marginVertical : 8 , color : Colors.overlayDark70}}>
              {"Add items to your shopping list and\nlet's get you what you need."}
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
          <Loader text={"Requesting a driver."} visible={loaderVisible} />,          
          <BackScreen
            {...this.props}
            title="Request Delivery"
          >
            <View style={{flex : 1, paddingHorizontal : 24}}>
              <View style={{width : "100%", height:  140, flexDirection : "row",justifyContent:"flex-end" ,alignItems : "center"}}>
                <View style={{transform:[ {scaleX : -1 }], alignSelf: "flex-start", marginTop : 8,marginBottom : 24 }}>
                  <TruckIcon />
                </View>
              </View>
            
              <Text style={styles.pickUpHeading} >
                  {"Shop & Drop off"}
              </Text>
              <Text style={styles.subHead} >
                  {"We will buy the items you need and drop off wherever you want!"}
              </Text>

              <View style={{ paddingVertical : 24}} >
                {this.renderAddressSelector("Store Address","pickUp")}
                {this.renderAddressSelector("Delivery Address","dropOff")}
                <Text style={styles.subtitles} >
                  {"Store Details"}
                </Text>
                <View style={[styles.textAreaStyles,{height : 42,paddingVertical :2}]} >              
                  <TextInput 
                    value={storeName}
                    onChangeText={(storeName)=> { 
                      this.setState({storeName})
                    }}
                    placeholder={"Store Name"} 
                    style={{ fontSize :  12, height: "100%", flex : 1 ,textAlignVertical : "center"}}
                  />        
                </View>
                <View style={styles.textAreaStyles} >              
                    <TextInput 
                      value={instructions}
                      placeholder={"Store instructions"}  
                      onChangeText={(instructions)=> { 
                        this.setState({instructions})
                       }}
                      multiline  
                      style={{ fontSize :  12, height: "100%", flex : 1 ,textAlignVertical : "top"}} 
                    />        
                </View>
                <Text style={styles.subtitles} >{"Shopping List"}</Text>
                <FlatList 
                    data={items}
                    contentContainerStyle={{
                      flex : 1,width : "100%"
                    }}
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
                    onPress={()=>{ 
                          this.processRequest()
                    }} 
                      style={[styles.continueBtn, {opacity : dislabled ? 0.6 : 1}]}>
                    <Text style={styles.continueBtnText}>
                      Continue
                    </Text>
                </Btn>
              </View>
            </View>  
          </BackScreen>
        ]
    }

};


export default withAppContext(ShoppingRequest)

const styles = StyleSheet.create({
    activeTextStyle:{
        color : 'red'
    },
    itemInput : { 
      fontSize :  12, height: 56,
      flex : 1, textAlignVertical : "center"
    },
    closeIcon : {
      width : 50 ,height : 50,
      borderRadius : 25 , position: "absolute" ,
      top: 4,right: 4,alignItems : "center",justifyContent : "center"
    },
    placesModalHeader: { 
      height : 64, width : "100%",
      alignItems: "center",flexDirection:"row",
      justifyContent : "space-between",
      paddingHorizontal : 16 
    },
    addItemWrapper : {
      width : "90%",paddingHorizontal :  24,
      height : 260, borderRadius : 4,
      backgroundColor : "white"
    },
    continueBtn : {
      width : "100%", height : 42 , borderRadius : 4, marginTop : 12,
    backgroundColor : "#F57301",alignItems : "center", justifyContent : "center" 
    },
    continueBtnText : {
      fontSize :  13 ,color : "#fff" , 
      fontWeight : "600"
    },
    backBtnStyle:{
      alignSelf : "flex-start",
      width : 30,height: 30
    },
    subHead : {
      fontSize : 12, fontWeight : "400", 
      color : "rgba(0,0,0,0.5)",
      alignSelf : "flex-start" 
    },
    subtitles :{
      fontSize : 12, fontWeight : "700",
      color : "rgba(0,0,0,0.8)",alignSelf : "flex-start", 
      marginBottom : 8 
    },
    addItemBtn : {
      height :42,width : 42,alignSelf : "center",marginVertical : 4,
      borderRadius: 21, backgroundColor : Colors.primaryOrange, 
      justifyContent : "center",
      alignItems : "center",...shadow
    },
    pickUpHeading: {
      fontSize : 22, fontWeight : "700",
      color : "rgba(0,0,0,0.8)",
      alignSelf : "flex-start",
      marginBottom : 8 
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
      flex : 1 ,
      fontSize :  14, height: "100%",
      textAlignVertical : "center"
    },
    textAreaStyles:{
      flex : 1, height : 103, 
      borderRadius : 8,paddingVertical: 16,
      flexDirection : "row",backgroundColor : "rgba(0,0,0,0.035)",
      alignItems:"center" ,borderWidth : 2, borderColor: "#f9f9f9", 
      paddingHorizontal : 16 , marginVertical : 8
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
      flexDirection : "row", paddingHorizontal : 24 
    },
    tabStyle : { 
      backgroundColor : 'white'
    }
  }
)

const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};