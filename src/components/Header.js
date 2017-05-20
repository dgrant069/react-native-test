import React, { PropTypes } from 'react';
import { View, StyleSheet, TextInput, Button } from "react-native";
import { connect } from 'react-redux';

import { addTodo } from '../data/actions/todos';

class Header extends React.Component {
  state = {
    value: ""
  }

  handleAddItem(todoName) {
    return this.props.dispatch(addTodo(this.props.todoList, todoName));
  }

  handleChange(value) {
    return this.setState({value});
  }

  render() {
    console.log("Header props", this.props);
    return (
      <View style={styles.header}>
        <TextInput
          value={this.state.value}
          onChangeText={(value) => this.handleChange(value)}
          onSubmitEditing={() => this.handleAddItem(this.state.value)}
          placeholder="What needs to be done?"
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}
        />
        <View style={styles.btnContainer}>
          <Button
            onPress={() => this.handleAddItem(this.state.value)}
            title="Add"
            style={styles.btn}/>
        </View>
      </View>
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  toggleIcon: {
    fontSize: 30,
    color: "#CCC"
  },
  input: {
    flex: 1,
    marginLeft: 16,
    height: 50
  },
  btnContainer: {
    borderWidth: 5,
    borderColor: '#e20d0d',
    borderStyle: 'solid',
    backgroundColor: '#e20d0d',
    borderRadius: 5
  },
  btn: {
    padding: 8,
    width: 80,
  }
})

export default connect()(Header);
