import React, { PropTypes } from 'react';
import { StyleSheet, Text, View, Button, ListView, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import Row from "./Row";

import css from './TodosList.css';

import { deleteTodo, editTodo } from '../data/actions/todos';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class TodosList extends React.Component {
  removeTodo = (todo) => {
    return this.props.dispatch(deleteTodo(this.props.todosList, todo));
  }

  handleUpdates = (oldTodo, update = {}) => {
    const updatedTodo = {...oldTodo, ...update}
    return this.props.dispatch(editTodo(this.props.todosList, updatedTodo));
  }

  render(){
    console.log("the todosList %o", this.props.todosList);
    return (
      <View style={styles.content}>
        <ListView
          style={styles.list}
          enableEmptySections
          dataSource={ds.cloneWithRows(this.props.todosList)}
          onScroll={() => Keyboard.dismiss()}
          renderRow={(todo) => {
            return (
              <Row
                todoId={todo.id}
                onUpdateSave={(name) => this.handleUpdates(todo, {name})}
                onComplete={(complete) => this.handleUpdates(todo, {complete})}
                removeTodo={() => this.removeTodo(todo)}
                {...todo}
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
// renderRow={({ id, ...value }) => {
//   return (
//     <Row
//       todoId={id}
//       onUpdateSave={(name) => this.handleUpdateText(id, name)}
//       onComplete={(complete) => this.handleToggleComplete(id, complete)}
//       removeTodo={() => this.removeTodo(id)}
//       {...value}
//     />
//   )
// }}

const styles = StyleSheet.create(css);
export default connect()(TodosList);
