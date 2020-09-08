
import React, { useEffect, useState, useContext } from 'react';
import {
  Modal, StyleSheet, ActivityIndicator as Bubbles,ScrollView, TouchableOpacity as Btn, View, Image as RnImg,
  Text, StatusBar, Dimensions, ImageBackground, TextInput , 
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
import firebase from 'firebase';


const shadow = {
  shadowColor: '#000000',
  shadowOpacity: 0.15,
  shadowRadius: 4,
  shadowOffset: {
    height: 2
  },
  elevation: 10
}

interface IProps { title?: string; }

type Props = IProps & IContextProps & StackScreenProps<IProps>;
const { width } = Dimensions.get("window")
interface IState {
  isModalVisible: boolean;
  authType: string;
}
const Home: any = (props: Props) => {
  const [isNewUserModalVisible, setNewUserModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {logout , setAlertData, setShowAlert, profile : {firstname}} = props.context
  const [orderNumber, setOrderNumber] = useState('801505');
  const [currentUser] = useContext(CurrentUserContext);

  useEffect(() => {
    const userNull = _.isEmpty(currentUser)
    console.log({currentUser})
    if(userNull || (!userNull && !currentUser.displayName)) {
      console.log("no current user")
      setNewUserModalVisible(true)
    }
    else{
      console.log("got a current user")
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
        
        if(!_.isEmpty(order)){
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
    <ScrollView style={{backgroundColor : "#fff"}} >
      <View style={{height : 300,width : "100%",alignSelf : "center" ,position: "absolute",top : 0}}>
          <ImageBackground source={props.route.name == "Home" ? images.banner : images.homeBg} resizeMode="cover" style={{ width: "100%", height: 300 }}/>
      </View>
     
      <View style={{ padding: 24, backgroundColor: "#fff", width: "100%",marginTop : 280, height: 400, ...shadow, alignItems: "center", justifyContent: "space-between",  borderTopLeftRadius: 24, borderTopRightRadius: 24 }} >
      <Text style={{ fontSize: 20, fontWeight: "700", color: "#fb9011", alignSelf: "center" }} >
            Welcome, {currentUser && (currentUser.displayName + " !!!")}
          </Text>
        <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "70%", justifyContent: "space-between" }} >
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
            style={{ width: 150, height: 200 }}
          >
            <View style={styles.btnStyle}  >
              <OrderIcon fill={"#F57301"} />
              <Text style={{ marginVertical: 8, fontWeight: "500", fontSize: 14, color: "#2B3135" }}>
                Order Bike
              </Text>
              <Text style={styles.serviceDescriptionText} >
                Send a bike to a local shop to buy and return your goods.
              </Text>
            </View>
          </Btn>
          <Btn
            onPress={() => props.navigation.navigate("PickUpRequest")}
            style={{ width: 150, height: 200 }}
          >
            <View style={styles.btnStyle}  >
              <BikeIcon fill={"#F57301"} />
              <Text style={{ marginVertical: 8, fontWeight: "500", fontSize: 14, color: "#2B3135" }}>
                Pick-up
                </Text>
               <Text style={styles.serviceDescriptionText} >
                Send a bike to go collect and deliver a package to your location.
                </Text>
            </View>
          </Btn>
        </View>
        <View>
          <Text style={{ marginBottom: 4 }} >Track your order</Text>
          <View overflow="hidden" style={styles.inputWrapper}>
            <TextInput value={orderNumber} onChangeText={(t)=>{ setOrderNumber(t) }} placeholder={"Enter Order Number"} style={{ flex: 1, height: "100%", paddingHorizontal: 24, paddingVertical: 4 }} />
            <Btn 
              onPress={()=> {
                processTrackOrder()
              }}
              style={[styles.btnStyle, { width: 64, flex: 0, height: 52, borderRadius: 0, backgroundColor: Colors.primaryOrange, paddingHorizontal: 0 }]}>
              {loading ? <Bubbles style={{width : 24, height : 24}} color={Colors.primaryOrange} /> :
                <Icon size={24} style={{ fontSize: 34, color: "#fff" }} name="arrow-right" />
              }
            </Btn>
          </View>
        </View>
      </View>
    </ScrollView>
  ]
};

export default withAppContext(Home)

const styles = StyleSheet.create({
  activeTextStyle: {
    color: 'red'
  },
  serviceDescriptionText: {
    marginVertical: 8, textAlign: "center", fontSize: 12, color: "#878787"
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
    alignItems: "center", justifyContent: "center", paddingHorizontal: 24
  },
  tabStyle: { backgroundColor: 'white' }

})

