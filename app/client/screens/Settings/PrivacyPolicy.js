
import React from 'react';
import { StyleSheet, View, Image as RnImg, Text, ScrollView } from 'react-native';
import _ from "lodash"

import { Images } from '../../constants'
import { privacyPolicy  } from './constants'
import { height } from '../../constants/utils';

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RnImg resizeMode={"contain"} source={Images.MROLogo} style={styles.mrologo} />
      {privacyPolicy.map(({ title, description }) => {
        return (
          <React.Fragment>
            <Text style={styles.heading}>
              {title}
            </Text>
            <Text style={styles.serviceDescriptionText} >
              {description}
            </Text>
          </React.Fragment>
        )
      })}
      <View style={styles.underline} />
      <Text style={[styles.serviceDescriptionText, { marginTop: 24 }]} > Powered by :</Text>
      <RnImg
        resizeMode={"contain"}
        source={Images.TargetOnlineLogo}
        style={{
          height: 40,
          width: 60,

        }}
      />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: { 
    minHeight: height, 
    alignItems: "center", 
    paddingVertical: 42, 
    paddingHorizontal: 24,  
    backgroundColor: "white" 
  },
  serviceDescriptionText: {
    marginBottom: 16,
    fontSize: 12,
    color: "rgba(0,0,0,0.8)"
  },
  mrologo: { 
    width: 100, 
    height: 62, 
    marginBottom: 24 
  },
  heading: { 
    marginVertical: 8, 
    fontWeight: "bold", 
    fontSize: 14, 
    color: "black" 
  },
  underline: { 
    height: 1, 
    backgroundColor: "grey", 
    width: "100%" 
  }
})

