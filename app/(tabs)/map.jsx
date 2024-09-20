import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Link } from 'expo-router';

const MapPage = () => {
  const [mechanics, setMechanics] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Fetch mechanics data (replace with your data fetching logic)
  useEffect(() => {
    // Example data
    const fetchedMechanics = [
      { id: 1, name: 'Joe’s Garage', latitude: 37.78825, longitude: -122.4324, rating: 4.5 },
      { id: 2, name: 'Speedy Mechanics', latitude: 37.78875, longitude: -122.4354, rating: 4.0 },
      // Add more mechanics as needed
    ];
    setMechanics(fetchedMechanics);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Mechanics Nearby</Text>
        <Link href="/profile" style={styles.profileButton}>
          <Text style={styles.profileText}>Profile</Text>
        </Link>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search location..."
      />

      <MapView
        style={styles.map}
        initialRegion={region}
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

      <ScrollView style={styles.listContainer}>
        {mechanics.map((mechanic) => (
          <View key={mechanic.id} style={styles.mechanicCard}>
            <Text style={styles.mechanicName}>{mechanic.name}</Text>
            <Text style={styles.mechanicRating}>Rating: {mechanic.rating}</Text>
            <Button title="Book Now" onPress={() => { /* Booking logic here */ }} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  profileText: {
    color: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  map: {
    flex: 1,
    marginBottom: 20,
  },
  listContainer: {
    maxHeight: 200,
  },
  mechanicCard: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  mechanicName: {
    fontWeight: 'bold',
  },
  mechanicRating: {
    marginBottom: 5,
  },
});

export default MapPage;
