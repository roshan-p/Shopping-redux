/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Shopping from './src/components/Shopping'
import reducer from './src/reducers'

store = createStore(reducer)
class App extends Component {
  componentWillMount() {
  
  }

  render() {

    return (
    
      <Provider store={store} >
        <View>
          <Shopping />
        </View>
      </Provider>

    );
  }
};

const styles = StyleSheet.create({

});

export default App;
