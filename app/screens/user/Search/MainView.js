import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Alert} from 'react-native'
import { connect } from 'react-redux'
import { FilterComms, GetAllComms, addToFavourites, clearError, 
  clearGraphData, getFavourites, removeFromFavourites , showCommodityGraph, hideCommodityGraph } from '../../../actions/appActions'
import { GraphModal, Text, } from '../../../components'
import { Fonts, Metrics , Colors } from '../../../constants'
import { dateString } from '../../../utils/dateTime'
import localStorage from '../../../utils/localStorage'
import { iPhoneLarge } from '../../../utils/screenSize'
import Loading from '../Loading'
import styles from './styles'
import { TextInput, View,ImageBackground, SafeAreaView, ScrollView } from 'react-native'
import images from '../../../assets/images'


const { width, height } = Metrics.window

class MainView extends Component {

    state = {
      focusedEntry : {},
      fontSize : 20,
      modalVisible : false,
      showSplash : true,
      normalize : false,
      currentlySwiped : null,
      favCommodities : this.props.favourites || []
    }

    updatedSwiped = (name) => {
      this.setState({ currentlySwiped : name })
    }

    componentWillMount (){
      const { getCommodities , commodites } = this.props
      getCommodities()
    }


    switchView (entry){
      const { filterComms , currentCommName ,currentCommData } = this.props

      this.setState({ focusedEntry : entry })
      filterComms(entry.name) 
    }
    
    toggleFavor (commodity){
      const { removeFav ,addToFavs } = this.props
      let fav = this.checkFav(commodity)
      const { name } = commodity 
      if(!fav) addToFavs(name) 
      else removeFav(name)
    }

    
    checkFav = ({ name }) =>{
      const { favCommodities } = this.state
      return favCommodities && favCommodities.includes(name)
    }

    renderErrorAlert (){
      const { error , getCommodities , clearErrorMSg } = this.props
      error && Alert.alert(
        'Error',
        error,
        [
          { text: 'Try Again', 
            onPress: () => {
              clearErrorMSg()
              getCommodities()
            }
          },
          {
            text: 'Cancel',
            onPress: () => clearErrorMSg(),
            style: 'cancel'
          }             
        ],
        { cancelable: false },
      )
    }

    renderLoader (){
      const { isLoading } = this.props
      return(
        <Loading  displayText={''}
          visible={isLoading}>
        </Loading>
      )
    }
    
    render () {
      let toggle = false
      const { focusedEntry, modalVisible } = this.state
      const { commsObject, showCommGraph, lastUpdated  ,isGraphVisible,isLoading,currentCommName, dataRetrieved } = this.props
      const { commodities } = commsObject
      let updatedDate =  lastUpdated && dateString(lastUpdated)

      if (!modalVisible && dataRetrieved && currentCommName && !isLoading && focusedEntry.name == currentCommName){
          this.setState({ modalVisible : true })
      }
       
      return [
        
        <SafeAreaView style={{flex : 1 ,paddingHorizontal : 20}}>
            <View style={styles.textInput}>
              <TextInput
                placeholder={'Search for a restuarant or a cuisine'}
                style={{ ...Fonts.button , flex : 1, marginHorizontal : 2, width: '100%', color : Colors.textGrey }}
                onChangeText={(text)=> { 

                  //setUserEmail(text)   
                }
                }
              />
            </View>
            <Text mb={3} color={Colors.overlayDark20} ml={2.25}>Food Categories</Text>
            <ScrollView style={{paddingHorizontal :20}}>
                {categoryList.map((item , index) =>(

                  index%2 == 0 && <View style={{flexDirection : 'row', justifyContent :'space-between', }}>
                        <CategoryCard leftComp={ categoryList[index+1] !== null} category={item} /> 
                        {categoryList[index+1] && <CategoryCard category={categoryList[index+1]} />}
                    </View> 

                  ))}
            </ScrollView>
        </SafeAreaView>
        
      ]
    }
}

const mapDispatchToProps = dispatch => ({
    addToFavs: payload => dispatch(addToFavourites(payload)),
    removeFav: payload => dispatch(removeFromFavourites(payload)),
    getFavs: () => dispatch(getFavourites()),
    getCommodities: () => dispatch(GetAllComms()),
    filterComms: (name) => dispatch(FilterComms(name)),
    clearErrorMSg : () => dispatch(clearError()),
    clearCurrentCommData : () => dispatch(clearGraphData()),
    showCommGraph : () => dispatch(showCommodityGraph()),
    hideCommGraph : () =>  dispatch(hideCommodityGraph())
 })


const mapStateToProps = state => ({
  state : state,
  favourites: state.dataReducer.favourites,
  commsObject : state.localState.commoditiesObject,
  currentCommData : state.localState.focusedCommTrend,
  error : state.localState.error,
  currentCommName : state.localState.currentCommName,
  isLoading : state.localState.isLoading,
  dataRetrieved : state.localState.dataRetrieved,
  lastUpdated  : state.dataReducer.lastUpdated,
  isGraphVisible : state.localState.showGraph,
})
  
const CategoryCard = ({category,leftComp}) => {

    return(<ImageBackground source={category.image} style={{flex : 1,height : 150,  alignItems : 'center',  marginBottom : 2, marginRight : leftComp ? 2 : 0, justifyContent :'space-between'}}>
  
    <View style={{width : '100%',height: '100%', backgroundColor : Colors.overlayDark50, alignItems : 'center', justifyContent : 'center' }}>    
          <Text font={Fonts.jumbo} color={Colors.white}>
           {category.name}
          </Text>
          </View>
    </ImageBackground>
    )
}

const categoryList = [
  { name : "BBQ",
    image :  images.bbq
  },
  { name : "Sushi",
  image :  images.sushi
  },
  { name : "Pizza",
    image :  images.combo
  },
  { 
    name : "African",
    image :  images.african
  },
  { 
    name : "Seafood",
    image :  images.seafood
  },
  { 
    name : "Vegetarian",
    image :  images.seafood
  },
  
]


export default connect(mapStateToProps,mapDispatchToProps)(MainView)
  
// FIXME: Remove comments, unused imports and inline styles. Use Strings file.