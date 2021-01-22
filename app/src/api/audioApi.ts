import { Audio } from 'expo-av'
import { INTERRUPTION_MODE_IOS_DO_NOT_MIX, INTERRUPTION_MODE_IOS_DUCK_OTHERS } from 'expo-av/build/Audio'
const soundObject = new Audio.Sound();

export const initAudio = () => {
    Audio.setIsEnabledAsync(true).then( async res => {
        await Audio.setAudioModeAsync({
            staysActiveInBackground : true,
            playsInSilentModeIOS : true,
            playThroughEarpieceAndroid : true,
            interruptionModeAndroid : INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            interruptionModeIOS: INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        }) 
    }).catch((err)=>{})
}

export const initSound = async () => {
    try {
        await soundObject.loadAsync(require('../assets/audio/notif_tone.mp3')); 
      } catch (error) { }
}

export const playSound = async () => {
    try{
        await initSound()
        soundObject.playAsync().then(()=>{
            setTimeout(()=> {  soundObject.pauseAsync() 
                disableSound()}, 7000) })
    }catch(e){}
}

export const  disableSound = async () => {
    try {
        await soundObject.unloadAsync();
      } catch (error) { // An error occurred!
    }
}

export const notify = async () => {
    try {
        soundObject.playAsync()
      } catch (error) {
      }
}