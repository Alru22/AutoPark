import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Parking Finder</Text>
      <Text style={styles.subtitle}>Find nearby parking zones easily.</Text>
      
      <Button
        title="View Map"
        onPress={() => navigation.navigate('Map')}
      />

      <Button
        title="Favorites"
        onPress={() => navigation.navigate('ParkingFavoriteScreen')}
        style={styles.favoritesButton}
      />


      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
        style={styles.settingsButton}
      />



      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  settingsButton: {
    marginTop: 10,
  },
  favoritesButton: {
    marginTop: 10,
  },
  instructions: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default HomeScreen;
