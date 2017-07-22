import React, { PropTypes } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Platform, ListView, Keyboard, AsyncStorage, Button } from "react-native";
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import css from './HomeScreen.css';

import { fullEditGift } from '../data/actions/gifts';
import { toggleGiftScreenEditBtn } from '../data/actions/ui';

class GiftScreen extends React.Component {
  state = {
    isEditing: false,
    origGift: {},
    finalGift: {},
  }

  componentWillMount() {
    const giftObj = this.getGiftObj();
    return this.setState({origGift: giftObj});
  }

  getGiftObj = () => {
    const filteredGiftOBj = this.props.giftsList.filter((gift) => {
      return gift.id === this.props.navigation.state.params.id;
    });

    return filteredGiftOBj[0];
  }

  handleEditGiftButtonPress = () => {
    const nav = this.props.navigation;
    const navState = nav.state;
    const navSetParams = nav.setParams;
    const isEditing = navState.params.isEditingGift;

    if(isEditing) {
      //If no errors

      navSetParams({ isEditingGift: false });
      this.setState({ isEditing: false });
      return this.handleUpdates();
    }

    if(!isEditing) {
      navSetParams({ isEditingGift: true });
      this.setState({ isEditing: true });
      return;
    }
  }

  handleUpdates = (oldGift = {}, updates = {}) => {
    console.group("handleUpdates");
    console.log("oldGift", oldGift);
    console.log("updates", updates);
    console.log("this.props.navigation", this.props.navigation);
    console.groupEnd();

    return this.props.dispatch(fullEditGift(this.state.origGift, this.state.finalGift))
  }

  render() {
    const giftObj = this.getGiftObj();
    console.log("giftObj", giftObj)

    const editToggleButton = (
      <Button
        title={this.props.navigation.state.params.isEditingGift ? 'Save' : 'Edit Gift'}
        onPress={() => this.handleEditGiftButtonPress()}/>
    )

    this.props.navigationOptions.headerRight = editToggleButton;

    return (
      <View style={styles.container}>
        <Text>{giftObj.name}</Text>
        <Text>{giftObj.description}</Text>
        <Text>{giftObj.costMetric}</Text>
        <Text>{giftObj.enjoyMetric}</Text>
        <Text>{giftObj.frequencyMetric}</Text>
      </View>
    );
  }
}

GiftScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  routing: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    giftsList: state.giftsList,
    routing: state.routing,
    uiState: state.uiState,
  }
};

const styles = StyleSheet.create(css);
export default connect(mapStateToProps)(GiftScreen);
