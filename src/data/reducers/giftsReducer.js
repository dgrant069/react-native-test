export const giftsReducer = (state = [], action) => {
  if(action.giftsList){
    return action.giftsList;
  }

  if(action.type === 'UPDATED_GIFT_MODE') {
    console.log("LOOK AT ME!!!")
  }

  return state;
}
