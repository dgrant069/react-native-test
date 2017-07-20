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
    originalGift: {},
    updatedGift: {},
  }

  componentWillMount() {
    const giftObj = this.getGiftObj();
    return this.setState({originalGift: giftObj});
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

    const EDITING = 'EDITING';
    const DONE = 'DONE';

    const isEditing = navState.params.isEditingGift;

    console.log("isEditing???", isEditing);

    if(isEditing) {
      //If no errors
      console.log("MEEEEEE")

      //   dispatch(fullEditGift(self.props.giftsList, self.state.updatedGift)),
      nav.dispatch(navSetParams({ isEditingGift: false }));
      this.setState({ isEditing: false });

    }

    if(!isEditing) {
      nav.dispatch(navSetParams({ isEditingGift: true }));
      this.setState({ isEditing: true });
    }
  }

  handleUpdates = (oldGift = {}, updates = {}) => {
    console.group("handleUpdates");
    console.log("oldGift", oldGift);
    console.log("updates", updates);
    console.log("this.props.navigation", this.props.navigation);
    console.groupEnd();


    // handleUpdates = (oldGift, update = {}) => {
    //   console.log("getting called");
    //   const updatedGift = {...oldGift, ...update}
    //   this.setState({originalGift: updatedGift});
    //   return this.props.dispatch(quickEditGift(this.props.giftsList, updatedGift));
    // }

    const handleButtonPress = () => {
      if(isEditing) {
        //If no errors
        return (
          navDispatch(fullEditGift(this.props.giftsList, this.state.updatedGift)),
          navSetParams({ editState: 'DONE' })
        )
      }

      if(!isEditing) {
        return navSetParams({ editState: 'EDITING' });
      }
    }

    const setParamsAction = NavigationActions.setParams({
      editState: 'EDITING',
    });

    // return (
    //   this.props.dispatch(toggleGiftScreenEditBtn("Save")),
    //   this.props.dispatch(quickEditGift(this.props.giftsList, {}))
    // )
    // const updatedGift = {...oldGift, ...updates}
    // this.setState({originalGift: updatedGift});
    // return this.props.dispatch(quickEditGift(this.props.giftsList, updatedGift));
  }

  render() {
    const giftObj = this.getGiftObj();
    console.log("this.props.navigation.state.params.isEditingGift %o", this.props.navigation.state.params.isEditingGift);
    console.log("this.props.navigation", this.props.navigation);

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
