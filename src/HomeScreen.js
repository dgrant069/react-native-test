import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, Platform } from 'react-native';
// import TodoList from './TodoList';

import Header from './Header';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      items: []
    }
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem() {
    if (!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    this.setState({
      items: newItems,
      value: ""
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({ value })}/>
        <View style={styles.content}>
        </View>
      </View>
    );
  }
}

    // <Text>Look at me!</Text>
    // <TextInput
    //   placeholder="What needs to be done"
    //   blurOnSubmit={false}
    //   returnKeyType="done"/>
// <Button
//   onPress={() => navigate('Chat', { user: 'Lucy' })}
//   title="Chat with Lucy"
// />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1
  }
})

export default HomeScreen;
