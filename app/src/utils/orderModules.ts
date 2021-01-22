import { getDistance, getPreciseDistance } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types'

export const getTotalDistance = (pickUp: GeolibInputCoordinates, dropOff: GeolibInputCoordinates) =>{
        var dis = getPreciseDistance(pickUp,dropOff)+ 300 //distance off by 200 metres
        return (dis)/1000
}


export const showNoDriversAlert = (context: { setAlertData: any; setShowAlert: any; }) => {
    const {setAlertData , setShowAlert}  = context
    setAlertData({
        text: "Looks like all our drivers are busy at the moment",
        buttons : [  {label : "Try Again",onPress : () => { }} , {label : "Cancel",onPress : ()=>{}} ],
        title : "Oops",})
    setShowAlert(true)
}

export const getOrderTotal = (distance : number) => {
    const orderTotal = 500 + distance * 200
    return Math.round(orderTotal)
}