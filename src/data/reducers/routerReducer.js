import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../../configs/router';

const initialNavState = AppNavigator.router.getStateForAction('Main');

export const routerReducer = (state = initialNavState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
}
