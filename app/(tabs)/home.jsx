import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // For navigation
import { images } from '../../constants'; // Assuming you have images

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to MechanicWik</Text>
        <Link href="/profile" style={styles.profileButton}>
          <Text style={styles.profileText}>Profile</Text>
        </Link>
      </View>
      
      <TextInput 
        style={styles.searchBar}
        placeholder="Search for mechanics or services..."
      />

      <View style={styles.heroSection}>
        <Text style={styles.heroText}>Find the best mechanics near you!</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Find a Mechanic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Book a Service</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesContainer}>
        {/* Replace with actual services */}
        {['Oil Change', 'Tire Rotation', 'Brake Service'].map((service) => (
          <View key={service} style={styles.serviceCard}>
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Link href="/bookings">
          <Text style={styles.footerText}>Bookings</Text>
        </Link>
        <Link href="/messages">
          <Text style={styles.footerText}>Messages</Text>
        </Link>
        <Link href="/profile">
          <Text style={styles.footerText}>Profile</Text>
        </Link>
      </View>
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
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  servicesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  serviceText: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  footerText: {
    color: '#007BFF',
  },
});

export default HomeScreen;
