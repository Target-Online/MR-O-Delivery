import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity, View,SafeAreaView ,Image as RNImg, ScrollView} from 'react-native'
import {Checkbox} from 'react-native-paper'
import { connect } from 'react-redux'
import { FilterComms, addToFavourites, clearError, 
  clearGraphData, getFavourites, removeFromFavourites,
  showCommodityGraph, hideCommodityGraph } from '../../../actions/appActions'
import { GraphModal, Image,Text } from '../../../components'
import styles from './styles'
import { Colors, Fonts, Metrics } from '../../../constants'
import {Icon } from 'native-base'
import images from '../../../assets/images'
const {width, height} = Metrics.window

class Cart extends Component {

    state = {
      focusedEntry : 'NONE', //change on unmount,
      fontSize : 20,
      modalVisible : false,
      showSplash : true,
      normalize : false,
      currentlySwiped : null,
      quantity : 1,
      total :  0.00,
      favCommodities : this.props.favourites || []
    }

    switchView (entry){
      const { filterComms , currentCommName ,currentCommData } = this.props
       
      this.setState({ focusedEntry : entry })
      filterComms(entry.name) 

    }
    


    checkFav = ({ name }) =>{
      const { favCommodities } = this.state
      return favCommodities && favCommodities.includes(name)
    }

    renderReceipt = () => {

        const {quantity , total} = this.state
        console.log("foodies ", foodItems)
        return(
        <View style={[styles.viewCard , {alignSelf : "center" , marginTop : 30 , padding : 20}]}>
            <View style={{flexDirection : "row" , alignItems : "center"}}>
                <Text font={Fonts.headingBold} >{"Order"}</Text>
                <Text ml={1} font={Fonts.caption} numberOfLines={5}> - 2 Dishes</Text>
            </View>
            {this.renderReceiptEntry()}
            {this.renderReceiptEntry()}  
            <View style={{flexDirection : "row" , alignItems : "center" , justifyContent : "space-between"}}>
                <Text color={Colors.overlayDark30} mt={2}>Order </Text>
                <Text color={Colors.overlayDark30} mt={2}>R 142 </Text>
            </View>
            <View style={{flexDirection : "row" , alignItems : "center" , justifyContent : "space-between"}}>
                <Text color={Colors.overlayDark30}  mt={2}>Delivery </Text>
                <Text color={Colors.overlayDark30}  mt={2}>R 30 </Text>
            </View>
            <View style={{flexDirection : "row" , alignItems : "center" , justifyContent : "space-between"}}>
                <Text color={Colors.overlayDark80}  mt={2}>Total </Text>
                <Text color={Colors.overlayDark80}  mt={2}>R 170 </Text>
            </View>
            <View style={{flexDirection : "row" , alignItems : "center" , marginTop : 30}}>
                <Icon type="FontAwesome" name="money" style={{color : Colors.secondayGreen , fontSize : 20, width: 30,height: 20 }}/>
                <Text font={Fonts.tiny} color={Colors.overlayDark80} >Driver will collect cash on delivery.</Text>
            </View>

        </View>
      )
    }

    renderReceiptEntry = () => {
       return( 
        <View style={{flexDirection : 'row', justifyContent:'space-between' , 
                alignItems: "flex-start" , borderBottomColor : Colors.overlayDark10, 
                borderBottomWidth : 8 , paddingVertical : 10 }}>
                <View style={{alignItems : "flex-start"}}>
                   
                    <Text font={Fonts.captionBold}>{"Food Item 1"}</Text>
                    <Text font={Fonts.caption}>sides</Text>
                    
                </View>

                <Text color={Colors.secondayGreen} font={Fonts.captionBold}>{`R 145 `}</Text>

            </View>)
    }
    renderProceedButton = () =>{
      
        const {closeModal} = this.props
        return (
            <TouchableOpacity onPress={closeModal}>
                    <View  style={{ position : 'absolute', bottom: 0 , height : 60 ,width : '100%' ,alignItems : 'center', 
                            flexDirection : "row", justifyContent : 'center',backgroundColor: Colors.romansRed}}>
                            <Text color={Colors.white} font={Fonts.captionBold}>Add To Cart</Text>                  
                    </View>
            </TouchableOpacity>
        )
    }

    renderStoreDetails = () => (
      <View style={{paddingHorizontal : 1 ,justifyContent : 'flex-start', alignItems : 'center', width : '100%',paddingTop : 100}}>    
            <RNImg style={{position : "absolute" , top: 0 , height: 160}} resizeMode="cover" source={images.combo} />
            <View style={[styles.viewCard ,{alignItems : "center" ,paddingVertical : 10}]}>
                    <View style={styles.estDeliveryCircle}>
                            <Icon style={{width : 20, height : 20, fontSize : 20, color : Colors.white}} type="FontAwesome" name="history"></Icon>                         
                    </View>
                    <Text mt={0.5} font={Fonts.caption}> 40 Minutes</Text>
                    <Text font={Fonts.headingBold} mt={2}>Nembulas Place</Text>
                    
                    <Icon style={{width : 15, height : 15, fontSize : 15, color : Colors.romansRed ,marginTop : 24}}  type="FontAwesome" name="map-marker"></Icon>
                    <Text font={Fonts.caption} align={"center"} styles={{text : {width : "80%"}}} mt={1} mb={2} numberOfLines={3}>The address for this business and contact number</Text>
            </View>
      </View>
    )

    renderSides = () =>{ 
 
        return[<View  style={{ paddingHorizontal : 20 ,justifyContent : "center", height : 40,width : '100%' ,alignItems : 'flex-start', backgroundColor: Colors.overlayDark10}}>
                        <Text>Choose sides</Text>
                </View>,
      
                <ScrollView style={{flex : 1}} contentContainerStyle={{flex : 1,alignItems : 'center',justifyContent : 'space-between'}} >
                {sides.map(({name,price})=>(
                    <View style={{height : 40,paddingHorizontal : 20, width : '100%',flexDirection : "row" , alignItems : "center", justifyContent: "space-between"}}>
                        <View style={{flexDirection : "row", alignItems : 'center', ...shadow}}>
                            <Icon  name="check-circle" type="FontAwesome" style={{ width : 18, height : 18, fontSize : 18, color : Colors.romansRed}} ></Icon>
                            <Text ml={1} font={Fonts.caption} color={Colors.overlayDark60}>{name}</Text>
                        </View>
                    
                        <Text font={Fonts.caption} color={Colors.overlayDark60}>{`R${price}`}</Text>
                    </View>
                )) 
                }
                </ScrollView>
        ]
    }

    render () {
      const { focusedEntry, modalVisible } = this.state
      const { commsObject = {}, lastUpdated , isLoading ,currentCommName, dataRetrieved,closeModal } = this.props
      const { commodities , date } = commsObject
      
      return [
        <SafeAreaView style={{flex : 1}}>
          <View  style={styles.header}>
   
          <TouchableOpacity onPress={closeModal} style={{width : 30,height:"100%",justifyContent : 'center'}}>
            <Icon type="FontAwesome" name="chevron-left" style={{width : 18, height: 18, fontSize : 18 ,color : "white"}} ></Icon>
          </TouchableOpacity>
            <View>               
              <Text color="white">{"Shopping Cart"}</Text>         
            </View>
          <View style={{height : "100%", width:30}} />
         
          </View>
        <ScrollView style={{flex : 1,paddingBottom: 20 }}> 
          {this.renderStoreDetails()}
          {this.renderReceipt()}
          {this.renderSides()}
        </ScrollView>
        </SafeAreaView>,
        this.renderProceedButton()
        
      ]
    }
}

const storesList = []



const foodItems = [
  { name : "Ribs, Wings and Chips",
    price : '150.00',
    image :  images.combo
  },
  { name : "Burger and Chips",
  price : '90.00',
  image :  images.burger
},
{ name : "Ribs, Wings and Chips",
price : '150.00',
image :  images.combo
},
  { name : "Burgerand Chips",
  price : '90.00',
  image :  images.burger
  },
  
]
const shadow =  {
  shadowColor: '#000000',
  shadowOpacity: 0.25,
  shadowRadius: 4,
  shadowOffset: {
    height: 0,
    width : 0,
  },
  elevation: 10
}


export default (Cart)
  

const sides = [
    {
        "name" : "Fried Chips",
        "price" :  15.00
    },
    {
        "name" : "1L Cold Drink",
        "price" :  19.00
    },
    {
        "name" : "Extra Sauce ",
        "price" :  4.00
    }
]