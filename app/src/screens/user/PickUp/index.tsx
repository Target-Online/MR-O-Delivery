
import React from 'react'
import { Modal,TouchableOpacity as Btn,View,Text,TextInput,FlatList } from 'react-native'
// import TruckIcon from '@assets/icons/TruckIcon'
import PinIcon from '@assets/icons/PinIcon'
import Loader from '@components/loader'
import BackScreen from '@layouts/BackScreen'
import { IContextProps, withAppContext } from '@context/AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash'
import { SafeAreaView } from 'react-native-safe-area-context'
import { withOrdersContext } from '@context/OrdersContext'
import { withUsersContext } from '@context/UsersContext'
import styles from "./styles"
import { IOrder } from 'src/types'

interface IProps { title?: string;} 
type Props = IProps & StackScreenProps<{navigation : any}> &  IContextProps;
interface IState {
  isModalVisible: boolean;
  authType: string;
  showPlaces : boolean;
  orderType : "Pick-Up" | "Shopping";
  addressKey : string;
}

class PickUp extends React.Component<Props, IState> {
    state = {
      isModalVisible : false,
      authType: "signIn",
      pickUp : "",
      dropOff : "",
      orderType : "Pick-Up",
      item : {
        name : "",
        description : ""
      },
      addressKey: "",
      showPlaces: false
    }

    closeModal = () =>{ this.setState({isModalVisible : false}) }

    renderPlacesModal(){
      const {addressKey} = this.state
      const addressLabel = addressKey === "pickUp" ? "Pick Up Address" : "Delivery Address"
      return(
        <Modal
            visible={this.state.showPlaces}
            animationType="fade"
        >
        <SafeAreaView style={{flex : 1 , width : "100%"}}>
          <View style={styles.addressInputHeader} >
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
          {/* <GooglePlacesAutocomplete
            placeholder="Search"
            onFail={(error)=>{}}
            minLength={2} 
            autoFocus={false}
            returnKeyType={'search'} 
            listViewDisplayed={false} 
            fetchDetails={true}
            onPress={(data, details) => {
              this.setState({[addressKey] :  {...data , ...details}})
              this.setState({showPlaces:false})
            }}
            query={{
              key: 'AIzaSyDQBBCtTFs_pu7bJamKGWgEVaCf5KC_7LA',
              language: 'en',
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            GoogleReverseGeocodingQuery={{}}
            GooglePlacesSearchQuery={{rankby: 'distance',}}
            filterReverseGeocodingByTypes={[ 'locality','administrative_area_level_3']}
            predefinedPlaces={[homePlace, workPlace]}
            debounce={200}
          /> */}
        </SafeAreaView>
      </Modal>
      )
    }

    openSearchModal(key : string) { this.setState({showPlaces :  true , addressKey : key})}
  
    renderAddressSelector = (addressVariant:string , key : string ) => {
      const address = this.state[key].address || this.state[key].description
    
      return [  
        <View style={{width : "100%", marginVertical : 8}}>
          <Text style={styles.addressVariantText} >
            {addressVariant}
          </Text>
          <View style={styles.addressSelectionTriggerWrapper} >
            <Btn onPress={()=>{this.openSearchModal(key)}} 
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
      const {pickUp , dropOff ,item : {name , description},item} = this.state
      if (_.isEmpty(pickUp) || _.isEmpty(dropOff) || _.isEmpty(item)){
      }
      else{
        const {context : {profile ,setOrder,currentUser,generateOrderId}} = this.props
        const {phoneNumber, displayName} = currentUser
        const orderId = generateOrderId(phoneNumber)

        const newOrder : IOrder = {
            orderId,
            driver : {},
            pickUpAddress : pickUp,
            dropOffAddress : dropOff,
            items : [{name,description}],
            customer : {phoneNumber,displayName},
            total : 1250,
            status : "pending"  
        }
        setOrder(newOrder)
        this.props.navigation.navigate("Payment")
      }
      
    }

    render(){

        const {pickUp , dropOff ,item : {name , description},item} = this.state
        const dislabled = (_.isEmpty(pickUp) || _.isEmpty(dropOff) || _.isEmpty(item) || !name || !description)
        return [
          this.renderPlacesModal(),
          <Loader visible={false} />,          
          <BackScreen
            {...this.props}
            title="Request Delivery"
          >
            <View style={{flex : 1, paddingHorizontal : 24}}>
              <View style={styles.top}>
                <View style={styles.truckIcon}>
                  {/* <TruckIcon /> */}
                </View>
              </View>
            
              <Text style={styles.pickUpHeading} >
                  {"Pick up & Drop off"}
              </Text>
              <Text style={{fontSize : 12, fontWeight : "400", color : "rgba(0,0,0,0.5)",alignSelf : "flex-start" }} >
                  {"We will pick up documents, goods, electronics,groceries and whatever you need and drop off wherever you want!"}
              </Text>

              <View style={{ paddingVertical : 24}} >
                {this.renderAddressSelector("Pick-up Address","pickUp")}
                {this.renderAddressSelector("Drop-off Address","dropOff")}
                <Text style={{fontSize : 12, fontWeight : "700", color : "rgba(0,0,0,0.8)",alignSelf : "flex-start", marginBottom : 8 }} >
                  {"Parcel Details"}
                </Text>
                <View style={[styles.textAreaStyles,{height : 42,marginVertical : 8,paddingVertical: 2}]} >              
                  <TextInput 
                    value={name}
                    onChangeText={(text)=> { this.setState({item : { name : text, description}})}}
                    placeholder={"Item Name"} 
                    style={{ fontSize :  12, height: "100%", flex : 1 ,textAlignVertical : "center"}}
                  />        
                </View>
                <View style={styles.textAreaStyles} >              
                  <TextInput 
                    value={description}
                    placeholder={"Item description"}  
                    onChangeText={(text)=> {  this.setState({item : {name, description : text}}) }}
                    multiline  
                    style={{ fontSize :  12, height: "100%", flex : 1 ,textAlignVertical : "top"}} 
                  />        
                </View>
                <Btn 
                  disabled={dislabled}
                  onPress={()=>{ this.processOrderPlacement()}} 
                  style={[styles.placeOrderBtn,{opacity : dislabled ? 0.6 : 1} ]}
                >
                  <Text style={{fontSize :  13 ,color : "#fff" , fontWeight : "600"}}>Continue</Text>
                </Btn>
              </View>
            </View>  
          </BackScreen>
        ]
    }
};

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

export default withAppContext(withOrdersContext(withUsersContext(PickUp)))

