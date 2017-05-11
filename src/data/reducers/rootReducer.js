import {combineReducers} from 'redux';
import {routerReducer} from './routerReducer';

const rootReducer = combineReducers({
  routing: routerReducer
});

export default rootReducer;
