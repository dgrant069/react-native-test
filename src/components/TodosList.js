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

  filteredTodosList = () => {
    if(this.props.filterType === "ALL") return this.props.todosList;
    const isCompleted = () => {
      if(this.props.filterType === "ACTIVE") return false;
      return true;
    }

    const filteredList = this.props.todosList.filter((todo) => {
      return todo.completed === isCompleted();
    });

    return filteredList;
  }

  render(){
    return (
      <View style={styles.content}>
        <ListView
          style={styles.list}
          enableEmptySections
          dataSource={ds.cloneWithRows(this.filteredTodosList())}
          onScroll={() => Keyboard.dismiss()}
          renderRow={(todo) => {
            return (
              <Row
                todoId={todo.id}
                onUpdateSave={(name) => this.handleUpdates(todo, {name})}
                onComplete={(completed) => this.handleUpdates(todo, {completed})}
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

TodosList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  todosList: PropTypes.array.isRequired,
  filterType: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    todosList: state.todosList,
    filterType: state.filters.filterType,
  }
};

const styles = StyleSheet.create(css);
export default connect(mapStateToProps)(TodosList);
