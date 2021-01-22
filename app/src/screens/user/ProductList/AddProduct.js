import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity, View,SafeAreaView , ScrollView} from 'react-native'
import {Checkbox} from 'react-native-paper'
import { connect } from 'react-redux'
import { FilterComms, addToFavourites, clearError, 
  clearGraphData, getFavourites, removeFromFavourites,
  showCommodityGraph, hideCommodityGraph } from '@actions/appActions'
import { GraphModal, Image,Text } from '@components'

import { dateString } from '@utils/dateTime'
import Loading from '../Loading'
import styles from './styles'
import { Colors, Fonts, Metrics } from '@constants'
import {Icon , } from 'native-base'
import images from '@assets/images'
const {width, height} = Metrics.window

class AddProduct extends Component {

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

    renderFoodItem = () => {

        const {quantity , total} = this.state

        return(
        <View style={{padding : 20,}}>
            <Text font={Fonts.headingBold} mb={0.5}>{"Ribs, Chips and Wings Combo"}</Text>
            <Text mb={3} font={Fonts.caption} numberOfLines={5} >Some text describing the product, what you get and all. A chance to sell the product to a user randomly browsing.</Text>
            <View style={{flexDirection : 'row', justifyContent:'space-between'}}>
                <View style={{flexDirection : "row",alignItems : "center", height: 20, width : 100,borderRadius : 20, }}>
                    <Icon  style={{color :Colors.romansRed , fontSize :  20, width : 20, height : 20 ,}}name="minus-circle"  type="FontAwesome5"></Icon>
                    <Text mh={1} font={Fonts.captionBold}>{quantity}</Text>
                    <Icon style={{color :Colors.romansRed , fontSize :  20, width : 20, height : 20}} name="plus-circle"  type="FontAwesome"></Icon>
                </View>

                <Text>{`R${total}`}</Text>

            </View>
        </View>
      )
    }

    renderCartButton = () =>{
      
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

    renderProductDetails = () => (
      <View style={{paddingHorizontal : 1 ,justifyContent : 'flex-start', alignItems : 'center', width : '100%', height : 160}}>
        <View style={{width : "100%",height  : 140,backgroundColor : 'grey'}}>
            <Image height={160} resizeMode="cover" source={images.combo} ></Image>
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
                        <View style={{flexDirection : "row", alignItems : 'center'}}>
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
              <Text color="white">{"Choose meal"}</Text>         
            </View>
          <View style={{height : "100%", width:30}} />
         
          </View>
        <ScrollView style={{flex : 1,paddingBottom: 20 }}> 
          {this.renderProductDetails()}
          {this.renderFoodItem()}
          {this.renderSides()}
        </ScrollView>
        </SafeAreaView>,
        this.renderCartButton()
        
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
  shadowOpacity: 0.15,
  shadowRadius: 4,
  shadowOffset: {
    height: 2,
    width : 2,
  },
  elevation: 10
}


export default (AddProduct)
  

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