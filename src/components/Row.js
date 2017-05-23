import React, { PropTypes } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from "react-native";
import { connect } from 'react-redux';

import css from './Row.css';

import { deleteTodo } from '../data/actions/todos';

// const Row = () => {
class Row extends React.Component {
  state = {
    name: "",
    editing: false
  }

  componentWillMount() {
    return this.setState({name: this.props.name})
  }

  handleChange(name) {
    return this.setState({name});
  }

  isEditing = (bool) => {
    return this.setState({
      editing: bool
    })
  }

  saveUpdatedName = () => {
    this.props.onUpdateSave(this.state.name);
    this.isEditing(false);
  }

  render() {
    const { complete } = this.props;

    const textComponent = (
      <TouchableOpacity style={styles.textWrap} onLongPress={() => this.isEditing(true)}>
        <Text style={[styles.name, complete && styles.complete]}>{this.props.name}</Text>
      </TouchableOpacity>
    )

    const removeButton = (
      <TouchableOpacity onPress={this.props.removeTodo}>
        <Text style={styles.destroy}>X</Text>
      </TouchableOpacity>
    )

    const editingComponent = (
      <View style={styles.textWrap}>
        <TextInput
          onChangeText={(name) => this.handleChange(name)}
          autoFocus
          value={this.state.name}
          style={styles.input}
          multiline
        />
      </View>
    )

    const doneButton = (
      <TouchableOpacity style={styles.done} onPress={() => this.saveUpdatedName()}>
        <Text style={styles.doneText}>Save</Text>
      </TouchableOpacity>
    )

    return (
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={this.props.onComplete}
        />
        {this.state.editing ? editingComponent : textComponent}
        {this.state.editing ? doneButton : removeButton}
      </View>
    );
  }
}

const styles = StyleSheet.create(css);
export default Row;
