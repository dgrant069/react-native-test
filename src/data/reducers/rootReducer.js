import {combineReducers} from 'redux';
import {routerReducer} from './routerReducer';
import {todosReducer} from './todosReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  todoList: todosReducer
});

export default rootReducer;
