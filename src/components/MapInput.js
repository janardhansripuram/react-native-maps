import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

function MapInput(props) {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2} // minimum length of text to search
      autoFocus={true}
      returnKeyType={'search'} // Can be left out for default return key
      listViewDisplayed={'auto'} // true/false/undefined
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log('local searched', data.structured_formatting.main_text);
        props.notifyChange(details.geometry.location, data);
      }}
      query={{
        key: 'AIzaSyD1UHf9V-IQrASaZn4vTB074LYLFOpNWSw',
        language: 'en',
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      debounce={300}
      styles={{
        textInputContainer: props.styles,
        textInput: {
          borderRadius: 50,
        },
      }}
    />
  );
}
export default MapInput;
