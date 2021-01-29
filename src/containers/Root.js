import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from './App';

const store = configureStore();

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}