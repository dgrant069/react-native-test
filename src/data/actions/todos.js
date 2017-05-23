import * as actions from './constants';
import uuid from 'uuid/v4';

import { fetchFromStorage, saveToStorage } from '../api/localStorage';

const throwError = (error) => {
  console.error("EEEERRRRROOOOOOORRRRR", error);
}

const fetchTodosSuccess = (todosData) => {
  if(!todosData) {
    return {type: actions.FECTH_TODOLIST_SUCCESS, todosList: []};
  }
  return {type: actions.FECTH_TODOLIST_SUCCESS, todosList: todosData};
};

const dispatchUpdateSuccess = (sucessAction, todoObj) => {
  return {type: actions[sucessAction], todoObj}
}

export const fetchTodos = () => (dispatch) => {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return fetchFromStorage('todosList').then(todosData => {
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

export const addTodo = (prevTodosList = [], newTodo) => {
  const id = uuid().toString();
  const todoObj = {
    id,
    name: newTodo,
    completed: false
  };

  const newTodosList = () => {
    return [
      ...prevTodosList,
      todoObj
    ];
  };

  return setStorage('todosList', newTodosList(), dispatchUpdateSuccess('ADD_TODO_SUCCESS', todoObj));
}

export const editTodo = (prevTodosList, todoObj) => {
  const newTodosList = prevTodosList.map((todo) => {
    if (todo.id !== todoObj.id) return todo;
    return {
      ...todoObj
    }
  })

  return setStorage('todosList', newTodosList, dispatchUpdateSuccess('EDIT_TODO_SUCCESS', todoObj));
}

export const deleteTodo = (prevTodosList, todoObj) => {
  const newTodosList = prevTodosList.filter((item) => {
    return item.id !== todoObj.id
  })

  return setStorage('todosList', newTodosList, dispatchUpdateSuccess('REMOVE_TODO_SUCCESS', todoObj));
}

export const completeTodo = (id) => (
  type: actions.MARK_TODO_COMPLETE,
  id
)

export const incompleteTodo = (id) => (
  type: actions.MARK_TODO_INCOMPLETE,
  id
)

const setStorage = (name, list, successFunc) => (dispatch) => {
  return saveToStorage(name, list).then(() => {
    dispatch(successFunc);
  }).catch(e => {
    dispatch(throwError(e));
  });
}
