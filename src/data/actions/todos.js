import * as actions from './constants';
import uuid from 'uuid/v4';

import { fetchFromStorage, saveToStorage } from '../api/localStorage';

const fetchTodosSuccess = (todosData) => {
  if(!todosData) {
    return {type: actions.FECTH_TODOLIST_SUCCESS, todoList: []};
  }

  return {type: actions.FECTH_TODOLIST_SUCCESS, todoList: todosData};
};

const addTodoSuccess = (todoObj) => {
  return {type: actions.ADD_TODO_SUCCESS, todoObj}
}

export const fetchTodos = () => (dispatch) => {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return fetchFromStorage('todoList').then(todosData => {
    try {
      const items = JSON.parse(todosData);
      dispatch(fetchTodosSuccess(items));
    } catch(e) {
      dispatch(throwError(e));
    }
  }).catch(e => {
    dispatch(throwError(e));
  });
};

export const saveTodos = (todoObj) => (dispatch) => {
// make async call to api, handle promise, dispatch action when promise is resolved
  return saveToStorage(todoObj).then(() => {
    dispatch(addTodoSuccess(todoObj));
  }).catch(e => {
    dispatch(throwError(e));
  });
};

const throwError = (error) => {
  console.error("EEEERRRRROOOOOOORRRRR", error);
}

export const addTodo = (prevTodos = [], newTodo) => (dispatch) => {
  const id = uuid().toString();
  const todoObj = {
    todo: {
      key: id,
      name: newTodo,
      completed: false
    }
  };

  const todosArray = prevTodos.map(() => {
    return [
      ...prevTodos,
      todoObj
    ];
  });

  console.log("todoObj", todoObj)
  console.log("todosArray", todosArray)
  return saveToStorage('todoList', todosArray).then(() => {
    dispatch(addTodoSuccess(todoObj));
  }).catch(e => {
    dispatch(throwError(e));
  });
}

export const completeTodo = (id) => (
  type: actions.MARK_TODO_COMPLETE,
  key: id
)

export const incompleteTodo = (id) => (
  type: actions.MARK_TODO_INCOMPLETE,
  key: id
)
