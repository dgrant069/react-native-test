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
    case action.REMOVE_ALL_COMPLETED:
      return state;
    default:
      return state;
  }
}
