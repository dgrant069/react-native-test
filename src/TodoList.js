import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, ListView } from 'react-native';

class TodoList extends React.Component {
  buildDS = () => {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(['row 1', 'row 2']);
  }

  state = {
    dataSource: this.buildDS(),
  }

  render() {
    <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <Text>{rowData}</Text>}/>
  }
}

export default TodoList;
