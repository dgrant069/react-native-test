import React, { PropTypes } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Platform, ListView, Keyboard, AsyncStorage, Button } from "react-native";
import { connect } from 'react-redux'

import Header from "../components/Header";
import Footer from "../components/Footer";
import Row from "../components/Row";
import TodosList from "../components/TodosList";

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
  state = {
    loading: true,
    allComplete: false,
    filter: "ALL",
    value: "",
    items: []
  }

  componentWillMount() {
    this.setState({
      loading: false
    })
    return this.props.dispatch(fetchTodos());
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

  render() {
    const { navigate } = this.props.navigation;
    console.log("this.props in homescreen", this.props);
    return (
      <View style={styles.container}>
        <Header
          todosList={this.props.todosList}/>
        <Button
          onPress={() => navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
          style={styles.btn}
        />
        <TodosList
          todosList={this.props.todosList}
          dataSource={this.props.dataSource}/>
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
  todosList: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    todosList: state.todosList
  }
};

const styles = StyleSheet.create(css);
export default connect(mapStateToProps)(HomeScreen);
