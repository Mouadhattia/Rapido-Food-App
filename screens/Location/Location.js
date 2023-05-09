import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {TextButton} from '../../components';
import PermissionsAndroid from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {getLocation} from '../../stores/map/mapActions';
import MapView, {Marker} from 'react-native-maps';
import {SIZES} from '../../constants';
function Location() {
  const dispatch = useDispatch();
  const {location} = useSelector(state => state.mapReducer);

  const [error, setError] = useState(null);
  const getCurrentPosition = async () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        dispatch(getLocation(position));
      },
      error => {
        console.warn(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  
  return (
    <View style={{width: SIZES.width}}>
      {/* {location ? (
        <Text>Latitude: {location.coords.latitude}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
      {error && <Text>Error: {error.message}</Text>} */}
      <TextButton
        buttonContainerStyle={{
          height: 60,
          marginTop: 2,
          borderRadius: 1,
          backgroundColor: 'red',
          width: '48%',
        }}
        label="location"
        onPress={() => getCurrentPosition()}
      />
      {/* <MapView
        style={{width: SIZES.width}}
        initialRegion={{
          latitude: location?.coords?.accuracy?.latitude || 20,
          longitude: location?.coords?.accuracy?.longitude || 20,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: location?.coords?.accuracy?.latitude || 20,
            longitude: location?.coords?.accuracy?.longitude || 20,
          }}
          title="My Location"
        />
      </MapView> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
export default Location;
