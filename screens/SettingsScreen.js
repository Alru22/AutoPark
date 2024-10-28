import React from 'react';
import { View, Text, Button, Switch, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

const SettingsScreen = ({ navigation }) => {
  const [locationEnabled, setLocationEnabled] = React.useState(true);

  const toggleLocation = async () => {
    if (locationEnabled) {
      setLocationEnabled(false);
      Alert.alert('Location Disabled', 'Location access has been disabled.');
    } else {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationEnabled(true);
        Alert.alert('Location Enabled', 'Location access has been enabled.');
      } else {
        Alert.alert('Permission Denied', 'Location access is required for full functionality.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingItem}>
        <Text>Enable Location</Text>
        <Switch value={locationEnabled} onValueChange={toggleLocation} />
      </View>

      <Button
        title="Log Out"
        onPress={() => navigation.replace('Login')}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default SettingsScreen;
