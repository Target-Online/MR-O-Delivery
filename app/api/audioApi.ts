import { Audio } from 'expo-av'
import { INTERRUPTION_MODE_IOS_DO_NOT_MIX, INTERRUPTION_MODE_IOS_DUCK_OTHERS } from 'expo-av/build/Audio'


export const initAudio = ( ) => {

    const soundObject = new Audio.Sound();
    Audio.setIsEnabledAsync(true).then( async res => {
        await Audio.setAudioModeAsync({
            staysActiveInBackground : true,
            playsInSilentModeIOS : true,
            playThroughEarpieceAndroid : true,
            interruptionModeAndroid : INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            interruptionModeIOS: INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        })
        
    }).catch((err)=>{

    })
}

export const notify = async () => {
    try {
       
        soundObject.playAsync()
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
}