import * as React from 'react';
import { createContext, useState, Component, useEffect, useReducer, useRef } from "react";
import { TextInput,Image, View, Modal, Text, TouchableHighlight as Btn, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable"
import { Colors } from '../../constants';
import {  withAppContext } from '../../AppContext';
import { IContextProps } from 'types'
import { Rating , AirbnbRating } from 'react-native-ratings';
import images from '../../assets/images';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { number } from 'prop-types';

const { width, height } = Dimensions.get('window')
interface IBtn {
    label : string;
    onPress : () =>void
}
export interface IAlertProps {
  text: string;
  buttons : IBtn[];
  onClose ?: () => void;
  title : string;
  children?: React.ReactNode;
}

type IProps = IAlertProps & IContextProps

const RatingModal  : React.SFC<IProps>  = (props) => {

        const [rating,setRating] = useState<number>(0)
        const [comment , setComment ] = useState<string>("")
        const { userInRating : {userRating, isDriver, comments, phoneNumber, displayName},
            updateUserProfile,updateOrderStatus, setRatingsVisible,currentUser,
            ratingsVisible , order} = props.context

        const ratingCompleted = (rating : number) => { setRating(rating)}

        const submitRating = () =>{
            const newRating = userRating ? (userRating+rating)/2 : rating
            const author ={ phoneNumber : currentUser.phoneNumber, displayName : currentUser.displayName}
            const latestComment = { author, comment }
            const newComments = comments ? [...comments, latestComment] : [latestComment]
            const updatedUser = {...userRating,  userRating : newRating , comments : newComments}
            console.log({phoneNumber})
            updateUserProfile(phoneNumber, updatedUser)
            isDriver && updateOrderStatus(order.orderId , {...order, rated : true}) //set rated to true if I'm rating a driver
            setRatingsVisible(false)
        }

        return (
            <Modal 
                visible={ratingsVisible}
                animationType="fade"
            >
                <ScrollView contentContainerStyle={styles.wrapper}>
                    <View overflow="hidden" style={[styles.dialogContainer, {height : 162,marginBottom : 4,padding : 0, justifyContent  :"flex-start"}]}>
                        <View style={styles.topBlackBar}>
                            <Btn  
                                onPress={()=>{
                                    setRatingsVisible(false)
                                }}
                                style={styles.closeIcon}>
                                <AntDesign name="close" size={20} color="#fff" />
                            </Btn>
                            <Text style={{color : "#fff",marginLeft : 8}}>Rating</Text>
                        </View>
                        <View style={styles.userDetails}>
                            <Image source={images.headShot} style={{width : 34,height :34}} />
                            <Text style={styles.userText}>{displayName}</Text>
                        </View>
                    </View>
                    <Animatable.View duration={300} easing="ease-in" animation="fadeIn" style={[styles.dialogContainer, {paddingHorizontal : 24, justifyContent:"space-around"}]} >
                    <Text style={[styles.userText, {alignSelf : "center"}]}>{`Rate your experience with ${displayName}`}</Text>
                        <AirbnbRating
                            type='star'
                            reviews={["Bad", "Meh", "OK", "Good",  "Very Good", "Excellent"]}
                            defaultRating={3}
                            ratingCount={5}
                            imageSize={1}
                            reviewColor={Colors.primaryOrange}
                            reviewSize={20}
                            starStyle={{width : 30, height : 30}}
                            selectedColor={Colors.primaryOrange}
                            onFinishRating={ratingCompleted}
                        />
                        <TextInput
                            placeholder={"Leave a comment..."}
                            style={styles.commentInput}
                            value={comment}
                            onChangeText={(text) => setComment(text)}
                        />
                        <TouchableHighlight style={styles.continueBtn} onPress={()=> submitRating() } >
                            <Text style={{color : "#fff"}}> Submit </Text>
                        </TouchableHighlight>
                     </Animatable.View>
                </ScrollView>
            </Modal>       
    )
}

const styles = StyleSheet.create({
    wrapper : { 
        minHeight: height * 1.5,
        paddingBottom: height / 2,
        backgroundColor : "rgba(33,44,54,0.9)", 
        flex : 2,alignItems: "center", width : "100%",
        justifyContent : "center" 
    },
    userText : {
        color : Colors.overlayDark60,
        fontSize : 13
    },
    topBlackBar : {
        backgroundColor : "#000", height : 42,
        width : "100%" , flexDirection : "row",
        alignItems : "center",paddingHorizontal : 8 
    },
    commentInput : { 
        borderBottomColor : Colors.overlayDark50,
        alignSelf : "center",borderBottomWidth : 1,
        width : "90%", height: 32 
    },
    continueBtn: {
        width : "90%",height : 42 ,
        alignItems : "center", justifyContent : "center",
        backgroundColor : Colors.primaryOrange,
        borderRadius : 3, alignSelf : "center"
    },
    userDetails : {
        alignSelf : "center", alignItems : "center",
        padding : 12, height : 120,
        justifyContent : "space-around"
    },
    closeIcon : {
        width : 30, height : 30,
        justifyContent : "center"
    },
    btnsWrapper: {
        width : "100%", position  : "absolute",
        bottom : 16, justifyContent:"flex-end",
        alignSelf : "center"
    },
    buttonStyle:{
        width : 200 ,height : 42,marginTop: 4,
        borderRadius : 3  ,backgroundColor: Colors.primaryOrange , 
        alignSelf : "center",alignItems : "center",justifyContent : "center"
    },
    dialogContainer : { 
        width : width*0.9 ,height : 300 ,
        backgroundColor : "#fff" , borderRadius : 6,
        padding : 16
    },
    title : {
        fontSize : 16,fontWeight: "700",
        textAlign :"center",alignSelf : "center", 
        position : "absolute", top : 36
    },
    btnText:{
        color:"#454F5B",
        fontSize :14
    },
    textBold : {
      fontSize :14
  },
  searchBarWrapper: {
      width : "60%",
      flex : 1,
      alignSelf : "center",
      alignItems : "center",
      flexDirection : "row",
      backgroundColor : "rgba(0,0,0,0.1)",
      borderRadius :24,
      paddingHorizontal : 16,
      marginRight : 6
  },
});


export default withAppContext(RatingModal)





