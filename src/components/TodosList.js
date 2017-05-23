import React, { PropTypes } from 'react';
import { StyleSheet, Text, View, Button, ListView, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import Row from "./Row";

import css from './TodosList.css';

import { deleteTodo } from '../data/actions/todos';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class TodosList extends React.Component {
  removeTodo = (key) => {
    return this.props.dispatch(deleteTodo(this.props.todosList, key));
  }

  handleUpdateText = (key, text) => {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        text
      }
    })
    return this.props.dispatch(deleteTodo(this.props.todosList, key));
  }

  handleToggleEditing = (key, editing) => {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        editing
      }
    })
    return this.props.dispatch(deleteTodo(this.props.todosList, key));
  }

  handleToggleComplete = (key, complete) => {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        complete
      }
    })
    return this.props.dispatch(deleteTodo(this.props.todosList, key));
  }

  render(){
    return (
      <View style={styles.content}>
        <ListView
          style={styles.list}
          enableEmptySections
          dataSource={ds.cloneWithRows(this.props.todosList)}
          onScroll={() => Keyboard.dismiss()}
          renderRow={({ key, ...value }) => {
            return (
              <Row
                todoId={key}
                onUpdate={(text) => this.handleUpdateText(key, text)}
                onToggleEdit={(editing) => this.handleToggleEditing(key, editing)}
                onComplete={(complete) => this.handleToggleComplete(key, complete)}
                removeTodo={() => this.removeTodo(key)}
                {...value}
              />
            )
          }}
          renderSeparator={(sectionId, rowId) => {
            return <View key={rowId} style={styles.separator}/>
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create(css);
export default connect()(TodosList);