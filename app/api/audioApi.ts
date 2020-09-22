import { Audio } from 'expo-av'
import { INTERRUPTION_MODE_IOS_DO_NOT_MIX, INTERRUPTION_MODE_IOS_DUCK_OTHERS } from 'expo-av/build/Audio'


export const initAudio = ( onDone : (sound : any) => void ) => {

    const soundObject = new Audio.Sound();
    Audio.setIsEnabledAsync(true).then( async res => {
        await Audio.setAudioModeAsync({
            staysActiveInBackground : true,
            playsInSilentModeIOS : true,
            interruptionModeAndroid : INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            interruptionModeIOS: INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        })

        await soundObject.loadAsync(require('../assets/audio/notif_tone.mp3'));
        // const { sound: soundObject, status } = await Audio.Sound.createAsync(
        //   require('../assets/audio/notif_tone.mp3'),
        //   { shouldPlay: false, volume : 1, }
        // )
        onDone(soundObject)
        
    }).catch((err)=>{

    })
}

export const notify = async () => {
    try {
       
        console.log("playing ")
        soundObject.playAsync()
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
}