
import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity as Btn,View,
  Text,StatusBar, Dimensions, ImageBackground, TextInput, ScrollView, FlatList, Alert,
} from 'react-native';
import { Container,Button, Header, Tab, Tabs, ScrollableTab } from 'native-base'
import images from '../../../assets/images'
import { Image } from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons'
import TruckIcon from '../../../assets/icons/TruckIcon';
import OrderIcon from '../../../assets/icons/OrderIcon';
import PinIcon from '../../../assets/icons/PinIcon';
import LocationIcon from '../../../assets/icons/LocationIcon';
import Loader from '../../../components/loader';
import BackScreen from '../../../layouts/BackScreen';
import RNGooglePlaces from 'react-native-google-places';
import { IContextProps, withAppContext } from '../../../AppContext';
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
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
interface IOrderItem {
  name : string;
  description?:string 
}

export interface IVehicle {
  registration : string ; 
  brand : string;
  model : string;
}

interface IDriver {
  name : string;
  vehicel : IVehicle;
  location ?: any;
  status : "busy" | "vacant" | "offline"
}

export interface IOrder {
  orderId : string;
  customer : any;
  pickUpAddress: any;
  dropOffAddress :  any;
  driver?: IDriver;
  orderType : "Pick-Up" | "Shopping";
  status: string;
  items : any[]
}

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

    componentDidMount(){
      // const orderType = this.props.route.params
      // this.setState({orderType})
    }

    closeModal = () =>{
      this.setState({isModalVisible : false})
    }

    renderPlacesModal(){
      const {addressKey} = this.state
      return(
        <Modal
            visible={this.state.showPlaces}
            keyboardShouldPersistTaps='always'
        >
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed={false} // true/false/undefined
          fetchDetails={true}
          // renderDescription={row => row.description} // custom description render
          onPress={(data, details) => {
            this.setState({[addressKey] :  data})
            this.setState({showPlaces:false})
            // console.log("===== ", data);
            // console.log(details);c

            Alert.alert("test",details?.name,
            [{
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }]
           )
          }}
          // getDefaultValue={() => {
          //   return ''; // text input default value
          // }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyDQBBCtTFs_pu7bJamKGWgEVaCf5KC_7LA',
            language: 'en', // language of the results
            // types: '(cities)', // default: 'geocode'
          }}
          // styles={{
          //   description: {
          //     fontWeight: 'bold',
          //   },
          //   predefinedPlacesDescription: {
          //     color: '#1faadb',
          //   },
          // }}
          // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          // currentLocationLabel="Current location"
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
      </Modal>
      )
    }

    openSearchModal(key : string) {

      this.setState({showPlaces :  true , addressKey : key})
      // RNGooglePlaces.openAutocompleteModal()
      // .then((place) => {

      // this.setState({[key] :  place})
      // // place represents user's selection from the


      // // suggestions and it is a simplified Google Place object.
      // })
      // .catch(error => console.log(error.message));  // error is a Javascript Error object
    }
  
    renderAddress(){

      const {isModalVisible , authType} = this.state
      return(
        <Modal 
          animated
          key="mod"
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={()=> this.closeModal()}
        >
          <View style={{width : "100%",flex :1}}>
            <View style={{width : "100%" , alignItems : "flex-end",paddingVertical: 36,paddingHorizontal  :24, backgroundColor : "#fff", ...shadow}}>
              <View style={{width: "100%",justifyContent : "space-between", alignSelf : "center",alignItems : "center", flexDirection : "row"}}>
                <Btn style={styles.backBtnStyle} onPress={()=> this.closeModal()}>
                  <Icon name="arrow-back" color="#000" style={{fontSize : 24, fontWeight : "600"}} size={24} />
                </Btn>
                <View style={{alignItems : "center"}}>
                  <LocationIcon />
                  <Text style={{fontSize : 16, fontWeight : "600"}}>Set addresses</Text>
                </View>
                <Btn style={styles.backBtnStyle} onPress={()=> this.closeModal()} />
              </View>

              <View style={{ flexDirection : "row", height : 100,justifyContent:"space-between", marginTop : 16}}>
                <View style={{width:  20,marginRight : 8,justifyContent:"space-between",paddingVertical:10 ,alignItems: "flex-start"}}>
                  <View style={{width:8,height:8,borderRadius:4,backgroundColor :"#000" }} />
                  <View style={{width:1,height:44,marginLeft : 3.5,borderRadius:4,backgroundColor :"rgba(0,0,0,0.5)" }} />
                  <View style={{width:8,height:8,backgroundColor :"#000" }} />
                </View>
                <View style={{flex:1,justifyContent  :"space-between",backgroundColor : "#fff" }}> 
                    <View style={[styles.textAreaStyles,styles.addressInputWrapper]} >
                          <TextInput placeholder="Pick Up Address"   style={styles.addressInput} />  
                          <Icon name="ios-close-circle-outline"  size={22} />
                    </View>
                    <View style={[styles.textAreaStyles,styles.addressInputWrapper]} >
                          <TextInput placeholder="Delivery Address"  style={styles.addressInput} />   
                          <Icon name="ios-close-circle-outline"  size={22} />
                    </View>
                </View>

              </View>
            </View>
            <FlatList
                contentContainerStyle={{paddingHorizontal : 24}}
                data={[1,1,1,1,1,1,1,1,1]}
                renderItem={({item, index})=>(
                  <View style={styles.addressResultsItem}>
                    <LocationIcon fill={"rgba(0,0,0,0.4)"} />
                    <View>
                      <Text style={{fontSize : 14,marginLeft : 8, color : "rgba(0,0,0,0.9)"}} >{'address'+index}</Text>
                      <Text style={{fontSize : 12,marginLeft : 8, color : "rgba(0,0,0,0.5)"}} >{'city'}</Text>
                    </View>
                  </View>
                )}        
            />
           
          </View>
        </Modal>
      )
    }

    openModal(authType : string){
        this.setState({authType, isModalVisible : true})
    }

    renderAddressSelector = (addressVariant:string , key : string ) =>{

      console.log(this.state)
      const address = this.state[key].address || this.state[key].description
      
      return [

    
        <View style={{width : "100%", marginVertical : 8}}>

        <Text style={{fontSize : 12, fontWeight : "700", color : "rgba(0,0,0,0.8)",alignSelf : "flex-start", marginBottom : 8 }} >
          {addressVariant}
        </Text>
        <View style={{width : "100%", height : 43, borderRadius : 8, flexDirection : "row",backgroundColor : "rgba(0,0,0,0.035)",
              alignItems:"center" ,borderWidth : 2, borderColor: "#f9f9f9", paddingHorizontal : 16 }} >

          <Btn 
            onPress={()=>{
              this.openSearchModal(key)
            }} 
            style={{ flex : 1, height : 43, justifyContent : "center"}}>
            <Text  style={{ fontSize :  12 , color : address?  "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.4)"}} >
              {address || `Select ${addressVariant}`}
            </Text>
          </Btn>
          <PinIcon />
        </View>
        </View>
      ]
    }

    render(){

        const {pickUp , dropOff ,item : {name , description}, orderType} = this.state
        const {context : {profile , order,setOrder}} = this.props

        return [
          this.renderPlacesModal(),
          <Loader visible={false} /> ,          
          <BackScreen
            title="Request Delivery"
          >
            <View style={{flex : 1, paddingHorizontal : 24}}>
              <View style={{width : "100%", height:  140, flexDirection : "row",justifyContent:"flex-end" ,alignItems : "center"}}>
                <View style={{transform:[ {scaleX : -1 }], alignSelf: "flex-start", marginTop : 8,marginBottom : 24 }}>
                  <TruckIcon />
                </View>
              </View>
            
              <Text style={{fontSize : 22, fontWeight : "700", color : "rgba(0,0,0,0.8)",alignSelf : "flex-start", marginBottom : 8 }} >
                  {"Pick up & Drop off"}
              </Text>
              <Text style={{fontSize : 14, fontWeight : "400", color : "rgba(0,0,0,0.5)",alignSelf : "flex-start" }} >
                  {"We will pick up documents, goods, electronics,groceries and whatever you need and drop off wherever you want!"}
              </Text>

              <View style={{ paddingVertical : 24}} >
                {this.renderAddressSelector("Pick-up Address","pickUp")}
                {this.renderAddressSelector("Drop-off Address","dropOff")}
                <Text style={{fontSize : 12, fontWeight : "700", color : "rgba(0,0,0,0.8)",alignSelf : "flex-start", marginBottom : 8 }} >
                  {"Pick Up Details"}
                </Text>
                <View style={[styles.textAreaStyles,{height : 42,marginVertical : 8,paddingVertical: 2}]} >              
                    <TextInput 
                      value={name}
                      onChangeText={(text)=> { 
                        console.log(text)
                        const item  = {name : text, description}
                        this.setState({item })
                       }}
                      placeholder={"Item Name"} 
                      style={{ fontSize :  14, height: "100%", flex : 1 ,textAlignVertical : "top"}}
                    />        
                </View>
                <View style={styles.textAreaStyles} >              
                    <TextInput 
                      value={description}
                      placeholder={"Item description"}  
                      onChangeText={(text)=> { 
                        console.log(text)
                        const item  = {name, description : text}
                        this.setState({item})
                       }}
                      multiline  
                     style={{ fontSize :  14, height: "100%", flex : 1 ,textAlignVertical : "top"}} />        
                </View>
                <Btn onPress={()=>{ 
                        const {pickUp , dropOff ,item : {name , description}} = this.state

                        const order : IOrder = {
                            orderId : `testID${randomNum}`,
                            orderType ,
                            driver : {},
                            pickUpAddress : pickUp,
                            dropOffAddress : dropOff,
                            items : [{
                              name,
                              description
                            }],
                            customer : profile,
                            total : 1250,
                            status : "pending"
                            
                        }
                        setOrder(order)
                        this.props.navigation.navigate("Payment" , {orderType : "Pick-Up"})

                      }} 
                      style={{width : "100%", height : 42 , borderRadius : 4, marginTop : 12,
                      backgroundColor : "#F57301",alignItems : "center", justifyContent : "center" 
                      }}>

                    <Text style={{fontSize :  13 ,color : "#fff" , fontWeight : "600"}}>
                      Continue
                    </Text>

                </Btn>
              </View>
            </View>  
          </BackScreen>
        ]
    }

};

const randomNum =  Math.floor(Math.random() * Math.floor(100));

export default withAppContext(PickUp)

const styles = StyleSheet.create({
    activeTextStyle:{
        color : 'red'
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
      flex : 1 ,
      fontSize :  14, height: "100%",
      textAlignVertical : "center"
    },
    textAreaStyles:{
      flex : 1, height : 243, borderRadius : 8,paddingVertical: 16,
      flexDirection : "row",backgroundColor : "rgba(0,0,0,0.035)",
      alignItems:"center" ,borderWidth : 2, borderColor: "#f9f9f9", 
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

  const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
  };
  const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
  };