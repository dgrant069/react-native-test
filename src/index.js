/**
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './data/store';
import AppRouter from './router';

class nativeTest extends React.Component {
  store = configureStore();

  render() {
    return (
      <Provider store={this.store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default nativeTest;
