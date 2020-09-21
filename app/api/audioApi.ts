import { Audio } from 'expo-av'
import { INTERRUPTION_MODE_IOS_DO_NOT_MIX, INTERRUPTION_MODE_IOS_DUCK_OTHERS } from 'expo-av/build/Audio'
const soundObject = new Audio.Sound();


export const initAudio = () => {

    Audio.setIsEnabledAsync(true).then( async res => {
        await Audio.setAudioModeAsync({
            staysActiveInBackground : true,
            playsInSilentModeIOS : true,
            interruptionModeAndroid : INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            interruptionModeIOS: INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        })
    }).catch((err)=>{

    })
}

export const notify = async () => {
    try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
          require('../assets/audio/notif_tone.mp3'),
          { shouldPlay: true, volume : 1, }, null
        );
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
}