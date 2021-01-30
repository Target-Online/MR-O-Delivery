
import React from 'react'
import { Modal, TouchableOpacity as Btn,View,Text,TextInput,FlatList, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import TruckIcon from '../../../assets/icons/TruckIcon'
import PinIcon from '../../../assets/icons/PinIcon'
import LocationIcon from '../../../assets/icons/LocationIcon'
import Loader from '../../../components/loader'
import BackScreen from '../../../layouts/BackScreen'
import { IContextProps, withAppContext } from '../../../AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash'
import Points from 'screens/driver/OrderProgress/Points'
import strings from '@constants/strings'
import { IOrder } from 'types'
import styles from "./styles"
import AddressInput from '@components/AdressInput'

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
      pickUp : {},
      dropOff : {},
      orderType : "Pick-Up",
      item : {
        name : "",
        description : ""
      },
      addressKey: "",
      showPlaces: false
    }

    closeModal = () =>{ this.setState({isModalVisible : false})}

    renderPlacesModal(){
      const {addressKey} = this.state
      const addressLabel = addressKey === "pickUp" ? "Pick Up Address" : "Delivery Address"
      return(
        <Modal visible={this.state.showPlaces} animationType="fade" >
          <SafeAreaView style={{flex : 1 , width : "100%"}}>
            <View style={styles.autoComplete} >
              <Btn onPress={()=>{ this.setState({showPlaces : false})}} style={styles.backBtnStyle}>
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

    openSearchModal(key : string) { this.setState({showPlaces :  true , addressKey : key})}
  
    renderAddress(){
      const {isModalVisible } = this.state
      return(
        <Modal 
          animated key="mod"
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={()=> this.closeModal()}
        >
          <View style={{width : "100%",flex :1}}>
            <View style={styles.addressTop}>
              <View style={styles.addressTopRow}>
                <Btn style={styles.backBtnStyle} onPress={()=> this.closeModal()}>
                  <Icon name="arrow-back" color="#000" style={{fontSize : 24, fontWeight : "600"}} size={24} />
                </Btn>
                <View style={{alignItems : "center"}}>
                  <LocationIcon />
                  <Text style={{fontSize : 16, fontWeight : "600"}}>{strings.setAddresses}</Text>
                </View>
                <Btn style={styles.backBtnStyle} onPress={()=> this.closeModal()} />
              </View>

              <View style={styles.addressBottom}>
                <Points/>
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
                )}/>
          </View>
        </Modal>
      )
    }

    openModal(authType : string){this.setState({authType, isModalVisible : true})}

    renderAddressSelector = (addressVariant:string , key : string ) =>{
      const address = this.state[key].address || this.state[key].description
      
      return [  
        <View style={{width : "100%", marginVertical : 8}}>
          <Text style={styles.addressVariant} >
            {addressVariant}
          </Text>
          <View style={styles.addressVariantTrigger} >

            <Btn onPress={()=>{ this.openSearchModal(key)}} 
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
      const {pickUp , dropOff ,item : {name , description},item } = this.state
      if (_.isEmpty(pickUp) || _.isEmpty(dropOff) || _.isEmpty(item)) return
      else{
        const {context : { setOrder,currentUser,generateOrderId}} = this.props
        const {phoneNumber, displayName} = currentUser
        const orderId = generateOrderId(phoneNumber)

        const newOrder : IOrder = {
            orderId,
            pickUpAddress : pickUp,
            dropOffAddress : dropOff,
            items : [{ name, description}],
            customer : {phoneNumber,displayName},
            total : 1250,
            status : "pending"
        }
        setOrder(newOrder)
        this.props.navigation.navigate("Payment")
      }
    }

    render(){

        const {pickUp , dropOff ,item : {name , description},item } = this.state
        const dislabled = (_.isEmpty(pickUp) || _.isEmpty(dropOff) || _.isEmpty(item) || !name || !description)
        return [
          this.renderPlacesModal(),
          <Loader visible={false} /> ,          
          <BackScreen
            {...this.props}
            title={strings.requestDelivery}
          >
            <View style={styles.container}>
              <View style={styles.top}>
                <View style={styles.truckIcon}><TruckIcon /></View>
              </View>
            
              <Text style={styles.pickUpHeading} >{strings.pickUpTitle}</Text>
              <Text style={styles.weWillPickUp} >{strings.weWillPickUp}</Text>

              <View style={{ paddingVertical : 24}} >
                {this.renderAddressSelector("Pick-up Address","pickUp")}
                {this.renderAddressSelector("Drop-off Address","dropOff")}
                <Text style={styles.parcelDetails} >
                  {strings.parcelDetails}
                </Text>
                <View style={[styles.textAreaStyles,{height : 42,marginVertical : 8,paddingVertical: 2}]} >              
                    <TextInput 
                      value={name}
                      onChangeText={(name)=> { this.setState({item : {name, description}})}}
                      placeholder={strings.itemName} 
                      style={styles.itemName}
                    />        
                </View>
                <View style={styles.textAreaStyles} >              
                    <TextInput 
                      value={description}
                      placeholder={"Item description"}  
                      onChangeText={(text)=> { 
                        const item  = {name, description : text}
                        this.setState({item})
                       }}
                      multiline  
                     style={styles.itemDescriptionInput} />        
                </View>
                <Btn 
                  disabled={dislabled}
                  onPress={()=>{ this.processOrderPlacement()}}   style={[styles.continue,{opacity : dislabled ? 0.6 : 1}]}>
                  <Text style={styles.continueTxt}>{strings.continue} </Text>
                </Btn>
              </View>
            </View>  
          </BackScreen>
        ]
    }
};

export default withAppContext(PickUp)

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};