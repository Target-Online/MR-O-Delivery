
import React, { useEffect, useState, useContext } from 'react';
import {
  Modal, StyleSheet, ActivityIndicator as Bubbles, TouchableOpacity as Btn, View, Image as RnImg,
  Text, StatusBar, Dimensions, ImageBackground, TextInput , 
} from 'react-native';
import images from '../../../assets/images'
import Icon from 'react-native-vector-icons/EvilIcons'
import OrderIcon from '../../../assets/icons/OrderIcon';
import BikeIcon from '../../../assets/icons/BikeIcon';
import { Colors } from '../../../constants';
import { height } from '../../../constants/utils';
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
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('76+27611801505');
  const [authType, setAuthType] = useState('signIn');
  const [currentUser] = useContext(CurrentUserContext);

  useEffect(() => {

    if(!currentUser || (currentUser && !currentUser.displayName)) {
      console.log("no current user")
      setNewUserModalVisible(true)
    }
    else{
      console.log("got a current user")
      setNewUserModalVisible(false)
    }
    }, [currentUser])


  const renderNewUserModal: any = () => {

    console.log({currentUser})
    const userNull = _.isEmpty(currentUser)
    return (
    <Modal visible={userNull}>
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
        setOrder(snapshot.val())
        console.log("=========",order)
        if(order){
          props.navigation.navigate("OrderProgress")
        }
        setLoading(false)
    }).catch((err)=>{
      console.log("Order fetch failed ", err)
      setLoading(false)
    })
   
  }

  return [
    renderNewUserModal(),
    <View key="main" style={styles.container} >
      <StatusBar barStyle="dark-content" />
      <ImageBackground source={images.homeBg} style={{ width: "100%", height: "100%" }}>

        <View style={{ width: "100%", justifyContent: "flex-end", alignItems: "flex-start", height: "35%", paddingHorizontal: 24, paddingBottom: 32 }}>
          <View style={{ position: "absolute", bottom: height / 13, right: 12 }}>
            <RnImg style={{ height: 110, width: 110 }} resizeMode="contain" source={images.DeliveryGuy} />
          </View>

          <RnImg style={{ borderRadius: 100, height: 100, width: 100 }} resizeMode="cover" source={images.headShot} />
            <Text style={{ fontSize: 16, fontWeight: "400", color: "#fff", alignSelf: "flex-start" }} >
              Welcome Back,
            </Text>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#fff", alignSelf: "flex-start" }} >
            {currentUser && currentUser.displayName}
          </Text>
        </View>
      </ImageBackground>

      <View style={{ padding: 24, backgroundColor: "#fff", width: "100%", height: "65%", ...shadow, alignItems: "center", justifyContent: "space-between", position: "absolute", bottom: 0, borderTopLeftRadius: 24, borderTopRightRadius: 24 }} >
        <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "70%", justifyContent: "space-between" }} >
          <Btn
            onPress={() => props.navigation.navigate("PickUpRequest")}
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
            <TextInput value={orderNumber} placeholder={"Enter Order Number"} style={{ flex: 1, height: "100%", paddingHorizontal: 24, paddingVertical: 4 }} />
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
    </View>
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

