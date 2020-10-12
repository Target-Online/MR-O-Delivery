import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Image, Text as RnText, Modal, ScrollView, TouchableHighlight, SafeAreaView, TouchableOpacity as Btn, TouchableWithoutFeedback, View, ImageBackground } from 'react-native'
import {Icon} from 'native-base'
import {  Text } from '../../../components'
import { Fonts, Metrics } from '../../../constants'
import { Colors } from '../../../constants'
import icons from '../../../assets/icons'
import images from '../../../assets/images'
import DeliveryGuyIcon from '../../../assets/icons/DeliveryGuyIcon'
import { withAppContext, IAppContext } from '../../../AppContext'
import { StackScreenProps } from '@react-navigation/stack'
const { width, height } = Metrics.window
//The following code executes inside one of your component's methods, post render

type Props = {context : IAppContext} & StackScreenProps<Component>

class Logout extends Component<Props> {

    state = {
      focusedEntry : 'NONE', //change on unmount,
      fontSize : 20,
      modalVisible : false,
      showSplash : true,
      selectedRange : 'MONTH',
      favCommodities : this.props.favourites || []
    }
    componentDidMount (){
    }

    checkFav = (name) =>{
      const { favCommodities } = this.state
      return favCommodities && favCommodities.includes(name)
    }


    renderUserDetails = () => {
      const { context } = this.props
      const {logout ,setAlertData,setShowAlert,currentUser : {displayName ,profilePicURL}} = context
      const imgSrc =  profilePicURL ? {uri : profilePicURL} : images.headShot
      return(
        <ImageBackground source={images.homeBg} style={{width : "100%", height : 112, flexDirection :"row",alignItems : "center"}}>
          <View style={{ flexDirection : 'row' , alignItems : 'center', width : '100%', height : 96,paddingHorizontal : 24 }}>
        
              <Btn
                  onPress={()=> {
                    // this.openModal("DriversignIn")
                  }}
                  >
                    <View
                      style={{width : 40,height: 40, borderRadius : 20,backgroundColor : "grey", borderWidth : 0.75, borderColor : "#fff",marginBottom : 12}}
                    >                 
                    <Image style={{borderRadius : 20 , height : 40, width:  40}} resizeMode="cover" source={profilePicURL} />
                    </View>
              </Btn>

            <RnText style={{fontSize : 14, fontWeight : "700", color : "#fff",marginLeft : 16 }} >
                {displayName}
            </RnText>
            </View>
        </ImageBackground>
    )}

    renderMenuOpt = (option) => {
      const { focusedEntry, favCommodities } = this.state
      const {context} = this.props
      const {logout ,setAlertData,setShowAlert,profile : {firstname}} = context
      const { displayName,icon,onPress } = option

      const signOut = () => { 
        setAlertData({text : "Are you sure you want to log out ? " , title: "Log Out" , 
        buttons : [{
          label : "Yes",
          onPress : ()=> logout()
        },
        {
          label : "No",
          onPress : ()=> setShowAlert(false)
        },
          ]})

        setShowAlert(true)
      }

      return(
      <Btn 
        onPress={()=> {
          if (displayName==="Logout"){
            return signOut()
          }
          onPress() 
        }} 
      >
          <View style={{height : 60,width : '100%', justifyContent : 'space-between',alignItems : 'center',flexDirection : 'row', borderBottomColor : Colors.overlayDark20, borderBottomWidth : 1}}>
            <View style={{flexDirection : 'row',alignItems : 'center'}}> 
              {icon}
              <Text ml={2}>
               {displayName}
              </Text>
            </View> 

            <Icon style={{height : 12,marginTop: 2, width : 12, fontSize : 12 }} type={"FontAwesome"} name="chevron-right" ></Icon>
          </View>
      </Btn>)
    }
    
    render () {
      const {logout ,setAlertData,setShowAlert,profile : {firstname}} = this.props.context
      const menuList = [
        {
          displayName : "My Profile",
          icon :  <icons.ProfileIcon fill={"#000"}/>,
          onPress : () =>  { 
            setAlertData({text : "Feature Coming Soon " , title: "Coming Soon..." , 
            buttons : [{
              label : "Ok",
              onPress : ()=> setShowAlert(false)
            }]})
    
            setShowAlert(true)
          }
        },
        {
          displayName : 'About', 
          icon :  <icons.InfoIcon></icons.InfoIcon>,
          onPress : () =>  {
            this.props.navigation.navigate("AboutUs")
          }
        },
        // { displayName : 'Help', 
        //   icon :  <icons.HelpIcon></icons.HelpIcon>,
        //   onPress : () =>  {}
        // },
        { displayName : 'Logout', 
          icon :  <icons.LogoutIcon fill={"#000"}></icons.LogoutIcon>,
          onPress : () =>  {}
        },
      ]
        
      return (
        <SafeAreaView>
        {this.renderUserDetails()}
        <ScrollView >
        <View style={{flex : 1,paddingHorizontal : 20}}>
          {menuList.map((item)=> this.renderMenuOpt(item))}
        </View>
        </ScrollView>
        </SafeAreaView>
      )
    }
}


export default withAppContext(Logout)

// FIXME: Remove unused code and imports