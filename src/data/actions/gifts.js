import * as actions from './constants';

import { fetchFromStorage, saveToStorage } from '../api/localStorage';
import { giftConstructor } from '../helpers'

export const fetchGifts = () => (dispatch) => {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return fetchFromStorage('giftsList').then(giftsData => {
    try {
      const items = JSON.parse(giftsData);
      dispatch(fetchGiftsSuccess(items));
    } catch(e) {
      dispatch(throwError(e));
    }
  }).catch(e => {
    dispatch(throwError(e));
  });
};

const fetchGiftsSuccess = (giftsData) => {
  if(!giftsData) {
    return {type: actions.FECTH_TODOLIST_SUCCESS, giftsList: []};
  }
  return {type: actions.FECTH_TODOLIST_SUCCESS, giftsList: giftsData};
};

export const addGift = (prevGiftsList = [], newGift) => {
  const giftObj = new giftConstructor(newGift);

  const newGiftsList = () => {
    return [
      ...prevGiftsList,
      giftObj
    ];
  };

  return setStorage('giftsList', newGiftsList(), dispatchUpdateSuccess('ADD_TODO_SUCCESS', newGiftsList()));
}

// New edit function for full edit
export const fullEditGift = () => {
  const newGiftsList = prevGiftsList.map((gift) => {
    if (gift.id !== giftObj.id) return gift;
    return {
      ...giftObj
    }
  })

  return setStorage('giftsList', newGiftsList, dispatchUpdateSuccess('EDIT_TODO_SUCCESS', newGiftsList));
}

// Edit is for any changes such as completeness or naming, etc
export const quickEditGift = (prevGiftsList, giftObj) => {
  const newGiftsList = prevGiftsList.map((gift) => {
    if (gift.id !== giftObj.id) return gift;
    return {
      ...giftObj
    }
  })

  return setStorage('giftsList', newGiftsList, dispatchUpdateSuccess('EDIT_TODO_SUCCESS', newGiftsList));
}

export const deleteGift = (prevGiftsList, giftObj) => {
  const newGiftsList = prevGiftsList.filter((gift) => {
    return gift.id !== giftObj.id;
  })

  return setStorage('giftsList', newGiftsList, dispatchUpdateSuccess('REMOVE_TODO_SUCCESS', newGiftsList));
}

export const deleteAllCompleted = (prevGiftsList) => {
  const newGiftsList = prevGiftsList.filter((gift) => {
    return !gift.completed;
  })

  return setStorage('giftsList', newGiftsList, dispatchUpdateSuccess('REMOVE_ALL_COMPLETED_SUCCESS', newGiftsList));
}

// Helper functions
const setStorage = (name, list, successFunc) => (dispatch) => {
  return saveToStorage(name, list).then(() => {
    dispatch(successFunc);
  }).catch(e => {
    dispatch(throwError(e));
  });
}

const dispatchUpdateSuccess = (sucessAction, giftsList) => {
  return {type: actions[sucessAction], giftsList}
}

const throwError = (error) => {
  console.error("EEEERRRRROOOOOOORRRRR", error);
}
