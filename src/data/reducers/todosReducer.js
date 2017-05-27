export const todosReducer = (state = [], action) => {
  if(action.todosList){
    return action.todosList;
  }

  return state;
}
