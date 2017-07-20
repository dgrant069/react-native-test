const initialUiState = {
  giftScreenEditBtn: "Edit Gift",
}

export const uiReducer = (state = initialUiState, action) => {
  if(action.text) {
    return {
      ...state,
      giftScreenEditBtn: action.text,
    }
  }

  return state;
}
