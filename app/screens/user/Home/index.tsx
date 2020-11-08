
import React, { useEffect, useState, useContext } from 'react';
import { Modal, StyleSheet, ActivityIndicator as Bubbles,ScrollView, TouchableOpacity as Btn, View, Image as RnImg,
  Text, Dimensions, ImageBackground, TextInput , SafeAreaView 
} from 'react-native';
import images from '../../../assets/images'
import Icon from 'react-native-vector-icons/EvilIcons'
import OrderIcon from '../../../assets/icons/OrderIcon';
import BikeIcon from '../../../assets/icons/BikeIcon';
import { Colors } from '../../../constants';
import _ from "lodash"
import { withAppContext, IContextProps, mockOrder } from '../../../AppContext';
import { StackScreenProps } from '@react-navigation/stack';
import ProfileLoad from '../Auth/ProfileLoad';
import { CurrentUserContext } from '../../../Store';
import firebase from 'firebase'
import Constants from 'expo-constants';


const { width } = Dimensions.get("window")
const shadow = {
  shadowColor: '#000000',
  shadowOpacity: 0.15,
  shadowRadius: 4,
  shadowOffset: {
    height: -8
  },
  elevation: 10
}

interface IProps { title?: string; }

type Props = IProps & IContextProps & StackScreenProps<IProps>;


const Home: any = (props: Props) => {
  const [isNewUserModalVisible, setNewUserModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setAlertData, setShowAlert, orderNumber, setOrderNumber, currentUser ,order } = props.context
  

  useEffect(() => {
    const userNull = _.isEmpty(currentUser)

    if(!_.isEmpty(order)){
      const {orderId} = order
      setOrderNumber(orderId)
    }
    
    if(userNull || (!userNull && !currentUser.displayName)) {
      setNewUserModalVisible(true)
    }
    else{
      setNewUserModalVisible(false)
    }
  }, [])


  const renderNewUserModal: any = () => {
    return (
      <Modal visible={isNewUserModalVisible}>
        <ProfileLoad 
          setVisible={setNewUserModalVisible}
          currentUser={currentUser}  
        />
      </Modal>
    )
  }
  const randomNum =  Math.floor(Math.random() * Math.floor(100))


  const processTrackOrder = () => {
    const {context : {setOrder ,order}} = props
    setLoading(true)
    firebase.database()
    .ref(`orders/${orderNumber}`)
    .once('value')
    .then(snapshot => {
        
      if(!_.isEmpty(snapshot.val())){
          setOrder(snapshot.val())
          props.navigation.navigate("OrderProgress")
        }
        else{
          setAlertData({
            text : "We couldn't find any request linked to that tracking number.\nPlease check your order number or contact admin for any queries." , 
            title: "Oops..." , 
            buttons : [{
              label : "Ok",
              onPress : ()=> setShowAlert(false)
          }]})
          setShowAlert(true)
        }
        setLoading(false)
    }).catch((err)=>{

      setLoading(false)
    })
  }

  return [
    renderNewUserModal(),
    <SafeAreaView style={styles.mainWrapper} >
      <ScrollView style={{backgroundColor : "#fff", flex : 1,}} >
        <View style={{flex : 1}}>
          <View style={{height : 300, width : "90%",alignSelf : "center" }}>
              <ImageBackground source={ images.banner } resizeMode="cover" style={{ width: "100%", height: "100%" }}/>
          </View>

          <View style={styles.bottomMain} >
            <Text style={styles.welcomText} >
              Welcome, {currentUser && (currentUser.displayName + " !!!")}
            </Text>
            <View style={styles.orderOpts} >
              <Btn
                onPress={() =>  props.navigation.navigate("ShoppingRequest")}
                style={{ width: width*0.4, height: 200 }}
              >
                <View style={styles.btnStyle}  >
                  <View style={{height : 46}}>
                  <OrderIcon fill={"#F57301"} />
                  </View>
                  <Text style={styles.requestType}>
                    Shopping 
                  </Text>
                  <Text style={styles.serviceDescriptionText} >
                    Send a bike to a local shop to buy and return your goods.
                  </Text>
                </View>
              </Btn>
              <Btn
                onPress={() => props.navigation.navigate("PickUpRequest")}
                style={{ width: width*0.4, height: 200}}
              >
                <View style={styles.btnStyle}  >
                  <View style={{height : 46}}>
                    <BikeIcon fill={"#F57301"} />
                  </View>

                  <Text style={styles.requestType}>
                    Order Bike
                    </Text>
                    <Text style={styles.serviceDescriptionText} >
                      Send a bike to go collect and deliver a package to your location.
                    </Text>
                </View>
              </Btn>
            </View>
            <View style={styles.trackOrderWrapper}>
              <Text style={styles.trackOrderTitle} >Track your order</Text>
              <View overflow="hidden" style={styles.inputWrapper}>
                <TextInput value={orderNumber} onChangeText={(t)=>{ setOrderNumber(t) }} placeholder={"Enter Order Number"} style={styles.trackOrderInput} />
                <Btn 
                  disabled={!orderNumber}
                  onPress={() =>  {
                    //sendRequest(`some${randomNum}order${randomNum}`, mockOrder,()=>{},()=>{})
                    orderNumber && processTrackOrder()
                    // sendPushNotification().then().catch()
                  }}
                  style={[styles.btnStyle, { width: 64, opacity : orderNumber ? 1 : 0.8, flex: 0, height: 52, borderRadius: 0, backgroundColor: Colors.primaryOrange, paddingHorizontal: 0 }]}>
                  {loading ? <Bubbles size={"large"} style={{width : 24, height : 24}} color={Colors.primaryOrange} /> :
                    <Icon size={24} style={{ fontSize: 34, color: "#fff" }} name="arrow-right" />
                  }
                </Btn>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  ]
};

export default withAppContext(Home)

const styles = StyleSheet.create({
  activeTextStyle: {
    color: 'red'
  },
  trackOrderTitle : { 
    marginBottom: 4, marginTop : 24 
  },
  trackOrderInput : { 
    flex: 1, height: "100%", 
    paddingHorizontal: 24, 
    paddingVertical: 4 
  },
  trackOrderWrapper:{
    paddingHorizontal :12
  },
  mainWrapper: {
    flex : 1 ,backgroundColor : "#fff",
    marginTop: Constants.statusBarHeight,
    paddingBottom : 24  
  },
  serviceDescriptionText: {
    marginVertical: 4, textAlign: "center",
    fontSize: 11, color: "#878787"
  },
  requestType: { 
    marginVertical: 8, fontWeight: "500", 
    fontSize: 14, color: "#2B3135" 
  },
  welcomText:{
    fontSize: 20, fontWeight: "700", 
    color: "#fb9011",
    alignSelf: "center" , marginVertical : 24 
  },
  bottomMain:{
     paddingTop: 12, backgroundColor: "#fff",height: "100%", 
     width: "100%", ...shadow, flex : 1,paddingHorizontal : 24,
    alignItems: "center", justifyContent: "space-between", 
    borderTopLeftRadius: 24, borderTopRightRadius: 24 
  },
  orderOpts : { 
    flexDirection: "row", alignItems: "center", 
    width: "100%",
    justifyContent: "space-evenly" 
  },
  container: {
    flex: 1, width: "100%", height: "100%",
    backgroundColor: "#FEFEFE",
    alignItems: "center"
  },
  mainOptsWrapper: { 
    padding: 24, backgroundColor: "#fff", width: "100%",
    height: "65%", ...shadow, alignItems: "center", 
    justifyContent: "space-between", 
    position: "absolute", bottom: 0, borderTopLeftRadius: 24, 
    borderTopRightRadius: 24 
  },
  inputWrapper: {
    width: "100%", height: 54, borderColor: Colors.primaryOrange,
    borderWidth: 1, borderRadius: 8, justifyContent: "space-between",
    flexDirection: "row", alignItems: "center"
  },
  btnStyle: {
    flex: 1,
    height: 86, borderRadius: 8, backgroundColor: "#EDF4F9",
    alignItems: "center", justifyContent: "space-evenly", paddingHorizontal: 24
  },
  tabStyle: { backgroundColor: 'white' }

})

