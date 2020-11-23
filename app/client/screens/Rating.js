import React, { useState } from 'react';
import { TextInput, Image, View, Modal, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable"
import { materialTheme } from '../constants';
import { Images } from '../constants';
import { CurrentUserContext } from '../Store';
import { update } from '../api';

const { height, width } = Dimensions.get('screen');

export default function Rating({
    request,
    isVisible,
    setVisible,
}) {
    const [currentUser] = React.useContext(CurrentUserContext);
    const [comment, setComment] = useState();
    const [rating, setRating] = useState(0);

    const _onFinishRating = () => {
        update('requests', request.id,
            currentUser.isDriver
                ? { customerRating: rating }
                : { driverRating: rating }
        )

        rating > 0 && update('users',
            currentUser.isDriver ? request.customer.id : request.driver.id, {
            latestRatingComment: comment
                ? comment
                : request.customer.latestRatingComment ? request.customer.latestRatingComment : '',
            averageRating: currentUser.isDriver
                ? request.customer.averageRating ? (request.customer.averageRating + rating) / 2 : rating
                : request.driver.averageRating ? (request.driver.averageRating + rating) / 2 : rating
        })

        setVisible(false);
    }

    return (
        <Modal visible={isVisible} animationType="fade">
            {currentUser &&
                <ScrollView contentContainerStyle={styles.wrapper}>
                    <View overflow="hidden" style={[styles.dialogContainer, { height: 162, marginBottom: 4, padding: 0, justifyContent: "flex-start" }]}>
                        <View style={styles.topBlackBar}>
                            <TouchableOpacity
                                onPress={() => setVisible(false)}
                                style={styles.closeIcon}>
                                <AntDesign name="close" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{ color: "white", marginLeft: 8 }}>Rating</Text>
                        </View>
                        <View style={styles.userDetails}>
                            <Image
                                style={styles.image}
                                source={currentUser.isDriver
                                    ? request.customer.photoUrl ? { uri: request.customer.photoUrl } : Images.photoPlaceHolder
                                    : request.driver.photoUrl ? { uri: request.driver.photoUrl } : Images.photoPlaceHolder
                                }
                            />
                            <Text style={styles.userText}>{currentUser.isDriver ? request.customer.displayName : request.driver.displayName}</Text>
                        </View>
                    </View>
                    <Animatable.View duration={300} easing="ease-in" animation="fadeIn" style={[styles.dialogContainer, { paddingHorizontal: 24, justifyContent: "space-around" }]} >
                        <Text style={[styles.userText, { alignSelf: "center" }]}>
                            {`Rate your experience with ${currentUser.isDriver ? request.customer.displayName : request.driver.displayName}`}
                        </Text>
                        <AirbnbRating
                            type='star'
                            reviews={["Bad", "Needs to improve", "OK", "Good", "Very good", "Excellent"]}
                            defaultRating={3}
                            ratingCount={5}
                            imageSize={1}
                            reviewColor={materialTheme.COLORS.PRIMARY}
                            reviewSize={20}
                            starStyle={{ width: 30, height: 30 }}
                            selectedColor={materialTheme.COLORS.PRIMARY}
                            onFinishRating={value => setRating(value)}
                        />
                        <TextInput
                            placeholder={'Leave a comment...'}
                            style={styles.commentInput}
                            value={comment}
                            onChangeText={(text) => setComment(text)}
                        />
                        <TouchableOpacity
                            style={styles.continueTouchableHighlight}
                            onPress={() => _onFinishRating()}>
                            <Text style={{ color: "white" }}>Submit</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </ScrollView>
            }
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        minHeight: height * 1.5,
        paddingBottom: height / 2,
        backgroundColor: "rgba(33,44,54,0.9)",
        flex: 2,
        alignItems: "center",
        width: "100%",
        justifyContent: "center"
    },
    userText: {
        color: materialTheme.COLORS.overlayDark60,
        fontSize: 13
    },
    image: {
        borderRadius: 50,
        width: 80,
        height: 80
    },
    topBlackBar: {
        backgroundColor: "#000",
        height: 42,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8
    },
    commentInput: {
        borderBottomColor:
            materialTheme.COLORS.overlayDark50,
        alignSelf: "center",
        borderBottomWidth: 1,
        width: "90%",
        height: 32
    },
    continueTouchableHighlight: {
        width: "90%",
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: materialTheme.COLORS.PRIMARY,
        borderRadius: 3,
        alignSelf: "center"
    },
    userDetails: {
        alignSelf: "center",
        alignItems: "center",
        padding: 12,
        height: 120,
        justifyContent: "space-around"
    },
    closeIcon: {
        width: 30,
        height: 30,
        justifyContent: "center"
    },
    dialogContainer: {
        width: width * 0.9,
        height: 300,
        backgroundColor: "#fff",
        borderRadius: 6,
        padding: 16
    }
});