import React, { PropTypes } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from "react-native";
import { connect } from 'react-redux';

import css from './Row.css';

import { deleteTodo } from '../data/actions/todos';

// const Row = () => {
class Row extends React.Component {
  render() {
    const { complete } = this.props;
    console.log("row this.props %o", this);
    const textComponent = (
      <TouchableOpacity style={styles.textWrap} onLongPress={() => this.props.onToggleEdit(true)}>
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
          onChangeText={this.props.onUpdate}
          autoFocus
          value={this.props.name}
          style={styles.input}
          multiline
        />
      </View>
    )

    const doneButton = (
      <TouchableOpacity style={styles.done} onPress={() => this.props.onToggleEdit(false)}>
        <Text style={styles.doneText}>Save</Text>
      </TouchableOpacity>
    )

    return (
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={this.props.onComplete}
        />
        {this.props.editing ? editingComponent : textComponent}
        {this.props.editing ? doneButton : removeButton}
      </View>
    );
  }
}

const styles = StyleSheet.create(css);
export default Row;
