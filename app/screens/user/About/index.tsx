
import React, { useEffect, useState, useContext } from 'react';
import {  View, Image as RnImg,
  Text, ScrollView, Dimensions 
} from 'react-native';
import { Images } from '../../../constants'
import _ from "lodash"
import { withAppContext, IContextProps } from '../../../AppContext';
import { StackScreenProps } from '@react-navigation/stack';
import BackScreen from '../../../layouts/BackScreen';
import styles from "./styles"
import strings from 'constants/strings';

interface IProps { title?: string; }

type Props = IProps & IContextProps & StackScreenProps<IProps>;
const { width } = Dimensions.get("window")

const AboutUs : any = (props: Props) => {
  
  const writing = [
    {title : strings.aboutUs, description : strings.aboutUs1 },
    {title : strings.aim , description : strings.aboutUs2 },
    {title : strings.vision, description : strings.aboutUs3 },
    {title : strings.ourValues , description : strings.aboutUs4 },
    {title: strings.customerFirst , description : strings.aboutUs5 }
  ]

  return (
    <BackScreen
      navigation={props.navigation}
      title={"About"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} style={{flex : 1, backgroundColor : "white"}}> 
        <RnImg resizeMode={"contain"} source={Images.MROLogo} style={styles.topLogo} />
        {writing.map(({title, description})=>{
          return(
            <>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.serviceDescriptionText} >{description}</Text>
            </>
          )
        })}
        <View style={styles.underline} />
        <Text style={[styles.serviceDescriptionText, {marginTop:24}]} >{strings.poweredBy}</Text>
        <RnImg resizeMode={"contain"} source={Images.TargetOnlineLogo} style={styles.targetLogo}/>
      </ScrollView>  
    </BackScreen>
  )
};

export default withAppContext(AboutUs)