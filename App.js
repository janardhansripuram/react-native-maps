/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import configureStore from './src/store/index';
import MapContainer from './src/screens/MapContainer';
import {PersistGate} from 'redux-persist/es/integration/react';
const {persistor, store} = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({region});
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          {/* <MapList onRegionChange={this.onRegionChange.bind(this)} /> */}
          {/* <View style={styles.container}> */}
          <MapContainer />
          {/* </View> */}
        </PersistGate>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
  },
});
