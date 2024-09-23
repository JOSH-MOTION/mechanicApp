import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Link } from 'expo-router';
import { getMechanics } from '../../lib/appwrite'; // Import your getMechanics function

const MapPage = () => {
  const [mechanics, setMechanics] = useState([]);
  const [region, setRegion] = useState({
    latitude: 7.75, // Centered around Ghana
    longitude: -0.5,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMechanics = async () => {
      setLoading(true);
      try {
        const fetchedMechanics = await getMechanics();
        setMechanics(fetchedMechanics);
      } catch (error) {
        setError('Failed to fetch mechanics');
      } finally {
        setLoading(false);
      }
    };

    fetchMechanics();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Mechanics Nearby</Text>
        <Link href="/profile" style={styles.button}>
          <Text style={{ color: 'white' }}>Profile</Text>
        </Link>
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <MapView
        style={{ flex: 1 }}
        region={region}
        showsUserLocation={true}
      >
        {mechanics.map((mechanic) => (
          <Marker
            key={mechanic.$id}
            coordinate={{ latitude: mechanic.latitude, longitude: mechanic.longitude }}
            title={mechanic.mechanicname}
            description={`Email: ${mechanic.mechanic_email}`} // Adjust as needed
          />
        ))}
      </MapView>

      {mechanics.length === 0 && !loading && <Text>No mechanics found.</Text>}

      <ScrollView style={styles.scrollView}>
        {mechanics.map((mechanic) => (
          <View key={mechanic.$id} style={styles.mechanicCard}>
            <Text style={styles.mechanicName}>{mechanic.mechanicname}</Text>
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
