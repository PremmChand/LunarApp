/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react'
import Navigation from '@navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from '@store/store';

const App = () => {
console.log(store); // Should not be undefined

  return (
    <Provider store = {store} >
      <Navigation />
    </Provider>

  );
}

export default App;
