import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'

import css from './Footer.css';

import { filterUpdate } from '../../data/actions/filters';
import { deleteAllCompleted } from '../../data/actions/gifts';

class Footer extends Component {
  state = {
    allComplete: false,
  }

  handleClearComplete = () => {
    return this.props.dispatch(deleteAllCompleted(this.props.giftsList));
  }

  handleFilter = (filterType) => {
    return this.props.dispatch(filterUpdate(filterType));
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>{this.props.giftsList.length} count</Text>
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
  giftsList={this.props.giftsList}
  onFilter={this.handleFilter}
  filter={this.state.filter}
  onClearComplete={this.handleClearComplete}
/> */

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  giftsList: PropTypes.array.isRequired,
  filterType: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    giftsList: state.giftsList,
    filterType: state.filters.filterType,
  }
};

const styles = StyleSheet.create(css);
export default connect(mapStateToProps)(Footer);
