import { IAlertProps } from "components/AlertModal";

export interface IVehicle {
    registration : string ; 
    brand : string;
    model : string;
}

export interface IUser {
    vehicel : IVehicle;
    address: string;
    createdAt: any;
    displayName: string;
    id?: string;
    isActive ?: boolean;
    isDriver ?: boolean;
    isOnline ?: boolean;
    isVacant ?: boolean;
    object_key: string;
    phoneNumber: string;
    profilePicURL?: string;
    profilePicUrl?: string;
    userRating?: number;
    vehicleRegistration: string;
}

export interface IVehicle {
    registration : string; 
    brand : string;
    model : string;
}

export interface IAddressComponent { 
    name : string;
    shortName : string;
    types : any[];
}

export interface IAddress {
    address: string;
    description: string;
    addressComponents: IAddressComponent[];
    geometry : { location: {longitude: number, latitude: number}};
    name: string;
    placeID: string ;
    priceLevel: number;
    types: string[];
    viewport: {latitudeNE: number, longitudeSW: number, latitudeSW: number, longitudeNE: number};
    website: string;
}

export interface IOrder {
    orderId : string;
    storeName?: string;
    rated?:boolean;
    storeInstructions?: string;
    customer : IUser;
    status : "pending" | "confirmed" | "shopping" | "collected" | "delivered";
    driver?: IUser;
    dropOffAddress : IAddress;
    pickUpAddress : IAddress;
    orderType : "Pick-Up" | "Shopping";
    items : any[];
    orderConfirmed?:boolean;
    distance:number;
    total : number;
}

export type IContextProps = {
    context : IAppContext;
}

export type OrderStatus = "delivered" | "collected" | "confirmed" | "pending" | "shopping"

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
        ratingsVisible : boolean; 
        userInRating ?: IUser; 
        setUserInRating : (user : IUser) => void;
        setRatingsVisible : (newState : boolean) => void;
        setOrderNumber : (id : string) => void;
        updateOrderStatus : (id : string, order : IOrder) => void;
}
