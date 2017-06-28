import React, { PropTypes } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Platform, ListView, Keyboard, AsyncStorage, Button } from "react-native";
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import GiftsList from "../components/giftsList/GiftsList";

import css from './HomeScreen.css';

import { fetchGifts } from '../data/actions/gifts';

class HomeScreen extends React.Component {
  state = {
    loading: true,
  }

  componentWillMount() {
    this.setState({
      loading: false
    })
    return this.props.dispatch(fetchGifts());
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log("this in HomeScreen", this);
    return (
      <View style={styles.container}>
        <Header/>
        <Button
          onPress={() => navigate('Chat', { user: 'Siri' })}
          title="Chat with Siri"
          style={styles.btn}/>
        <GiftsList/>
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

HomeScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create(css);
export default connect()(HomeScreen);
