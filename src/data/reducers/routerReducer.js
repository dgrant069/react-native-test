import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../../configs/router';
// import { AppNavigator } from '../../router';

const initialNavState = AppNavigator.router.getStateForAction('Main');

export const routerReducer = (state = initialNavState, action) => {
  console.log("AppNavigator", AppNavigator);
  const nextState = AppNavigator.router.getStateForAction(action, state);

  console.log("STATE", state);
  console.log("nextState", nextState);
  return nextState || state;
}
