import _ from 'lodash';

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'FECTH_TODOLIST_SUCCESS':
      return [
        ...state,
        ...action.todosList
      ]
    case 'ADD_TODO_SUCCESS':
      return [
        ...state,
        action.todoObj
      ];
    case 'EDIT_TODO_SUCCESS':
      const newListStateEdit = state.map((todo) => {
        if (todo.id !== action.todoObj.id) return todo;
        return {...action.todoObj}
      })
      return newListStateEdit;
    case 'REMOVE_TODO_SUCCESS':
      const newListStateRemove = state.filter((todo) => {
        return todo.id !== action.todoObj.id
      })
      return newListStateRemove;
    case action.MARK_TODO_COMPLETE:
      var index = _.findIndex(state, (todo) => todo.id === action.id);
      if (index === -1) {
        return state;
      }
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          completed: true
        }),
        ...state.slice(index + 1)
      ];
    case action.MARK_TODO_INCOMPLETE:
      var index = _.findIndex(state, (todo) => todo.id === action.id);
      if (index === -1) {
        return state;
      }
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          completed: false
        }),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
}
