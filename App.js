import * as React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import * as Location from "expo-location";

export default function App() {

  const [pin, setPin] = React.useState({
    latitude: 25.634463877246645,
    longitude: 85.11320148460494,
  });
  React.useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);


    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 25.634463877246645,
          longitude: 85.11320148460494,

        }}
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          console.log("onUserLocationChange", e.nativeEvent.coordinate);

          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });

        }}
      >
        <Marker
          coordinate={pin}
          title="first title"
          description="test description"
          pinColor='tomato'
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate)
          }}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent.coordinate)


          }}
        >
          <Callout>
            <Text> Roshan marker</Text>
          </Callout>
        </Marker>
        <Circle
          center={pin}
          radius={1}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
