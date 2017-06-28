import React, { PropTypes } from 'react';
import { View, StyleSheet, TextInput, Button } from "react-native";
import { connect } from 'react-redux';

import { addGift } from '../../data/actions/gifts';

import css from './Header.css';

class Header extends React.Component {
  state = {
    value: ""
  }

  handleAddItem(giftName) {
    this.setState({
      value: ""
    })

    return this.props.dispatch(addGift(this.props.giftsList, giftName));
  }

  handleChange(value) {
    return this.setState({value});
  }

  render() {
    return (
      <View style={styles.header}>
        <TextInput
          value={this.state.value}
          onChangeText={(value) => this.handleChange(value)}
          onSubmitEditing={() => this.handleAddItem(this.state.value)}
          placeholder="What needs to be done?"
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}
        />
        <View>
          <Button
            onPress={() => this.handleAddItem(this.state.value)}
            title="Add"
            style={styles.btn}/>
        </View>
      </View>
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  giftsList: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    giftsList: state.giftsList
  }
};

const styles = StyleSheet.create(css);
export default connect(mapStateToProps)(Header);
