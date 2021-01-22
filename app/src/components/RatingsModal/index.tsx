import * as React from 'react';
import { useState } from "react";
import { TextInput,Image, View, Modal, Text, TouchableHighlight as Btn, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable"
import { Colors } from '@constants'
import {  withAppContext } from '@context/AppContext'
import { IContextProps } from 'src/types'
import { AirbnbRating } from 'react-native-ratings'
import images from '@assets/images'
import { TouchableHighlight } from 'react-native-gesture-handler'
import firebase from 'firebase'
import styles from "./styles"

interface IBtn {
    label : string;
    onPress : () => void
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

    const [rating,setRating] = useState<number>(3)
    const [comment , setComment ] = useState<string>("")
    const { userInRating : {isDriver, phoneNumber, displayName}, updateUserProfile,
    updateOrderStatus, setRatingsVisible,currentUser, ratingsVisible , order } = props.context

    const ratingCompleted = (rating : number) => { setRating(rating)}

    const getStoredUserRating = async (id: string) =>  firebase.database().ref(`/users/${id}`).once('value')

    const submitRating = () => {

        const author = { phoneNumber : currentUser.phoneNumber, displayName : currentUser.displayName}
        const latestComment = { author, comment }
        getStoredUserRating(phoneNumber).then((snap)=>{
            const userToRate = snap.val()
            const { userRating , comments } = userToRate
            const newRating = userRating ? (userRating+rating)/2 : rating
            const newComments = comments ? [...comments, latestComment] : [latestComment]
            const updatedUser = {...userRating,  userRating : newRating , comments : newComments}
            updateUserProfile(phoneNumber, updatedUser)
            isDriver && updateOrderStatus(order.orderId , {...order, rated : true}) //set rated to true if I'm rating a driver
            setRatingsVisible(false)
        }).catch((err)=>{
            console.log({err})
        })
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
                            onPress={()=>{ setRatingsVisible(false)}}
                            style={styles.closeIcon}
                        >
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

export default withAppContext(withUsersContext(RatingModal))