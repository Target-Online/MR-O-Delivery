//import liraries
import React, { Component } from "react";
import { View, StyleSheet, FlatList, ScrollView ,TouchableOpacity, SafeAreaView , Modal} from "react-native";
import {  Appbar, Title, Avatar, Card, Paragraph, Dialog, Portal } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import { Colors, Metrics, Fonts } from "@constants"; 
import {Icon, Container, Button, Content, Tabs,Picker, Form, Item, Input,ScrollableTab } from 'native-base';
import {Text, Image } from '@components'
import images from "@assets/images";
import LocationIcon from "@assets/icons/LocationIcon";

const dummyData = [
  {
    imageUrl: "https://media.gettyimages.com/photos/hamburger-on-white-picture-id166543020?k=6&m=166543020&s=612x612&w=0&h=nrAtpF6R4frym64PnqKqMNdlgyUoKdsO-3mA3ypMLNE=",
    title: "Burgers"
  },
  {
    imageUrl: "https://media.gettyimages.com/photos/fruit-smoothies-picture-id173501950?k=6&m=173501950&s=612x612&w=0&h=lqqIi0A4DgyxekW40kTL7zIaC-fcg0C7rZknLjhKYK0=",
    title: "Shakes"
  },
  {
    imageUrl: "https://media.gettyimages.com/photos/vegetarian-pizza-03-picture-id184098729?k=6&m=184098729&s=612x612&w=0&h=9uE3n_sHYObLkmIgysvM__X94zwYPOpCMs5_nLXKil4=",
    title: "Pizza"
  },
  {
    imageUrl: "https://media.gettyimages.com/photos/man-food-picture-id172259570?k=6&m=172259570&s=612x612&w=0&h=Lz-ar6ZjRCRmW6WKhXRqJDMu0z8sTqJRioHc61RhaHI=",
    title: "Ribs"
  },
  {
    imageUrl: "https://media.gettyimages.com/photos/chicken-wings-take-out-picture-id174686395?k=6&m=174686395&s=612x612&w=0&h=VdJPzzlYp6ywE9NIfUWLd0osaGTGZHwWvrkgsdvY33U=",
    title: "Wings"
  },
  {
    imageUrl: "https://media.gettyimages.com/photos/fries-in-a-cardboard-tray-on-a-white-background-picture-id155287019?k=6&m=155287019&s=612x612&w=0&h=0BO4cxIQdviqkmwVKQN9LIey96WW1ls3KUHOkZ3HJVA=",
    title: "Fries"
  }
];

const dummyRestaurant = [
  {
    imageUrl: "https://i.pinimg.com/originals/23/e6/64/23e664116abe4788c7d8750ab9379b5f.png",
    title: "KFC",
    place: "KFC Esikawini"
  },
  {
    imageUrl: "https://famousbrands.co.za/wp-content/uploads/2017/02/debonairs.png",
    title: "Debonairs Pizza",
    place: "Debonairs Pizza Esikawini"
  },
  {
    imageUrl: "https://scontent.fcpt5-1.fna.fbcdn.net/v/t1.15752-9/75603432_752568558593586_5025917867321720832_n.png?_nc_cat=110&_nc_eui2=AeFV90w7Fy5qjIBJ2eBS5l6T2wTb12vSS3yNmVQJWqSK3fe5GvxUmyjLkM8tvdaa8-Xl-0OvLqE5q9sf9SEdXUjGlSXobkuIcrANxCz4HZCB4A&_nc_oc=AQl-VLtuYZ-hCKQjghD5G_hv5ZkQSfGEO5XAejHCU1wucnycr-VboHbSqKoVpblYQps&_nc_pt=1&_nc_ht=scontent.fcpt5-1.fna&oh=f7dcdd1b74d5df701abe143aa5d375fe&oe=5E58A645",
    title: "Kwa-Nembula",
    place: "KwaNembula Esikawini"
  },
  {
    imageUrl: "https://cdn.dribbble.com/users/3558325/screenshots/6820878/3d-burger-king-logo.png",
    title: "Bugger King",
    place: "Bugger King Esikawini"
  },
  {
    imageUrl: "https://miro.medium.com/max/2000/1*6JDbWUZmpWT_reZbXAaj4g.png",
    title: "MacDonald's",
    place: "MacDonald's Esikawini"
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Logo_of_Wimpy.svg/1200px-Logo_of_Wimpy.svg.png",
    title: "Wimpy",
    place: "Wimpy Esikawini"
  },
  {
    imageUrl: "https://famousbrands.co.za/wp-content/uploads/2017/02/steers-1.png",
    title: "Steers",
    place: "Steers Esikawini"
  }
];

// create a component
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dummyData,
      place: dummyRestaurant,
      visible : false,
      selectedAddress : null,
      storedAdresses :  null,
      addressModalVisible  :  false
    };
  }

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  renderAddressModal(){

    const {addressModalVisible} = this.state
    const {width, height} = Metrics.window
     return( 
     <Modal visible={addressModalVisible}>
       <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{flex : 1 , width : '100%' , alignItems : 'center' ,paddingVertical : 20}}>
              <Image width={200} height={200} source={images.thumela} />

              <Text>Tell us where to find you.</Text>

              <View style={{width : 50, height : 50 ,  marginVertical : 10, alignItems : 'center'}}>
                <LocationIcon fill={Colors.romansRed} width={60} height={60}></LocationIcon>
              </View>
            

              <View style={{width : '80%'}}>
                  <Content>
                      <Form style={{ width : '100%', alignContent : 'center', paddingHorizontal : 20}}>
                  
                          <Item  floatingLabel={true}>
                              <Input 
                                  onChangeText={(text)=>{
                                      this.setState({name : text})
                                  }} 
                                  placeholder="Town/Suburb/City" />
                          </Item>
                          <Item floatingLabel={true}>
                              <Input 
                                  onChangeText={(text)=>{
                                      this.setState({email : text})
                                  }} 
                                  placeholder="Street Address" />
                          </Item>
                          <Item floatingLabel={true}>
                              <Input 
                                  onChangeText={(text)=>{
                                      this.setState({password : text})
                                  }} 
                                  secureTextEntry placeholder="Unit/Complex No." />
                          </Item>
                          {/* <Item floatingLabel last>
                              <Input 
                                  onChangeText={(text)=>{
                                      this.setState({passConfirm : text})
                                  }}  
                                  secureTextEntry placeholder="Confirm Password" />
                          </Item> */}
                      </Form>
                      
                  </Content>
              </View>
              <Button onPress={()=> { this.setState({addressModalVisible : false})}}
                        bordered style={{width : '70%', justifyContent : 'center', alignItems : 'center', borderWidth : 3, marginTop : 30}} danger>
                        <Text >Save</Text>
                </Button>
            </View> 
          </ScrollView>
     </Modal>)
  }

  renderAddressPicker() {
    return (
      <Form>              
        <Picker
          mode="dropdown"
          placeholder="Please Enter Address"
          placeholderStyle={{color : 'white' , ...Fonts.captionBold}}
          iosHeader="Select Address"
          stylr
          iosIcon={<Icon type="FontAwesome" name="chevron-down" style={{ color: "white", fontSize: 16 }} />}
          style={{ height : '100%', width: undefined }}
          selectedValue={this.state.selectedAddress}
          onValueChange={()=>{}}
        >
          <Picker.Item label="Home Address" value="key0" />
          <Picker.Item label="Work" value="key1" />
          <Picker.Item label="Other" value="key2" />
          <Picker.Item label="Credit Card" value="key3" />
          <Picker.Item  label="Net Banking" value="key4" />
        </Picker>
      </Form>
    );
  }

  render() {
    const {selectedAddress} = this.state
    return [
      this.renderAddressModal(),
      <SafeAreaView>

        <View  style={{backgroundColor :  Colors.romansRed , height :  60,alignItems : 'center'}}>
          {/* <Text mv={1} font={Fonts.caption} color={"white"} >Deliver to : </Text> */}

          <View style={{flexDirection : 'row' , alignItems : 'center'}}>
                
          {this.renderAddressPicker()}
           
          </View>
         
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginLeft: 10, marginRight: 10 }}
        > 
  
          <Text font={Fonts.displayBold} mv={3} ml={2}>Popular Categories</Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.data}
            keyExtractor={(item, index) => item.title}
            renderItem={({ item: rowData }) => {
              return (
                <View style={styles.popularCategories}>
                  <Avatar.Image size={100} source={{ uri: rowData.imageUrl }} />
                  <Text style={styles.popularText}>{rowData.title}</Text>
                </View>
              );
            }}
          />
          <Text font={Fonts.displayBold} mv={3} ml={2}>Best Deals</Text>
          <Carousel
            enableMomentum={true}
            activeSlideAlignment={"start"}
            ref={c => {
              this._carousel = c;
            }}
            layout={"default"}
            data={dummyData}
            itemHeight={200}
            style={{alignItems : 'center'}}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={1}
            renderItem={({ item: rowData }) => {
              return (
                <View style={{marginVertical : 10 , alignSelf : 'center' , width : '100%'}}>
                  <Card> 
                    <Card.Cover source={{ uri: rowData.imageUrl }} />
                    <Text 
                    mv={1}
                    ml={2} 
                      style={{fontSize:20,padding:20}}>{rowData.title}</Text>
                  </Card>
                </View>
              );
            }}
            sliderWidth={Metrics.window.width}
            itemWidth={Metrics.window.width*0.9}
          />
          <Text font={Fonts.displayBold} mv={3} ml={2}>Most Popular Restaurant</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.place}
            keyExtractor={(item, index) => item.title}
            renderItem={({ item: rowData }) => {
              return (
                <Card
                onPress={()=>{
                  this.props.navigation.navigate("ProductList")
                }}
                 style={{
                  elevation:1,
                  borderColor:"#000",
                  margin:10,
                }}>
                    <Card.Title title={rowData.title} />
                    <Card.Cover source={{ uri: rowData.imageUrl }} />
                </Card>
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
    ];
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20
  },
  popularCategories: {
    flex: 1,
    alignItems: "center",
    margin: 7
  },
  popularText: { marginTop: 5, fontSize: 17 }
});

//make this component available to the app
export default HomeScreen;
