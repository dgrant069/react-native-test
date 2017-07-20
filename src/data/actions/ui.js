import * as actions from './constants';

export const toggleGiftScreenEditBtn = (text) => {

  return {type: actions.TOGGLE_EDIT_BTN_TEXT, text}
}
