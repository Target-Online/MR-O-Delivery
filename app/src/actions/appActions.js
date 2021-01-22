
import * as types from './types'

export function addToFavourites (name) {
  return {
    type: types.ADD_FAVOURITE,
    name : name
  }
}

export function removeFromFavourites (name) {
  return {
    type: types.REMOVE_FAVOURITE,
    name : name
  }
}

export function getFavourites () {
  return {
    type: types.GET_FAVOURITES
  }
}

export function updateGeturePos (gestureX) {
  return {
    type: types.UPDATE_GESTURE,
    gestureX
  }
}

export function changeView () {
  return {
    type: types.CHANGE_VIEW
  }
}

export function GetAllComms () {
  return {
    type: types.GET_ALL
  }
}

export function FilterComms (name) {
  return {
    type: types.GET_FILTERED,
    name : name
  }
}

export function UpdateList (list) {
  return {
    type: types.UPDATE_LIST,
    newList : list
  }
}
export function UpdateFilteredList (list , range, name) {
  return {
    type: types.UPDATE_FOCUS_COMM_DATA,
    newList : list,
    range : range,
    commodityName : name
  }
}

export function RequestBrochures () {
  return {
    type: types.REQUEST_BROCHURES
  }
}

export function UpdateBrochuresList (list) {
  return {
    type: types.UPDATE_BROCHURES,
    newList : list
  }
}

export function sendRequestBrochuresList (list, userEmail) {
  return {
    type: types.SEND_BROCHURE_LIST,
    requestedBrochures : list,
    userEmail : userEmail
  }
}

export function UpdateBrochuresReqFeed (msg) {
  return {
    type: types.BROCHURE_REQ_FDB,
    brochureReqFeedback : msg
  }
}

export function ClearBrochuresReqFeed () {
  return {
    type: types.CLR_BROCHURE_REQ_FDB
  }
}

export function UpdateUserEmail (email) {
  return {
    type: types.UPDATE_EMAIL,
    userEmail : email
  }
}

export function storeMetrics (width,height) {
  return {
    type: types.REC_METRICS,
    width,
    height      
  }
}

export function StartUpAction () {
  return {
    type: types.START_UP,      
  }
}

export function errorOccured (msg) {
  return {
    type: types.ERROR_OCCURED,
    errorMsg : msg
  }
}

export function clearError () {
  return {
    type: types.CLEAR_ERR  
  }
}

export function clearGraphData () {
  return {
    type: types.CLEAR_GRAPH_DATA  
  }
}

export function loadingDataDone () {
  return {
    type: types.DATA_LOADED  
  }
}

export function showLoadingAction () {
  return {
    type: types.DATA_FETCHING  
  }
}

export function hideLoadingAction () {
  return {
    type: types.DATA_FETCHING_DISMISS  
  }
}

export function showCommodityGraph () {
  return {
    type: types.SHOW_GRAPH  
  }
}

export function hideCommodityGraph () {
  return {
    type: types.HIDE_GRAPH  
  }
}

export function UpdateDate (date) {
  return {
    type: types.UPDATE_DATE,  
    lastUpdateDate : date
  }
}

export function updateRange (range) {
  return {
    type: types.UPDATE_RANGE_CHANGE,
    graphRange : range  
  }
}












