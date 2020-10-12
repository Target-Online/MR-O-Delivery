export const setStateReducer = (state: any, action: any) => {
  switch (action.type) {
    case "setData":
      console.log("modifying data")
     
      return {
        ...state,
        data: action.data,
      };
    case "setInProgress":
      console.log( "in progress" ,action.data)
      return {
        ...state,
        inProgress: action.inProgress,
      };
    case "setSearch":
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
};
