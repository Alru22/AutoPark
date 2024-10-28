import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { fetchParkingData } from '../services/parkingService';
import { getRoute } from '../services/routeService.js'; // Rute-funktionen

const MapScreen = () => {
  const [location, setLocation] = useState(null); // Brugers placering
  const [parkingSpots, setParkingSpots] = useState([]); // Parkeringspladser
  const [routeCoordinates, setRouteCoordinates] = useState([]); // Rute-koordinater

  useEffect(() => {
    (async () => {
      // Spørg om tilladelse til lokation
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Adgang til lokation blev nægtet');
        return;
      }

      // Hent brugers lokation
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      // Hent parkeringsdata
      const parkingData = await fetchParkingData(
        userLocation.coords.latitude,
        userLocation.coords.longitude
      );
      setParkingSpots(parkingData || []);
    })();
  }, []);

  // Funktion til at dekode polyline fra Google API
  function decodePolyline(encoded) {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;
  
    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += deltaLat;
  
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += deltaLng;
  
      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  }
  
  // Beregn ruten fra brugers placering til destination
  const calculateRoute = async () => {
    if (!location) return;
  
    const destinationCoordinates = "55.67488269862025,12.567662625205166"; // Destination
    const route = await getRoute(location.latitude, location.longitude, destinationCoordinates);
  
    if (route && route.overview_polyline) {
      const routePoints = decodePolyline(route.overview_polyline.points);
      setRouteCoordinates(routePoints);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {/* Marker for brugers placering */}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Du er her"
            />

            {/* Vis parkeringssteder */}
            {parkingSpots && parkingSpots.map((spot, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: spot.position[0],
                  longitude: spot.position[1],
                }}
                title={spot.title}
                description={`Operatør: ${spot.vicinity || 'N/A'}`}
              />
            ))}

            {/* Tegn ruten på kortet */}
            {routeCoordinates.length > 0 && (
              <Polyline coordinates={routeCoordinates} strokeColor="#007AFF" strokeWidth={4} />
            )}
          </MapView>

          <Button title="Beregn Rute til Destination" onPress={calculateRoute} />
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
});

export default MapScreen;
