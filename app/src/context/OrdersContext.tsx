import { createContext, useState, Component, useEffect, useReducer, useRef } from "react";
import  * as firebase from "firebase"
import React from "react";
import _ from "lodash";
export const OrderContext = createContext({});
import * as api from "../api/index";
import * as rootReducer from "@utils/rootReducer";
import moment from "moment";
import * as Notifications from 'expo-notifications';
import { IOrder } from "src/types";

export const OrdersContextConsumer = OrderContext.Consumer
export type IContextProps = {
    context : any
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
})
  
require('firebase/firestore')

const initalState = {
    data: [],
    search: "",
    inProgress: true,
  };

const OrderContextProvider : React.SFC = ({children}) => {
        const [order, setOrder] = useState({})
        const [orders, setOrders] = useReducer(rootReducer.setStateReducer, initalState)
        const [orderNumber, setOrderNumber] = useState('')

        const generateOrderId = (userId : string) =>  randomNum() + userId

        const reloadData = () =>{
            api.getCollection("orders", setOrders)
        }

        useEffect(() => {
            reloadData()   
        }, [])
 
        const updateOrderStatus = (orderId : string, updatedOrder : IOrder) => {
            firebase.database()
            .ref(`/orders/`).child(orderId)
            .update({...updatedOrder})
            .then((snapshot: any) => { setOrder(snapshot.val()) }).catch((err: any)=>{ });
        }
      
        const sendRequest = async (id : string , theOrder: IOrder, onSuccess : () => void ,onFailure : () => void ) => {
            const orderID = (id)
            setOrder(theOrder)
            setOrderNumber(orderID)
            firebase.database()
                .ref(`orders/`).child(orderID)
                .set({...theOrder,createdAt : moment(new Date()).toString()})
                .then(() => {onSuccess()}).catch((err: any)=>{ onFailure()});
        }

        return (
            <OrderContext.Provider
                value={{ 
                    updateOrderStatus, sendRequest, reloadData, 
                    setOrderNumber,isDev : true,order,setOrder,generateOrderId,
                    orders, setOrders, 
                }}
            >
                {children}
            </OrderContext.Provider>
        )

  };

export default OrderContextProvider


export const withOrdersContext = (Component : React.FC) => {

    const Wrapper : React.FC = (props) => (
        <OrdersContextConsumer>
            {(context: any) =>(
                <Component {...props} context={context} />
            )}
        </OrdersContextConsumer>
    )

    return Wrapper
}

const randomNum = () =>  Math.floor(Math.random() * Math.floor(100));
export const mockOrder =  {
    "customer" : {
      "email" : "menc9@coo9.com",
      "displayName" : "Baldridge",
      "lastname" : "TEst Last",
      "profilePicURL" : ""
    },
    "driver" : {
        "displayName" : "Robiii",
        "expoToken" : "ExponentPushToken[vzKJbwE1inzvm5qSwtsTa7]",
        "id" : "+27849128210",
        "isActive" : true,
        "isDriver" : true,
        "isVacant" : true,
        "isOnline" : true,
        "phoneNumber" : "+27849128210",
        "status" : "vacant",
        "profilePicURL" : "https://firebasestorage.googleapis.com/v0/b/mrodelivery-dev.appspot.com/o/Development%2Fimages%2F%2B27849128210?alt=media&token=b503ce86-2d6a-43a8-a39d-05f4a42e4e35",
        "profilePicUrl" : "https://firebasestorage.googleapis.com/v0/b/mrodelivery-dev.appspot.com/o/Development%2Fimages%2F%2B27849128210?alt=media&token=b503ce86-2d6a-43a8-a39d-05f4a42e4e35",
        "vehicleRegistration" : "Mr-O-Test"
    },
    "dropOffAddress" : {
        "address_components" : [ {
          "long_name" : "Linh Đường",
          "short_name" : "Linh Đường",
          "types" : [ "route" ]
        }, {
          "long_name" : "Khu đô thị Linh Đàm",
          "short_name" : "Khu đô thị Linh Đàm",
          "types" : [ "neighborhood", "political" ]
        }, {
          "long_name" : "Hoàng Mai",
          "short_name" : "Hoàng Mai",
          "types" : [ "administrative_area_level_2", "political" ]
        }, {
          "long_name" : "Hà Nội",
          "short_name" : "Hà Nội",
          "types" : [ "administrative_area_level_1", "political" ]
        }, {
          "long_name" : "Vietnam",
          "short_name" : "VN",
          "types" : [ "country", "political" ]
        } ],
        "adr_address" : "<span class=\"street-address\">Linh Đường</span>, <span class=\"extended-address\">Hoàng Liệt</span>, <span class=\"locality\">Hoàng Mai</span>, <span class=\"region\">Hà Nội</span>, <span class=\"country-name\">Vietnam</span>",
        "description" : "HH2B Linh Đàm, Linh Đường, Khu đô thị Linh Đàm, Hoang Liet, Hoàng Mai, Hanoi, Vietnam",
        "formatted_address" : "Linh Đường, Hoàng Liệt, Hoàng Mai, Hà Nội, Vietnam",
        "geometry" : {
          "location" : {
            "lat" : 20.9649462,
            "lng" : 105.8276805
          },
          "viewport" : {
            "northeast" : {
              "lat" : 20.96636383029151,
              "lng" : 105.8290176802915
            },
            "southwest" : {
              "lat" : 20.9636658697085,
              "lng" : 105.8263197197085
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
        "matched_substrings" : [ {
          "length" : 2,
          "offset" : 0
        } ],
        "name" : "HH2B Linh Đàm",
        "photos" : [ {
          "height" : 1836,
          "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/116955112487131302563\">Trần Hải</a>" ],
          "photo_reference" : "CmRaAAAAU5FDNis0DZEQXYnWCswHMrOowR5RNPP2eGcozyWG8X9kJonuzokX4AI3NGyfyV48zTvkyqCifiKfCa37GdWJhMiJ9YYHUKAYN-pq_NCrC1p_RUzf13LyBLiTmsSfHFvYEhAMqCQKz_TjUd13UaDSnpmSGhRv3lz141u4xA-vF45MeQp4YR5ojg",
          "width" : 3264
        }, {
          "height" : 1836,
          "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/114441020430977816142\">Tuan-Anh Nguyen</a>" ],
          "photo_reference" : "CmRaAAAAivXsYe8C9l3wnBa_vymqfggdNX9NrxasShlYAaKWEfYtywr99Yu4awDMHHGB-sBBV9lixaIBHj-UMveiED7NkeklkQDS2ZxnvuGcugySH8oFd2cslFiNGxNjPoaKwtNqEhAvwQneIWqJyvVuL9kZoGzUGhS-lInigb_WP1MaYd3ZbRj1o6Og2g",
          "width" : 3264
        }, {
          "height" : 3264,
          "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/116955112487131302563\">Trần Hải</a>" ],
          "photo_reference" : "CmRaAAAAXsOSSDMHGXApn1xupoyQFbz-RIxd6ZcjvlNQRvBlovIlJcKfAC1wepT4uJusrxCXCGqJQa6wWc8Mr5vJZkjS-8_WQhz8NnxVSnN-pMxkxvqL86Wb-33_L9eg31UaalkREhBEjR0whFgo2vZKiSgqiWi_GhS5Hje_rI2_5NK4RTqHP9o7w1-vsw",
          "width" : 1836
        }, {
          "height" : 1280,
          "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/107612933893557684229\">Nhà đất Huệ Anh 0914938245</a>" ],
          "photo_reference" : "CmRaAAAA9DawDCe27l5fUSdv6HdRTdBe8Tezrk01bpon-f4Zmp3NOWIrpTny5ogDDKrdv4c7-8wfRav6006IiqTFcIq3OUKN7x-c01a_9ZsJJtINCYHYJlMk0e62019hJo_aB6SWEhCbeNtHlXw7_zrVJs1btCDWGhSljnYNwOijrymJr6kZXxa5EewvUQ",
          "width" : 960
        }, {
          "height" : 1280,
          "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/107612933893557684229\">Nhà đất Huệ Anh 0914938245</a>" ],
          "photo_reference" : "CmRaAAAA83OhLFlXnPHDRN7_n95-qWLtip-qjx0f_Rldid9WdCuW19rrIfR2nXT-bGmdBGjsW3elUTEKxgNkS17Qsf1EH_7yL0uFJ2GPOGQZskAcOBqm191u5R-iEArqw-qm-xlgEhAqgVv-HhMbN_zC_vdf609tGhRO_ZP7Ysr-Ci11eROMRimEoQtw4Q",
          "width" : 720
        }, {
          "height" : 720,
          "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/107612933893557684229\">Nhà đất Huệ Anh 0914938245</a>" ],
          "photo_reference" : "CmRaAAAAPoo5odGONfy8_ERUvyybnj94Vg7POsiJHkTID6vxLpTYKkOJFDRQ_C95Sra7kpdy_8oJYqriqXIemUdFvDcXKzm40qdZudnAzKGwAEk3l5JKrgWf-TT5VjGGGhEKmRY2EhB2kB8bBpAEyWBuaHaeYNNZGhTj9YNWAsEwS56GRq87KKxcTJQGsA",
          "width" : 1280
        }, {
          "height" : 1280,
          "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/107612933893557684229\">Nhà đất Huệ Anh 0914938245</a>" ],
          "photo_reference" : "CmRaAAAA0n9MR9QrnM-dYKVgzDcsdFryk30npwA9y-y-r6tcjtVU7qKRCKBsRplnebnfZgX2W-i_LuhINgjWwYclj-UPhrUEBkvGFWJxLU9cIkmk0yQwBvZ10h0kUYu9v8dVLAxSEhDbfL-kRshZyy4vGwZlwSRuGhTd0Wbcz00Dx-0J3fz809K09JR4DA",
          "width" : 720
        }, {
          "height" : 1280,
          "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/107612933893557684229\">Nhà đất Huệ Anh 0914938245</a>" ],
          "photo_reference" : "CmRaAAAAzqrZQ3Z_MxERKiNzlujs6LssS0ygltmqGXAO1UbjaFI9MugAomd-txodrxPQ8CUsEUVY6IDBO_cWDgr5k_InRNmxpxnTnQsogtnaTFagjEfCtLlDrMRsUf9zAwts0It6EhAqUCG_FmSR6W31tls6wS8cGhQBcu1eP2gfZf-RfozYo-UJvIZqzA",
          "width" : 960
        }, {
          "height" : 4160,
          "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/116090235033725252476\">Hoàng Phẩm</a>" ],
          "photo_reference" : "CmRaAAAAH5MzDfrx3C9Y6RsaScOC0gYxYHMZcfcni56-g9JX2LGhzY45Rr5RuV4BV5SM8rQ8eLlD0otN7ct0h4Gq5XkHif-w6EhtZKO1Chme6272iWqDFjk_M-6eep_M7-BlQlGVEhBOTVncwwqLic_ApPImlVzcGhQwGboNobIh5tNmPzDLysFeUggSBg",
          "width" : 3120
        }, {
          "height" : 1280,
          "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/107612933893557684229\">Nhà đất Huệ Anh 0914938245</a>" ],
          "photo_reference" : "CmRaAAAAc5b9D80fKXZuDhMrqFib57__XObt8gIXRisvbUH7hPkSrL0nPW8ldm9VyCqO73UbKUM5GRvjrkcMZwmj1Bx4oYbU4ndaCaVV2zcjec37ZxSpYtet2b-7sjPNcvOXaDTqEhDp5-B2_Qyp9OCeub8cdVGjGhQsgG1QMHUWqkcgDlXTS84m3zMxcg",
          "width" : 720
        } ],
        "place_id" : "ChIJWXa7lf-sNTERzl56tF3muzM",
        "reference" : "ChIJWXa7lf-sNTERzl56tF3muzM",
        "structured_formatting" : {
          "main_text" : "HH2B Linh Đàm",
          "main_text_matched_substrings" : [ {
            "length" : 2,
            "offset" : 0
          } ],
          "secondary_text" : "Linh Đường, Khu đô thị Linh Đàm, Hoang Liet, Hoàng Mai, Hanoi, Vietnam"
        },
        "terms" : [ {
          "offset" : 0,
          "value" : "HH2B Linh Đàm"
        }, {
          "offset" : 15,
          "value" : "Linh Đường"
        }, {
          "offset" : 27,
          "value" : "Khu đô thị Linh Đàm"
        }, {
          "offset" : 48,
          "value" : "Hoang Liet"
        }, {
          "offset" : 60,
          "value" : "Hoàng Mai"
        }, {
          "offset" : 71,
          "value" : "Hanoi"
        }, {
          "offset" : 78,
          "value" : "Vietnam"
        } ],
        "types" : [ "premise", "establishment" ],
        "url" : "https://maps.google.com/?q=Linh+%C4%90%C6%B0%E1%BB%9Dng,+Ho%C3%A0ng+Li%E1%BB%87t,+Ho%C3%A0ng+Mai,+H%C3%A0+N%E1%BB%99i,+Vietnam&ftid=0x3135acff95bb7659:0x33bbe65db47a5ece",
        "utc_offset" : 420
    },
    "items" : [ 
        {
        "description" : "We’re",
        "name" : "Something here"
        },
        {
            "description" : "We’re",
            "name" : "Something here"
        },
    ],
    "orderId" : "testID681",
    "orderType" : "Shopping",
    "pickUpAddress" : {
        "address_components" : [ {
        "long_name" : "Yucaipa",
        "short_name" : "Yucaipa",
        "types" : [ "locality", "political" ]
        }, {
        "long_name" : "San Bernardino County",
        "short_name" : "San Bernardino County",
        "types" : [ "administrative_area_level_2", "political" ]
        }, {
        "long_name" : "California",
        "short_name" : "CA",
        "types" : [ "administrative_area_level_1", "political" ]
        }, {
        "long_name" : "United States",
        "short_name" : "US",
        "types" : [ "country", "political" ]
        } ],
        "adr_address" : "<span class=\"locality\">Yucaipa</span>, <span class=\"region\">CA</span>, <span class=\"country-name\">USA</span>",
        "description" : "Yucaipa, CA, USA",
        "formatted_address" : "Yucaipa, CA, USA",
        "geometry" : {
        "location" : {
            "lat" : 34.033625,
            "lng" : -117.0430865
        },
        "viewport" : {
            "northeast" : {
            "lat" : 34.07739602268893,
            "lng" : -116.962058915029
            },
            "southwest" : {
            "lat" : 34.00391493991101,
            "lng" : -117.1267680026793
            }
        }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
        "matched_substrings" : [ {
        "length" : 2,
        "offset" : 0
        } ],
        "name" : "Yucaipa",
        "photos" : [ {
        "height" : 2988,
        "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/114429065474190117602\">Wayne S.</a>" ],
        "photo_reference" : "CmRaAAAAaFgAZDths_gdwWcyUVYLN-M1SuuN0avef2NyDw_7DvFpc9fAMt08Ui5YrTCOzy_gvG_DSEsZU8WWHyOI5QkUqhlWr6hgHNtLxb6M-Dznpi8XnZtqtjDo7v42X1T0sGoqEhB0zIwof3TFnZU7_ylGxfqrGhTx2HXwkkGjLVdLsucWaR77QwZjaA",
        "width" : 5312
        }, {
        "height" : 2988,
        "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/115533472102468198623\">Cynthia Hamlett</a>" ],
        "photo_reference" : "CmRaAAAAdgHIx2DS1kCoansmUq4ywBYFs53zJ5jhWKJHWrhgaG0IqTT9lhZ8WDkKysX32xovG_4wUWOPgXiJhmSs3F_bFwYoQLL8Z8rqwh57urj2Sm9VfjxHilvIT-NABJ9Nf1WmEhBffuyHubswwhqWVV5Nz9xRGhTlmUozh8vwdvcdgQADYRlxnHP4fA",
        "width" : 5312
        }, {
        "height" : 3024,
        "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/107895385056071706405\">Court Parker</a>" ],
        "photo_reference" : "CmRaAAAAmq7YdT5vd4Mz0D4wU1VBvCNAYT-KH65gBS4bQF2Q3B3-nj1zyKkYlMVvh-mdm0HE6_Wm5URU-a8Vh5A4L3kW63Lb-wv97ZN3bIAkCKvXJr87owjMhqjeLAPLZ77_DQQxEhAZCI90IzYrUEKUNCU8vRPVGhRYXXxA78uyQTixQ-jBRelYX2cZkw",
        "width" : 4032
        }, {
        "height" : 3096,
        "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/106911631467216457604\">Tim B.</a>" ],
        "photo_reference" : "CmRaAAAAVal8c7AjgzJBrbw5DT6uCutWgR2hSKwfE6FndMBE0kIZ8x1W-IVu3vIi1l07cs2QCNklDAM48_0Dc3jZHZwBBQxKOKDStN8-nLMeTMAgOLQy_A6gML3gnR58amR_XMg6EhDzyvCP8-NGP8qONWRN0pv6GhTvxutxl1JXAvoV54Kjc-FW2QLTnw",
        "width" : 4128
        }, {
        "height" : 2737,
        "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/114429065474190117602\">Wayne S.</a>" ],
        "photo_reference" : "CmRaAAAAUiNJ78YCgQ1-EsHbRzTITBmZC34COJNpnCL_AM077KO0JPpp6lhu5IBbqEqkwqsEB0_Qycm3_kDKKXe-_7C0HFBsy_ssdFUP_MPRKuzjuCJZq5Bi5R9w3K7LRx-UO0BjEhAR2D09PWvDptBK9ItUz9RMGhTnRzTf-n1KTxh4cxjRERFwmd2qDQ",
        "width" : 4405
        }, {
        "height" : 1619,
        "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/108192936751985241616\">A Holzhauser</a>" ],
        "photo_reference" : "CmRaAAAAzfNzewdnckcEyHYibd1MOGn18di7x2fppDfXav1PsHD70AyBlR5A8lKyA6nybg7p0L3-BEEnFzaupaf4oQtJlxebYy2zfvYGYEwjGaXOodKz1WNbgM0RJlJ7SAgZOR14EhCJlEbQojcz051FJ9VD8IR7GhSRInFTzMd9g4tjAp8CKNcncf8jNg",
        "width" : 1080
        }, {
        "height" : 3036,
        "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/103352751462407626406\">Chris Hardin</a>" ],
        "photo_reference" : "CmRaAAAAHhYeNdZB1KcEupke7YTdY4LWt7w-dD1xpYA9RhTSBkdHZO2mtXgQeeDt73Apv7jjv9w3YFlpuBdGg7AHgOSisSlLWD9PhxH-Agb0WouFwlIlRJ8Sj1T71VkQSSz0AGLREhA6qAbVf2vSNip-PIHCCaYBGhTo6IBWQrixmFwzxp0srqWOma5qXw",
        "width" : 4048
        }, {
        "height" : 2988,
        "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/102629888840871836098\">steve Dang</a>" ],
        "photo_reference" : "CmRZAAAATyIjdYd23iXTFhuNWcp6S2PePLzSFW51jyMaNWaq0gTllMiTt53_1PLbHBgClOWJVVZ_isdLXCRxAex3bGAb7Er8yGG4E2qhVudfad7qXGrBJ7rhZOImM3q9CGgys8hYEhDnsWD9hRvcC9ziGk3aMaxyGhSagApg-Vp2Nqh1EbfctZp4GyygYw",
        "width" : 5312
        }, {
        "height" : 4000,
        "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/110195029533328766710\">Von Witttz</a>" ],
        "photo_reference" : "CmRaAAAArAgLWJWa_W781bUqvhi5wyGqw5fHbvGrV6hTd2y8_yByC1xYpZbxqUrpcghHT0hm25aPfo4Ls9-bvC76-XyTj_97OelgktKjGCsOucvmqPcsOFQ5Exwa5SDGE--ZJEkQEhAYbYerO7Pul0pi5_0FB_uXGhQ5wU_LBFGgm6P2D5P3WYB3hiF-rg",
        "width" : 3000
        }, {
        "height" : 1440,
        "html_attributions" : [ "<a href=\"https://maps.google.com/maps/contrib/109017526674909555272\">Christopher Cook</a>" ],
        "photo_reference" : "CmRaAAAAgx8gF0hOIEl-Vd6K4Fx82QnZ-_HeD6y4UheKfpvse_hGDE3uNIXQWcKot-fnXDuKKLTli8FOHJN3l5P3o0jIk7wdjgTwxH92xkTLZuFcgbuhqK9Jmjsp-FC_17H6xMlvEhCj2kZ9Ripxs3drL8hHEXVRGhSLjB63XVSu_pLW6g4sn-HOoI3CWw",
        "width" : 2560
        } ],
        "place_id" : "ChIJP7oo1BxR24AR_qisu9QeKXo",
        "reference" : "ChIJP7oo1BxR24AR_qisu9QeKXo",
        "structured_formatting" : {
        "main_text" : "Yucaipa",
        "main_text_matched_substrings" : [ {
            "length" : 2,
            "offset" : 0
        } ],
        "secondary_text" : "CA, USA"
        },
        "terms" : [ {
        "offset" : 0,
        "value" : "Yucaipa"
        }, {
        "offset" : 9,
        "value" : "CA"
        }, {
        "offset" : 13,
        "value" : "USA"
        } ],
        "types" : [ "locality", "political" ],
        "url" : "https://maps.google.com/?q=Yucaipa,+CA,+USA&ftid=0x80db511cd428ba3f:0x7a291ed4bbaca8fe",
        "utc_offset" : -420,
        "vicinity" : "Yucaipa"
    },
    storeName : "Shoprite",
    storeInstructions : "bla bla bla",
    "status" : "pending",
    "paymentMethod" : "cash",
    "distance" : "22",
    "total" : 1250
  }

