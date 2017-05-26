import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'

import css from './Footer.css';

import { filterUpdate } from '../data/actions/filters';

class Footer extends Component {
  state = {
    allComplete: false,
  }

  handleClearComplete = () => {
    // const newItems = filterItems("ACTIVE", this.props.todosList);
    // return this.props.dispatch(newItems, filterItems(this.state.filter, newItems));
  }

  handleFilter = (filterType) => {
    return this.props.dispatch(filterUpdate(filterType));
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>{this.props.todosList.length} count</Text>
        </View>
        <View style={styles.filters}>
          <TouchableOpacity style={[styles.filter, this.props.filterType === "ALL" && styles.selected]} onPress={() => this.handleFilter("ALL")}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, this.props.filterType === "ACTIVE" && styles.selected]} onPress={() => this.handleFilter("ACTIVE")}>
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, this.props.filterType === "COMPLETED" && styles.selected]} onPress={() => this.handleFilter("COMPLETED")}>
            <Text>Completed</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.handleClearComplete()}>
          <Text>Clear Completed</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

/* <Footer
  todosList={this.props.todosList}
  onFilter={this.handleFilter}
  filter={this.state.filter}
  onClearComplete={this.handleClearComplete}
/> */

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  todosList: PropTypes.array.isRequired,
  filterType: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    todosList: state.todosList,
    filterType: state.filters.filterType,
  }
};

const styles = StyleSheet.create(css);
export default connect(mapStateToProps)(Footer);
