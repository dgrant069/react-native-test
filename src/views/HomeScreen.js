import React, { PropTypes } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Platform, ListView, Keyboard, AsyncStorage, Button } from "react-native";
import { connect } from 'react-redux'

import Header from "../components/Header";
import Footer from "../components/Footer";
import Row from "../components/Row";
import TodosList from "../components/TodosList";

import css from './HomeScreen.css';

import { fetchTodos } from '../data/actions/todos';

class HomeScreen extends React.Component {
  state = {
    loading: true,
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

  // handleToggleAllComplete() {
  //   const complete = !this.state.allComplete;
  //   const newItems = this.state.items.map((item) => ({
  //     ...item,
  //     complete
  //   }))
  //   this.setSource(newItems, filterItems(this.state.filter, newItems), { allComplete: complete })
  // }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header/>
        <Button
          onPress={() => navigate('Chat', { user: 'Siri' })}
          title="Chat with Siri"
          style={styles.btn}/>
        <TodosList/>
        <Footer/>
        {
          this.state.loading &&
          <View style={styles.loading}>
            <ActivityIndicator
              animating
              size="large"/>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create(css);
export default connect()(HomeScreen);
