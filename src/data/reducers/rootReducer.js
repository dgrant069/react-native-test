import {combineReducers} from 'redux';
import {routerReducer} from './routerReducer';
import {giftsReducer} from './giftsReducer';
import {filterReducer} from './filterReducer';
import {uiReducer} from './uiReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  giftsList: giftsReducer,
  filters: filterReducer,
  uiState: uiReducer,
});

export default rootReducer;
