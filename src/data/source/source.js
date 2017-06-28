import { AsyncStorage } from "react-native";

export const getGiftList = () => {
  AsyncStorage.getItem("items").then((json) => {
    try {
      const items = JSON.parse(json);
      this.setSource(items, items, { loading: false });
    } catch(e) {
      this.setState({
        loading: false
      })
    }
  })
}

export const setSource = (items, itemsDatasource, otherState = {}) => {
  this.setState({
    items,
    dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
    ...otherState
  })
  AsyncStorage.setItem("items", JSON.stringify(items));
}
