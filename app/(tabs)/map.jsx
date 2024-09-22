import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Link } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants';

const MapPage = () => {
  const [mechanics, setMechanics] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const geopifyApiKey = Constants.expoConfig.extra.geopifyApiKey; // Get API key from environment

  // Fetch mechanics based on search location
  const fetchMechanics = async (location) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.geopify.com/v1/geocode/autocomplete?text=${location}&apiKey=${geopifyApiKey}`
      );
      
      const fetchedMechanics = response.data.features.map((feature, index) => ({
        id: index,
        name: feature.properties.formatted,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
        rating: (Math.random() * 3 + 2).toFixed(1), // Dummy rating
      }));
      setMechanics(fetchedMechanics);

      // Set map region to the first mechanic's location
      if (fetchedMechanics.length > 0) {
        setRegion({
          latitude: fetchedMechanics[0].latitude,
          longitude: fetchedMechanics[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error('Error fetching mechanics:', error);
      setError('Failed to fetch mechanics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchMechanics(searchQuery);
    } else {
      setError('Please enter a location to search.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Mechanics Nearby</Text>
        <Link href="/profile" style={styles.button}>
          <Text style={{ color: 'white' }}>Profile</Text>
        </Link>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search location..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <MapView
        style={{ flex: 1 }}
        region={region}
        showsUserLocation={true}
      >
        {mechanics.map((mechanic) => (
          <Marker
            key={mechanic.id}
            coordinate={{ latitude: mechanic.latitude, longitude: mechanic.longitude }}
            title={mechanic.name}
            description={`Rating: ${mechanic.rating}`}
          />
        ))}
      </MapView>

      {mechanics.length === 0 && !loading && <Text>No mechanics found. Try another location.</Text>}

      <ScrollView style={styles.scrollView}>
        {mechanics.map((mechanic) => (
          <View key={mechanic.id} style={styles.mechanicCard}>
            <Text style={styles.mechanicName}>{mechanic.name}</Text>
            <Text style={styles.mechanicRating}>Rating: {mechanic.rating}</Text>
            <Button title="Book Now" onPress={() => { /* Add booking logic */ }} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 20 },
  button: { padding: 8, backgroundColor: 'blue', borderRadius: 8 },
  scrollView: { maxHeight: 200 },
  mechanicCard: { backgroundColor: '#e0e0e0', padding: 16, borderRadius: 8, marginBottom: 8 },
  mechanicName: { fontWeight: 'bold' },
  mechanicRating: { marginBottom: 8 },
};

export default MapPage;
