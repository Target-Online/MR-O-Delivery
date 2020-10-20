import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity,Modal, View,SafeAreaView , ScrollView} from 'react-native'
import { connect } from 'react-redux'
import { FilterComms, addToFavourites, clearError, 
  clearGraphData, getFavourites, removeFromFavourites,
  showCommodityGraph, hideCommodityGraph } from '../../../actions/appActions'
import { GraphModal, Image,Text } from '../../../components'
import { dateString } from '../../../utils/dateTime'
import Loading from '../Loading'
import styles from './styles'
import { Colors, Fonts, Metrics } from '../../../constants'
import {Icon} from 'native-base'
import images from '../../../assets/images'
import AddProduct from './AddProduct'
import * as Animatable from "react-native-animatable"

const {width, height} = Metrics.window
class HomeView extends Component {

    state = {
      focusedEntry : 'NONE', //change on unmount,
      fontSize : 20,
      modalVisible : false,
      showSplash : true,
      normalize : false,
      isAddProdVisible : false,
      currentlySwiped : null,
      favCommodities : this.props.favourites || [],
      selectedItem : null
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

    renderFoodItems = () => {

      const addItemClicked = (item) => {

          this.setState({selectedItem : item,isAddProdVisible : true })
      }
      return(

          foodItems.map((item , index) =>(

            (index%2 === 0) && <View style={{flexDirection : 'row', justifyContent :'space-between', }}>
                  <ItemCard onAdd={()=> addItemClicked(foodItems[index])}  item={item} /> 
                  {foodItems[index+1] && <ItemCard onAdd={()=> addItemClicked(foodItems[index+1])}  item={foodItems[index+1]} />}
              </View> 
            
          ))
     

      )
    }

    renderCheckoutButton = () =>{
      
      const {closeModal} = this.props
      return (
          <TouchableOpacity onPress={closeModal}>
                  <Animatable.View delay={200} duration={500} animation="fadeIn" style={{borderColor: Colors.white, borderWidth : 2, position : 'absolute', bottom: 10 , right : 10, height : 60 ,width : 60,borderRadius : 30 ,alignItems : 'center', 
                          flexDirection : "row", justifyContent : 'center',backgroundColor: Colors.romansRed}}>
                          <Icon style={{width : 20,height : 20, fontSize : 20 , color : Colors.white}} type="FontAwesome" name="shopping-cart"></Icon>                  
                  </Animatable.View>
          </TouchableOpacity>
      )
    }

    renderAddProductModal = () =>{

      const {selectedItem , isAddProdVisible} = this.state
      return( 
        <Modal 
            animationType="slide"
            onRequestClose={()=>{ 
              this.setState({isAddProdVisible : false})
            }}
            visible={isAddProdVisible}
            >
            <AddProduct   
              closeModal={()=>{this.setState({isAddProdVisible : false})}} 
              product={selectedItem}>

            </AddProduct>
      </Modal>
      )
    }

    renderCategories = () =>{
      const categories = [{name : "Ribs"},{name : "Wings"},{name : "Chips"},{name : "Drinks"}]
      return (
        <View  style={{ paddingHorizontal : 20 , height : 40,width : '100%' ,alignItems : 'center', backgroundColor: Colors.overlayDark10}}>

      
        <ScrollView contentContainerStyle={{flex : 1,alignItems : 'center',justifyContent : 'space-between'}} horizontal>
        {categories.map(({name})=>(
            <View style={{height : 20, width : 50,}}>
            <Text font={Fonts.caption} color={Colors.overlayDark60}>{name}</Text>
            </View>
          )) 
        }
        </ScrollView>
        </View>
        )
    }

    
    renderStoreDetails = () => (
      <View style={{paddingHorizontal : 16, flexDirection : 'row' , alignItems : 'center', width : '100%', height : 160}}>
        <View style={{width : 140,height  : 140, borderRadius : 70, backgroundColor : 'grey'}}></View>
        <View style={{height: '100%' , paddingHorizontal : 16, justifyContent :'center'}}>
          <View style={{flexDirection:'row'}}>
            <Text font={Fonts.caption} color={Colors.overlayDark30}>Ribs • </Text>
            <Text  font={Fonts.caption} color={Colors.overlayDark30}>Wings • </Text>
            <Text  font={Fonts.caption} color={Colors.overlayDark30}>Drinks </Text>
          </View>
          <Text color={Colors.overlayDark40} >Nembula's Grilland Pub</Text>
          <View style={{ height : 30,flexDirection  :'row',alignItems : 'center'}}>
            {[1,1,1,1].map(()=>(
            <Image width={20}height={20} source={images.favouriteActive} />
            ))}
            <Text ml={1} font={Fonts.tinyBold} color={Colors.overlayDark40}>
              250
            </Text>
          </View>
          <View style={{flexDirection : 'row'}}>
              <View style={{minWidth : 50, height :20, justifyContent : 'center', alignItems : 'center', borderRadius : 15 , backgroundColor : Colors.secondayGreen}}>
                <Text font={Fonts.tiny} color={Colors.white}>Open</Text>
              </View>
          </View>
        </View>
       
      </View>
    )

    render () {
      const { focusedEntry, modalVisible } = this.state
      const { commsObject = {}, lastUpdated , isLoading ,currentCommName, dataRetrieved } = this.props
      const { commodities , date } = commsObject
      
      let filteredList = commodities ? commodities.filter(this.checkFav) : []
      let updatedDate =  lastUpdated && dateString(lastUpdated)
      
      if (!modalVisible && dataRetrieved && currentCommName && !isLoading && focusedEntry.name == currentCommName){

        this.setState({ modalVisible : true })
      }

      return [
        this.renderAddProductModal(),
        // <Loading displayText={''}
        //   visible={(isLoading)}>
        // </Loading>,
        <SafeAreaView style={{flex : 1  }}>
          <View  style={styles.header}>
    
              <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{width : 30,height:"100%",justifyContent : 'center'}}>
              <Icon type="FontAwesome" name="chevron-left" style={{width : 18, height: 18, fontSize : 18 ,color : "white"}} ></Icon>
            </TouchableOpacity>
              <View>               
                <Text color="white">{"Nembula's Place"}</Text>         
              </View>
              <View style={{height : "100%", width:30}} />
          
            </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex : 1,paddingtop : 10}}> 
            {this.renderStoreDetails()}
            {this.renderCategories()}
            {this.renderFoodItems()}
          </ScrollView>
          {this.renderCheckoutButton()}
        </SafeAreaView>
        
      ]
    }
}

const storesList = []

const mapDispatchToProps = dispatch => ({
  addToFavs: payload => dispatch(addToFavourites(payload)),
  removeFav: payload => dispatch(removeFromFavourites(payload)),
  getFavs: () => dispatch(getFavourites()),
  filterComms: (name) => dispatch(FilterComms(name)),
  clearErrorMSg : () => dispatch(clearError()),
  clearCurrentCommData : () => dispatch(clearGraphData()),
  showCommGraph : () => dispatch(showCommodityGraph()),
  hideCommGraph : () =>  dispatch(hideCommodityGraph())
})
  
const mapStateToProps = state => ({
  state : state,
  favourites: state.dataReducer.favourites,
  lastUpdated  : state.dataReducer.lastUpdated,

  commsObject : state.localState.commoditiesObject,
  currentCommData : state.localState.focusedCommTrend,
  error : state.localState.error,
  currentCommName : state.localState.currentCommName,
  isLoading : state.localState.isLoading,
  dataRetrieved : state.localState.dataRetrieved,
  isGraphVisible : state.localState.showGraph 
})

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


const ItemCard = (props) => {

  const {item,onAdd} = props
  return(<View style={{width : width*0.45 ,height : 250, backgroundColor :  Colors.white, ...shadow , alignItems : 'center', paddingHorizontal: 10,marginHorizontal :10, paddingVertical: 10,marginBottom : 10, justifyContent :'space-between'}}>

  <View style={{width : width*0.35, backgroundColor : 'grey', height : width*0.35 , borderRadius : width*0.25 }}>    
    <Image width={'100%'} height={'100%'} styles={{container : {borderRadius :  width*0.175}}} resizeMode="contain" source={item.image}></Image> 
    </View>
    <Text mt={0.5} color={Colors.overlayDark30} font={Fonts.caption} >{item.name}</Text>
    <Text color={Colors.secondayGreen}>{item.price}</Text>
    <TouchableOpacity onPress={onAdd} style={{width : '90%', justifyContent : 'center', backgroundColor : Colors.romansRed, height: 30, borderRadius : 3, alignItems : 'center'}} >
      {/* <View style={{width : '90%', justifyContent : 'center', backgroundColor : Colors.romansRed, height: 30, borderRadius : 3, alignItems : 'center'}}> */}
          <Text font={Fonts.caption} color={Colors.white}>
            Add
          </Text>
      {/* </View> */}
    </TouchableOpacity>
  </View>
  )
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeView)
  