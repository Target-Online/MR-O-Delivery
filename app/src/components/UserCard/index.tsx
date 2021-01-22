import React from 'react'
import { View, Text , TouchableOpacity as Btn, Image, StyleSheet , Linking, Dimensions} from 'react-native'
import images from '@assets/images'
import CallIcon from '@assets/icons/CallIcon'
import { IContextProps, withAppContext } from '@context/AppContext'
import { IUser } from '@types'

type IProps = {
    user : IUser;
    isUser?: boolean;
}  &  IContextProps

const UserCard = (props : IProps) =>{

    const { user , isUser} = props
    const { displayName , vehicleRegistration , phoneNumber , profilePicUrl}  = user || {} 
    const displayPic = profilePicUrl ? {uri : profilePicUrl} : images.headShot

    return(

        <View style={styles.container}>
            <Image source={displayPic} style={styles.displayPic} />
            <View style={styles.driverInfo}>
                <Text style={styles.driverName} >{displayName}</Text>
                {!isUser && <Text style={styles.driverName} >Vehicle Name</Text>}
                { !isUser && <Text style={styles.driverName} >{vehicleRegistration}</Text> }                          
            </View>
            <View style={styles.contactardWrapper}>
                <Btn onPress={()=>{
                    Linking.openURL(`tel:${phoneNumber}`)
                }} 
                style={styles.contactBtn}>
                    <CallIcon />
                </Btn>
            </View>
        </View>
    )

}

export default withAppContext(UserCard)


const styles = StyleSheet.create({
    driverName:{
        color : '#fff',
        fontSize : 10,
    },
    contactardWrapper : {
        position : "absolute",right : 16 ,
        width : 50, marginRight: 16, flexDirection : "row",
        flex : 1, justifyContent : "space-between"
    },
    driverInfo : {
        height : "100%", justifyContent : "center",
        padding : 16
    },
    displayPic : {
        width: 46, height : 46, 
        borderRadius : 23
    },
    contactBtn:{
        width : 50,
        height : 50,
        borderRadius : 25,
        backgroundColor: "#F57301",
        justifyContent : "center",
        alignItems : "center"
    },
    container: {
        width : "100%" ,backgroundColor :"#000",
        height: 100, flexDirection : "row",
        alignItems : "center",paddingHorizontal : 24 
    }  
})
