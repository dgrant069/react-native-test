import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen from '../views/HomeScreen';
import ChatScreen from '../views/ChatScreen';

export const AppNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    path: '/',
    navigationOptions: {
      headerTitle: 'Dashboard',
    }
  },
  Chat: { screen: ChatScreen },
});
