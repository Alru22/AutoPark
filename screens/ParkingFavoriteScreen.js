import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Liste over adresser, som brugeren kan vælge som favoritter. I fremtiden vil disse hentes fra en API fra HERE maps, så man kan vælge fra en dynamisk liste af parkeringsfirmaer. Men for nu er det en statisk liste.
const companies = [
  "Industriens hus", 
  "Studiegade", 
  "Lavendelstræde", 
  "Vester Voldgade", 
  "Dantes Plads", 
  "Ved Glyptotektet", 
  "Ny Vestergade", 
  "Q-Park Illum"
];

const ParkingFavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]); // Til at gemme favoritter

  // Kør funktionen ved første render for at hente gemte favoritter
  useEffect(() => {
    loadFavorites();
  }, []);

  // Henter gemte favoritter fra AsyncStorage
  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites)); // Konverter JSON-string til array
      }
    } catch (error) {
      console.error('Fejl ved indlæsning af favoritter:', error);
    }
  };

  // Tilføjer eller fjerner et firma fra favoritter og gemmer det i AsyncStorage
  const toggleFavorite = async (company) => {
    const updatedFavorites = favorites.includes(company)
      ? favorites.filter(item => item !== company) // Fjerner hvis det allerede er favorit
      : [...favorites, company]; // Tilføjer hvis det ikke er favorit

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Gemmer opdateret favoritliste
  };

  return (
    <View>
      {/* Viser listen over firmaer med mulighed for at tilføje/fjerne som favorit */}
      <FlatList
        data={companies}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.item}>
            <Text style={{ fontWeight: favorites.includes(item) ? 'bold' : 'normal' }}>
              {item} {favorites.includes(item) ? '★' : '☆'} {/* Stjerne ved favorit */}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ParkingFavoriteScreen;
