import React, { PropTypes } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from "react-native";
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import css from './GiftsListCard.css';

class GiftsListCard extends React.Component {
  state = {
    name: "",
    editing: false
  }

  componentWillMount() {
    return this.setState({name: this.props.name});
  }

  componentWillReceiveProps(nextProps) {
    return this.setState({name: nextProps.name});
  }

  handleChange = (name) => {
    return this.setState({name});
  }

  isEditing = (bool) => {
    return this.setState({editing: bool});
  }

  saveUpdatedName = () => {
    this.props.onUpdateSave(this.state.name);
    this.isEditing(false);
  }

  navigateAction = () => {
    return NavigationActions.navigate({
      routeName: 'Gift',
      params: {
        id: this.props.id,
        isEditingGift: false,
      },
    })
  }

  render() {
    const { completed, name } = this.props;

    const textComponent = (
      <TouchableOpacity
        style={styles.textWrap}
        onPress={() => this.props.dispatch(this.navigateAction())}
        onLongPress={() => this.isEditing(true)}>
        <Text style={[styles.name, completed && styles.completed]}>{this.state.name}</Text>
      </TouchableOpacity>
    )

    const removeButton = (
      <TouchableOpacity onPress={this.props.removeGift}>
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
          value={completed}
          onValueChange={this.props.onComplete}
        />
        {this.state.editing ? editingComponent : textComponent}
        {this.state.editing ? doneButton : removeButton}
      </View>
    );
  }
}

GiftsListCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create(css);
export default connect()(GiftsListCard)
