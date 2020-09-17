export interface IVehicle {
    registration : string ; 
    brand : string;
    model : string;
  }

export interface IDriver {
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
    orderId : "Pick-Up" | "Shopping";
    customer : any;
    status : "Pending" | "Confirmed" | "Collected" | "Delivered"
    driver?: IDriver;
    dropOffAddress : IAddress ;
    pickUpAddress : IAddress;
    orderType : any;
    items : any[];
    total : number;
}

export type IContextProps = {
    context : IAppContext
}

export interface IAppContext{
        user : any ;
        drivers : IDriver[];
        profile: IUser;
        generateOrderId : (uid: string) => string;
        showAlert:  boolean;
        order: IOrder;
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
}

export type IUser = {
    email?: string;
    phoneNumber?: number;
    firstname?: string;
    lastname?: string;
    profilePicURL?: string;
}