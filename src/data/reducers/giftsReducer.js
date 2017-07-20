export const giftsReducer = (state = [], action) => {
  console.log("giftsReducer action", action);
  //return the list of gifts
  if(action.giftsList) {
    return action.giftsList;
  }

  if(action.type === 'UPDATED_GIFT_MODE') {
    console.log("LOOK AT ME!!!")
  }

  return state;
}
