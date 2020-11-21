import { toastInfo } from '../../utils/notifications';

export default function toastMessages(request, targetLocation){
    if(request.isPickUp && targetLocation.formatted_address){
        request.currentStep == 1 
        ? toastInfo(`PickUp point: ${targetLocation.formatted_address}`)
        : toastInfo(`Delivery point: ${targetLocation.formatted_address}`)
    }
    else if(request.isShopping){
        switch(request.currentStep) {
            case 0:
                toastInfo(`Shopping center: ${targetLocation.formatted_address}`)
                break;
            case 1:
                toastInfo(`Confirm shopping list prices.`)
                break;
            case 2:
                toastInfo(`Awaiting payment...`)
                break;
            case 3:
                request.isCardPayment 
                    ? toastInfo('Payment complete, continue shopping.')
                    : toastInfo('Cash on delivery, continue shopping.')
                break;
            case 4:
                toastInfo(`Delivery at: ${targetLocation.formatted_address}`)
                break;
            default:
                break;
          }
    }
}