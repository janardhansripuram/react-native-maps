import React from 'react';
import MapView, {Marker} from 'react-native-maps';

const MyMapView = props => {
  return (
    <MapView
      style={{flex: 1}}
      region={props.region}
      showsUserLocation={true}
      onRegionChange={reg => props.onRegionChange(reg)}
      scrollEnabled={false}
      zoomEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}
      >
      <Marker coordinate={props.region} />
    </MapView>
  );
};
export default MyMapView;
