import { StackNavigator } from 'react-navigation';

import HomeScreen from '../HomeScreen';
import ChatScreen from '../ChatScreen';

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});
