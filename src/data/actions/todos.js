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

const addTodoSuccess = (todoObj) => {
  return {type: actions.ADD_TODO_SUCCESS, todoObj}
}

const editTodoSuccess = (todoKey, todoName) => {
  return {type: actions.EDIT_TODO_SUCCESS, todoKey, todoName}
}

const removeTodoSuccess = (todoKey) => {
  return {type: actions.REMOVE_TODO_SUCCESS, todoKey}
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
    key: id,
    name: newTodo,
    completed: false
  };

  const newTodosList = () => {
    return [
      ...prevTodosList,
      todoObj
    ];
  };

  return setStorage('todosList', newTodosList(), addTodoSuccess(todoObj));
}

export const editTodo = (prevTodosList, todoKey, name) => {
  const newTodosList = prevTodosList.map((todo) => {
    if (todo.key !== todoKey) return todo;

    return {
      ...todo,
      name
    }
  })

  return setStorage('todosList', newTodosList, editTodoSuccess(todoKey, name));
}

export const deleteTodo = (prevTodosList, todoKey) => {
  const newTodosList = prevTodosList.filter((item) => {
    return item.key !== todoKey
  })

  return setStorage('todosList', newTodosList, removeTodoSuccess(todoKey));
}

export const completeTodo = (id) => (
  type: actions.MARK_TODO_COMPLETE,
  key: id
)

export const incompleteTodo = (id) => (
  type: actions.MARK_TODO_INCOMPLETE,
  key: id
)

const setStorage = (name, list, successFunc) => (dispatch) => {
  return saveToStorage(name, list).then(() => {
    dispatch(successFunc);
  }).catch(e => {
    dispatch(throwError(e));
  });
}
