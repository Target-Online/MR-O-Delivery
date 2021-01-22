
import React from 'react';
import { StyleSheet, View, Image as RnImg,Text, ScrollView } from 'react-native';
import { Images } from '@constants'
import _ from "lodash"
import { withAppContext, IContextProps } from '@context/AppContext';
import { StackScreenProps } from '@react-navigation/stack';
import BackScreen from '@layouts/BackScreen';

interface IProps { title?: string; }
type Props = IProps & IContextProps & StackScreenProps<any,string>;

const AboutUs : any = (props: Props) => {
  
  const writing = [
    {title : "About Us" , description : "Mr O Delivery is a Nigerian, Asaba based people’s delivery company. We deliver foodstuff, ready made food, medications, alcoholic drinks, documents, office supplies, jewelries, clothes, shoes etc" },
    {title : "Aim" , description : "To make life easier." },
    {title : "Vision" , description : "A self-reliant delivering company" },
    {title : "Our Values" , description : "We are committed to doing the right thing always. Our values are the foundation for who we are, what we do and how we operate." },
    {title: "Customer first", description : "Our customers come’s first, they are the reason for our existence. We demonstrate our gratitude by giving them high quality and superior service at all times. " }
  ]

  return (
    <BackScreen
      navigation={props.navigation}
      title={"About"}
    >
        <ScrollView contentContainerStyle={{alignItems : "center", paddingVertical : 42 , paddingHorizontal : 24 , flex : 1, backgroundColor : "white"}} style={{flex : 1, backgroundColor : "white"}}> 
          <RnImg resizeMode={"contain"} source={Images.MROLogo} style={{width : 100, height: 62,marginBottom : 24}} />
          {writing.map(({title, description})=>{
            return(
              <>
                <Text style={{ marginVertical: 8,fontWeight: "bold", fontSize: 14, color: "#000" }}>{title}</Text>
                <Text style={styles.serviceDescriptionText} > {description}</Text>
              </>
            )
          })}
          <View style={{height : 1, backgroundColor : "grey",width : "100%"}} />
          <Text  style={[styles.serviceDescriptionText, {marginTop:24}]} > Powered by :</Text>
          <RnImg
            resizeMode={"contain"}
            source={Images.TargetOnlineLogo}
            style={{ height: 40,width: 60,}}
          />
        </ScrollView>  
    </BackScreen>
  )
};

export default withAppContext(AboutUs)

const styles = StyleSheet.create({
  activeTextStyle: {
    color: 'red'
  },
  serviceDescriptionText: {
    marginBottom: 16, textAlign: "center", fontSize: 12, color: "rgba(0,0,0,0.8)"
  },
  container: {
    flex: 1, width: "100%", height: "100%",
    backgroundColor: "#FEFEFE",
    alignItems: "center"
  },
  tabStyle: { backgroundColor: 'white' }
})