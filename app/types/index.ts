import { IAlertProps } from "components/AlertModal";

export interface IVehicle {
    registration : string ; 
    brand : string;
    model : string;
  }

export interface IUser {
    vehicel : IVehicle;
    status : "busy" | "vacant" | "offline"
    address: string;
    createdAt: any;
    displayName: string;
    id: string;
    isActive ?: boolean ;
    isDriver ?: boolean;
    object_key: string;
    phoneNumber: string;
    profilePicURL: string;
    profilePicUrl: string;
    vehicleRegistration: string;
}
export interface IVehicle {
    registration : string ; 
    brand : string;
    model : string;
  }
  
export interface IAddressComponent { 
    name : string;
    shortName : string;
    types : any[]
}

export interface IAddress {
    address: string;
    description: string;
    addressComponents: IAddressComponent[]
    location: {longitude: number, latitude: number}
    name: string;
    placeID: string ;
    priceLevel: number;
    types: string[]
    viewport: {latitudeNE: number, longitudeSW: number, latitudeSW: number, longitudeNE: number}
    website: string
}

export interface IOrder {
    orderId : string;
    customer : IUser;
    status : "pending" | "confirmed" | "collected" | "delivered"
    driver?: IUser;
    dropOffAddress : IAddress ;
    pickUpAddress : IAddress;
    orderType : "Pick-Up" | "Shopping";
    items : any[];
    total : number;
}

export type IContextProps = {
    context : IAppContext
}

export interface IAppContext{
        user : any ;
        drivers : IUser[];
        profile: IUser;
        generateOrderId : (uid: string) => string;
        showAlert:  boolean;
        order: IOrder;
        currentUser:IUser;
        isUserDriver : (phoneNumber : string) => boolean ;
        setOrder : (order : IOrder) => void;
        setShowAlert : (newState : boolean) => void ;
        setProfile : (profile : IUser) => void ;
        alertBoxData : IAlertProps ;
        setAlertData : (data : IAlertProps) => void ;
        sendRequest : (id : string ,order: IOrder, onSuccess : () => void ,onFailure : () => void ) => void ;      
        setUser: (user : any) => void ;
        login: (values: { email: string; password: string, firstname : string }) => void ;
        register: (values: { email: string; password: string, firstname : string } ) => void;
        logout: () => void;
        getAllDrivers: () => void;
        resetPassword : (email : string) => void;
        orderNumber : string; 
        setOrderNumber : (id : string) => void;
}

