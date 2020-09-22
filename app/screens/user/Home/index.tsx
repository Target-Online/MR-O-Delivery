
import React, { useEffect, useState, useContext } from 'react';
import { Modal, StyleSheet, ActivityIndicator as Bubbles,ScrollView, TouchableOpacity as Btn, View, Image as RnImg,
  Text, StatusBar, Dimensions, ImageBackground, TextInput , SafeAreaView 
} from 'react-native';
import images from '../../../assets/images'
import Icon from 'react-native-vector-icons/EvilIcons'
import OrderIcon from '../../../assets/icons/OrderIcon';
import BikeIcon from '../../../assets/icons/BikeIcon';
import { Colors } from '../../../constants';
import _ from "lodash"
import { withAppContext, IContextProps } from '../../../AppContext';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
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

interface IState {
  isModalVisible: boolean;
  authType: string;
}
const Home: any = (props: Props) => {
  const [isNewUserModalVisible, setNewUserModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {logout , setAlertData, setShowAlert, profile : {firstname}} = props.context
  const [orderNumber, setOrderNumber] = useState('');
  const [currentUser] = useContext(CurrentUserContext);

  useEffect(() => {
    const userNull = _.isEmpty(currentUser)

    if(userNull || (!userNull && !currentUser.displayName)) {
      setNewUserModalVisible(true)
    }
    else{
      setNewUserModalVisible(false)
    }
  }, [currentUser])


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
      console.log("Order fetch failed ", err)
      setLoading(false)
    })
  }

  return [
    renderNewUserModal(),
    <SafeAreaView style={{flex : 1 ,backgroundColor : "#fff", marginTop: Constants.statusBarHeight,paddingBottom : 24  }} >
      <ScrollView style={{backgroundColor : "#fff", flex : 1,}} >
        <View style={{flex : 1}}>
          <View style={{height : 300, width : "90%",alignSelf : "center" }}>
              <ImageBackground source={props.route.name == "Home" ? images.banner : images.homeBg} resizeMode="cover" style={{ width: "100%", height: "100%" }}/>
          </View>

          <View style={styles.bottomMain} >
            <Text style={styles.welcomText} >
              Welcome, {currentUser && (currentUser.displayName + " !!!")}
            </Text>
            <View style={styles.orderOpts} >
              <Btn
                onPress={() => {
                    setAlertData({text : "Feature Coming Soon " , title: "Coming Soon..." , 
                    buttons : [{
                      label : "Ok",
                      onPress : ()=> setShowAlert(false)
                    }]})
                    setShowAlert(true)
                  }
                }
                style={{ width: width*0.4, height: 200 }}
              >
                <View style={styles.btnStyle}  >
                  <View style={{height : 46}}>
                  <OrderIcon fill={"#F57301"} />
                  </View>
                  <Text style={styles.requestType}>
                    Order Bike
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
                    Pick-up
                    </Text>
                    <Text style={styles.serviceDescriptionText} >
                    Send a bike to go collect and deliver a package to your location.
                    </Text>
                </View>
              </Btn>
            </View>
            <View>
              <Text style={{ marginBottom: 4, marginTop : 16 }} >Track your order</Text>
              <View overflow="hidden" style={styles.inputWrapper}>
                <TextInput value={orderNumber} onChangeText={(t)=>{ setOrderNumber(t) }} placeholder={"Enter Order Number"} style={{ flex: 1, height: "100%", paddingHorizontal: 24, paddingVertical: 4 }} />
                <Btn 
                  disabled={!orderNumber}
                  onPress={()=> {
                    orderNumber && processTrackOrder()
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
  serviceDescriptionText: {
    marginVertical: 4, textAlign: "center", fontSize: 11, color: "#878787"
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

