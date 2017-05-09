import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';

const nativeTest = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});

export default nativeTest;