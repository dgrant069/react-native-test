import React, { PropTypes } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Platform, ListView, Keyboard, AsyncStorage, Button } from "react-native";
import { connect } from 'react-redux'

import css from './HomeScreen.css';

import { deleteGift, editGift } from '../data/actions/gifts';

class GiftScreen extends React.Component {
  state = {
    isEditing: false,
    preEditGift: {},
    giftEdit: {},
  }
  //TODO this is dispatching a navigation action, need to mapStateToProps
//   static navigationOptions = ({ navigation, screenProps }) => {
//     const navState = navigation.state;
//     const { setParams, dispatch } = navigation;
//     const isEditing = navState.params.editState === 'EDITING';
//     console.log("screenProps", screenProps);
// // handleUpdates = (oldGift, update = {}) => {
//     //   console.log("getting called");
//     //   const updatedGift = {...oldGift, ...update}
//     //   this.setState({preEditGift: updatedGift});
//     //   return this.props.dispatch(editGift(this.props.giftsList, updatedGift));
//     // }
//     const handleButtonPress = () => {
//       setParams({editState: isEditing ? 'DONE' : 'EDITING'});
//       console.log("navState.params.editState", navState.params.editState);
//       if(navState.params.editState === 'DONE') return dispatch({type: 'UPDATED_GIFT_MODE'});
//     }
//
//     return {
//       headerRight: (
//         <Button
//           title={isEditing ? 'Done' : 'Edit Gift'}
//           onPress={() => handleButtonPress()}/>
//       ),
//     };
//   };

  componentWillMount() {
    const giftObj = this.getGiftObj();
    return this.setState({preEditGift: giftObj});
  }

  getGiftObj = () => {
    const filteredGiftOBj = this.props.giftsList.filter((gift) => {
      return gift.id === this.props.navigation.state.params.id;
    });

    return filteredGiftOBj[0];
  }

  handleUpdates = (oldGift = {}, update = {}) => {
    console.log("getting called");
    const updatedGift = {...oldGift, ...update}
    // this.setState({preEditGift: updatedGift});
    return this.props.dispatch(editGift(this.props.giftsList, updatedGift));
  }

  render() {
    const shouldSave = this.props.navigation.state.params.editState === 'DONE';
    const giftObj = this.getGiftObj();
    console.log("isEditing in GiftScreen", shouldSave);
    console.log("this.props.navigation", this.props.navigation);
    console.log("THIS GiftScreen %o", this);

    const editToggleButton = (
      <Button
        title={'Edit Gift'}
        onPress={() => this.handleUpdates()}/>
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
  }
};

const styles = StyleSheet.create(css);
export default connect(mapStateToProps)(GiftScreen);
