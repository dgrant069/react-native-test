export const filterReducer = (state = {filterType: "ALL"}, action) => {
  switch (action.type) {
    case 'FILTER_TODOS_CHANGE':
    console.log("action", action)
      return {
        ...state,
        filterType: action.filterType
      };
    default:
      return state;
  }
}
