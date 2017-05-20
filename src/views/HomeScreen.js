import React, { PropTypes } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Platform, ListView, Keyboard, AsyncStorage, Button } from "react-native";
import { connect } from 'react-redux'

import Header from "../components/Header";
import Footer from "../components/Footer";
import Row from "../components/Row";
import TodoList from "../components/TodoList";

import css from './HomeScreen.css';

import { fetchTodos } from '../data/actions/todos';

const filterItems = (filter, items) => {
  return items.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "COMPLETED") return item.complete;
    if (filter === "ACTIVE") return !item.complete;
  })
}

class HomeScreen extends React.Component {
  buildDS = () => {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.props.todoList);
  }

  updateDS = () => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.todoList),
    })
  }

  state = {
    loading: true,
    allComplete: false,
    filter: "ALL",
    value: "",
    items: [],
    dataSource: this.buildDS()
  }

  componentWillMount() {
    const addThis = [
      {
        key: "akjsdflasjg",
        name: "Fart",
        completed: false
      },
      {
        key: "lkjgoijoa",
        name: "Poop",
        completed: false
      }
    ]

    AsyncStorage.setItem("todoList", JSON.stringify(addThis));

    this.props.dispatch(fetchTodos());
    this.setState({
      loading: false
    })
    // this.updateDS();
  }

  // componentWillReceiveProps(nextProps) {
  //   this.updateDS();
  //   console.log("nextProps", nextProps);
  // }

  handleUpdateText(key, text) {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        text
      }
    })
    // this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleEditing(key, editing) {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        editing
      }
    })
    // this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  // setSource(items, itemsDatasource, otherState = {}) {
  //   this.setState({
  //     items,
  //     dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
  //     ...otherState
  //   })
  //   AsyncStorage.setItem("items", JSON.stringify(items));
  // }

  handleClearComplete() {
    const newItems = filterItems("ACTIVE", this.state.items);
    // this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleFilter(filter) {
    // this.setSource(this.state.items, filterItems(filter, this.state.items), { filter })
  }

  handleRemoveItem(key) {
    const newItems = this.state.items.filter((item) => {
      return item.key !== key
    })
    // this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        complete
      }
    })
    // this.setSource(newItems, filterItems(this.state.filter, newItems));
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
    // this.setSource(newItems, filterItems(this.state.filter, newItems), { value: "" })
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log("this.props in homescreen", this.props);
    return (
      <View style={styles.container}>
        <Header
          todoList={this.props.todoList}/>
        <Button
          onPress={() => navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
          style={styles.btn}
        />
        <TodoList
          todoList={this.props.todoList}
          dataSource={this.props.dataSource}/>
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({ key, ...value}) => {
              return (
                <Row
                  key={key}
                  onUpdate={(text) => this.handleUpdateText(key, text)}
                  onToggleEdit={(editing) => this.handleToggleEditing(key, editing)}
                  onRemove={() => this.handleRemoveItem(key)}
                  onComplete={(complete) => this.handleToggleComplete(key, complete)}
                  {...value}
                />
              )
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.separator}/>
            }}
          />
        </View>
        <Footer
          count={filterItems("ACTIVE", this.state.items).length}
          onFilter={this.handleFilter}
          filter={this.state.filter}
          onClearComplete={this.handleClearComplete}
        />
        {this.state.loading && <View style={styles.loading}>
          <ActivityIndicator
            animating
            size="large"
          />
        </View>}
      </View>
    );
  }
}

HomeScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  todoList: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    todoList: state.todoList
  }
};

const styles = StyleSheet.create(css);

// export default connect(mapStateToProps)(HomeScreen)

export default connect(mapStateToProps)(HomeScreen);
