import { AsyncStorage } from "react-native";

export const fetchFromStorage = (type) => {
  return AsyncStorage.getItem(type).then(response => {
    return response;
  }).catch(error => {
    return error;
  });
};

// This works and might be fine if no scrubbing is needed
// export const fetchFromStorage = (type) => {
//   return AsyncStorage.getItem(type);
// };


// TODO: not sure where/how to keep state with store.
// Maybe this needs to be updated to fetchFromStorage?
// However I'd prefer to give it the state as is
export const saveToStorage = (type, todos) => {
  const addThis = {
    todo: {
      key: "akjsdflasjg",
      name: "Fart",
      completed: false
    },
    todo: {
      key: "lkjgoijoa",
      name: "Poop",
      completed: false
    }
  }
  console.log("storing not working %o", todos);
  AsyncStorage.setItem(type, JSON.stringify(todos));
}
