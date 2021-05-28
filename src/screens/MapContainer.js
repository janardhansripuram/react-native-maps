import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import MapInput from '../components/MapInput';
import MyMapView from '../components/MapView';
import {getLocation, geocodeLocationByName} from '../services/location-service';
import * as appActions from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';

function MapContainer(props) {
  const [region, setregion] = useState({});
  const [previousSearches, setPreviousSearches] = useState([]);
  const savedSearches = useSelector(state => state.mapsReducer.saveSearches);
  const dispatch = useDispatch();

  useEffect(() => {
    getInitialState();
  }, []);

  function getInitialState() {
    getLocation().then(data => {
      console.log(data);
      setregion({
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      });
    });
  }

  function getCoordsFromName(loc, data) {
    console.log('loc', loc);
    const location = {
      description: data.structured_formatting.main_text,
      latitude: loc.lat,
      longitude: loc.lng,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    };
    setregion(location);
    previousSearches.push(location);
    dispatch(appActions.saveSearches(location));
  }

  function onMapRegionChange(reg) {
    setregion(reg);
  }
  function selectedItem(item) {
    setregion(item);
  }

  return (
    <View style={{flex: 1}}>
      {region.latitude ? (
        <View style={{flex: 1}}>
          <MyMapView
            region={region}
            onRegionChange={reg => onMapRegionChange(reg)}
          />
        </View>
      ) : null}
      <View style={styles.searchBox}>
        <MapInput
          notifyChange={(loc, data) => getCoordsFromName(loc, data)}
          styles={styles.searchComp}
        />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0,
        }}>
        {savedSearches.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.chipsItem}
            onPress={() => selectedItem(category)}>
            <Text>{category.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    // backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 50,
    elevation: 20,
    zIndex: 9999,
  },
  searchComp: {
    borderRadius: 50,
    padding: 10,
    //shadowColor: '#ccc',
    //shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    // shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: 100,
    paddingHorizontal: 2,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    //elevation: 10,
    alignItems: 'center',
  },
});

export default MapContainer;
