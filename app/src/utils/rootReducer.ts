export const setStateReducer = (state: any, action: any) => {
  switch (action.type) {
    case "setData":
 
      return {
        ...state,
        data: action.data,
      };
    case "setInProgress":
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
