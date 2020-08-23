
import React from 'react';
import {
  Modal, StyleSheet, TouchableOpacity as Btn, View, Image as RnImg,
  Text, StatusBar, Dimensions, ImageBackground, TextInput
} from 'react-native';
import images from '../../../assets/images'
import { Image } from '../../../components';
import Icon from 'react-native-vector-icons/EvilIcons'
import HomeIcon from '../../../assets/icons/SearchIcon';
import OrderIcon from '../../../assets/icons/OrderIcon';
import BikeIcon from '../../../assets/icons/BikeIcon';
import { Colors } from '../../../constants';
import { height } from '../../../constants/utils';
import _ from "lodash"
import { withAppContext } from '../../../AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import ProfileLoad from '../Auth/ProfileLoad';

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

type Props = IProps & StackNavigationProp<IProps>;
const { width } = Dimensions.get("window")
interface IState {
  isModalVisible: boolean;
  authType: string;
}
class Home extends React.Component<Props, IState> {

  state = {
    isModalVisible: false,
    authType: "signIn",
  }
  componentWillMount = async () => {
    const { context: { profile, user, fetchUserProfile, getAllDrivers } } = this.props
    const phoneNumber = user ? user : {}
  }



  closeModal = () => {
    this.setState({ isModalVisible: false })
  }

  renderAuthModal() {

    const { isModalVisible, authType } = this.state
    return (
      <Modal
        animated
        key="mod"
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => this.closeModal()}
      >
        <View style={{ width: "100%", flex: 1 }}>
          <View style={{ width: "100%", alignItems: "flex-end", paddingTop: 36, paddingHorizontal: 24 }}>
            <Btn onPress={() => this.closeModal()}>
              <Icon name="close" color="#000" style={{ fontSize: 24, fontWeight: "100" }} size={24} />
            </Btn>
          </View>
          <View style={{ flex: 1 }}>
          </View>
        </View>
      </Modal>
    )
  }

  renderNewUserModal = () => {

    const { context: { profile, user, fetchUserProfile, getAllDrivers } } = this.props

    console.log({ profile })
    const noUser = _.isEmpty(profile)

    console.log({ profile })
    return (
      <Modal visible={noUser}>
        <ProfileLoad />
      </Modal>
    )

  }

  openModal(authType: string) {
    this.setState({ authType, isModalVisible: true })
  }

  render() {

    const { context: { profile: { firstname }, user } } = this.props

    return [
      //this.renderNewUserModal(),
      this.renderAuthModal(),
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
              {firstname}
            </Text>
          </View>
        </ImageBackground>

        <View style={{ padding: 24, backgroundColor: "#fff", width: "100%", height: "65%", ...shadow, alignItems: "center", justifyContent: "space-between", position: "absolute", bottom: 0, borderTopLeftRadius: 24, borderTopRightRadius: 24 }} >
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "70%", justifyContent: "space-between" }} >
            <Btn
              onPress={() => this.props.navigation.navigate("PickUpRequest")}
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
              onPress={() => this.props.navigation.navigate("PickUpRequest")}
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
              <TextInput placeholder={"Enter Order Number"} style={{ flex: 1, height: "100%", paddingHorizontal: 24, paddingVertical: 4 }} />
              <Btn style={[styles.btnStyle, { width: 64, flex: 0, height: 52, borderRadius: 0, backgroundColor: Colors.primaryOrange, paddingHorizontal: 0 }]}>
                <Icon size={24} style={{ fontSize: 34, color: "#fff" }} name="arrow-right" />
              </Btn>
            </View>
          </View>
        </View>
      </View>
    ]
  }

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

