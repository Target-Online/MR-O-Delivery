
import React, { useEffect, useState } from 'react';
import { Modal , ActivityIndicator as Bubbles,ScrollView, TouchableOpacity as Btn, View, Text, 
  Dimensions, ImageBackground, TextInput , SafeAreaView } from 'react-native';
import images from 'assets/images'
import Icon from 'react-native-vector-icons/EvilIcons'
import OrderIcon from 'assets/icons/OrderIcon';
import BikeIcon from 'assets/icons/BikeIcon';
import { Colors } from 'constants';
import _ from "lodash"
import { withAppContext, IContextProps } from '../../../AppContext';
import { StackScreenProps } from '@react-navigation/stack';
import ProfileLoad from '../Auth/ProfileLoad';
import firebase from 'firebase'
import styles from "./styles"
import strings from 'constants/strings';
import { IOrder } from 'types';


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

  const processTrackOrder = () => {
    const {context : {setOrder }} = props
    setLoading(true)
    firebase.database().ref(`orders/${orderNumber}`).once('value').then((snapshot: { val: () => IOrder; }) => {
      if (!_.isEmpty(snapshot.val())){
          setOrder(snapshot.val())
          props.navigation.navigate("OrderProgress")
        }
        else{
          setAlertData({ text : strings.couldNotFindOrder, title: strings.oops, buttons : [{ label : "Ok", onPress : ()=> setShowAlert(false)}]})
          setShowAlert(true)
        }
        setLoading(false)
    }).catch(()=>{ setLoading(false) })
  }

  return [
    renderNewUserModal(),
    <SafeAreaView style={styles.mainWrapper} >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{backgroundColor : "#fff", flex : 1,}} >
        <View style={{flex : 1}}>
          <View style={styles.topBgWrapper}>
              <ImageBackground source={ images.banner } resizeMode="cover" style={styles.bgImage}/>
          </View>

          <View style={styles.bottomMain} >
            <Text style={styles.welcomText} >
              {strings.homeWelcomeMessage.replace("{0}",currentUser!.displayName )}
            </Text>
            <View style={styles.orderOpts} >
              <Btn
                onPress={() =>  props.navigation.navigate("ShoppingRequest")}
                style={styles.orderOptButton}
              >
                <View style={styles.btnStyle}  >
                  <View style={{height : 46}}>
                    <OrderIcon fill={"#F57301"} />
                  </View>
                  <Text style={styles.requestType}>{strings.shopping} </Text>
                  <Text style={styles.serviceDescriptionText} >{strings.shoppingCopy}</Text>
                </View>
              </Btn>
              <Btn
                onPress={() => props.navigation.navigate("PickUpRequest")}
                style={styles.orderOptButton}
              >
                <View style={styles.btnStyle}  >
                  <View style={{height : 46}}>
                    <BikeIcon fill={"#F57301"} />
                  </View>
                  <Text style={styles.requestType}>{strings.orderBike}</Text>
                  <Text style={styles.serviceDescriptionText} >{strings.sendABike}</Text>
                </View>
              </Btn>
            </View>
            <View style={styles.trackOrderWrapper}>
              <Text style={styles.trackOrderTitle} >{strings.trackYourOrder}</Text>
              <View overflow="hidden" style={styles.inputWrapper}>
                <TextInput value={orderNumber} onChangeText={(t)=>{ setOrderNumber(t) }} placeholder={strings.enterOrderNumber} style={styles.trackOrderInput} />
                <Btn 
                  disabled={!orderNumber}
                  onPress={() =>  { orderNumber && processTrackOrder() }}
                  style={[styles.btnStyle,styles.trackOrderTrigger, {  opacity : orderNumber ? 1 : 0.8}]}>
                  {loading ? 
                    <Bubbles size={"large"} style={{width : 24, height : 24}} color={Colors.primaryOrange} /> :
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
