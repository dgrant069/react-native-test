import {combineReducers} from 'redux';
import {routerReducer} from './routerReducer';
import {todosReducer} from './todosReducer';
import {filterReducer} from './filterReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  todosList: todosReducer,
  filters: filterReducer,
});

export default rootReducer;
