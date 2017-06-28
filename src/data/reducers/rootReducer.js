import {combineReducers} from 'redux';
import {routerReducer} from './routerReducer';
import {giftsReducer} from './giftsReducer';
import {filterReducer} from './filterReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  giftsList: giftsReducer,
  filters: filterReducer,
});

export default rootReducer;
