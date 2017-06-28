import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen from '../views/HomeScreen';
import GiftScreen from '../views/GiftScreen';

export const AppNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    path: '/',
    navigationOptions: {
      headerTitle: 'Dashboard',
    }
  },
  Gift: {
    screen: GiftScreen,
    path: 'gift/:id',
    navigationOptions: {
      headerTitle: 'Gift',
    }
  },
});
