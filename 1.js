import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,

  View,
  Text,
  StatusBar,
} from 'react-native';



import MapView, { PROVIDER_GOOGLE, Marker, Heatmap, Circle, Polyline, Polygon } from 'react-native-maps'

import { locations } from './data'


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 24.966762,
            longitude: 121.264628,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          }}
        >
          {
            locations.map(marker => (
              <Marker
              coordinate = {{latitude: marker.latitude,
                longitude: marker.longitude}}
                title = {marker.title}
              />
            ))
          }

        </MapView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  map: {
    flex: 1
  }
})