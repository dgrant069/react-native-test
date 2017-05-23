import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import css from './Footer.css';

class Footer extends Component {
  render() {
    const { filter } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text>{this.props.count} count</Text>
        </View>
        <View style={styles.filters}>
          <TouchableOpacity style={[styles.filter, filter === "ALL" && styles.selected]} onPress={() => this.props.onFilter("ALL")}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter === "ACTIVE" && styles.selected]} onPress={() => this.props.onFilter("ACTIVE")}>
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter === "COMPLETED" && styles.selected]} onPress={() => this.props.onFilter("COMPLETED")}>
            <Text>Completed</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.props.onClearComplete}>
          <Text>Clear Completed</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
// handleToggleAllComplete() {
//   const complete = !this.state.allComplete;
//   const newItems = this.state.items.map((item) => ({
//     ...item,
//     complete
//   }))
//   this.setSource(newItems, filterItems(this.state.filter, newItems), { allComplete: complete })
// }

const styles = StyleSheet.create(css);
export default Footer;
