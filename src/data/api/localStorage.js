import { AsyncStorage } from "react-native";

// This works and might be fine if no scrubbing is needed
// export const fetchFromStorage = (type) => {
//   return AsyncStorage.getItem(type);
// };
export const fetchFromStorage = (type) => {
  return AsyncStorage.getItem(type).then(response => {
    return response;
  }).catch(error => {
    return error;
  });
};

export const saveToStorage = (type, gifts) => {
  return AsyncStorage.setItem(type, JSON.stringify(gifts));
}
