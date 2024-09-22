import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { registerMechanic } from '../../lib/appwrite'; // Assuming this is where your registration logic is
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

const MechanicRegistration = () => {
  const [name, setName] = useState('');
  const [mechanicEmail, setMechanicEmail] = useState('');
  const [location, setLocation] = useState({ latitude: 37.78825, longitude: -122.4324 }); // Default location
  const [contact, setContact] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const geopifyApiKey = Constants.expoConfig.extra.geopifyApiKey;

  const handleLocationSearch = async () => {
    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${locationInput}&apiKey=${geopifyApiKey}`);
      const result = response.data.features[0];

      if (result) {
        const newLocation = {
          latitude: result.geometry.coordinates[1],
          longitude: result.geometry.coordinates[0],
        };
        setLocation(newLocation);
        setLocationInput(result.properties.formatted); // Optionally set the input to the formatted address
      } else {
        setErrorMessage('Location not found. Please try another search.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setErrorMessage('Error fetching location. Please try again later.');
    }
  };

  const handleRegister = async () => {
    try {
      // Ensure the email is included in the registration logic
      const mechanic = await registerMechanic(name, email, location, contact);
      console.log('Registered mechanic:', mechanic);
      // Reset fields or show success message
      setName('');
      setMechanicEmail(''); 
      setLocation({ latitude: 37.78825, longitude: -122.4324 }); // Reset to default
      setContact('');
      setLocationInput('');
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to register mechanic. Please try again.');
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="flex-1 p-5 bg-white">
          <Text className="text-2xl mb-5">Register as a Mechanic</Text>
          {errorMessage ? <Text className="text-red-500 mb-5">{errorMessage}</Text> : null}

          <TextInput
            className="border border-gray-300 p-2 mb-4 rounded"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            className="border border-gray-300 p-2 mb-4 rounded"
            placeholder="Email"  // New email input field
            value={mechanicEmail}
            onChangeText={setMechanicEmail}
            keyboardType="email-address"
          />
          <TextInput
            className="border border-gray-300 p-2 mb-4 rounded"
            placeholder="Contact Number"
            value={contact}
            onChangeText={setContact}
          />
          <TextInput
            className="border border-gray-300 p-2 mb-4 rounded"
            placeholder="Enter Location"
            value={locationInput}
            onChangeText={setLocationInput}
          />

          <Button title="Search Location" onPress={handleLocationSearch} className="text-sm font-pbold text-secondary mb-4" />

          <Text className="text-lg mb-4">Select Your Location</Text>
          <MapView
            className="w-full h-72 mb-5"
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={(e) => {
              setLocation(e.nativeEvent.coordinate);
              setLocationInput(''); // Clear input when map is pressed
            }}
          >
            <Marker
              coordinate={location}
              title={name || 'Your Location'}
            />
          </MapView>

          <Button title="Register" onPress={handleRegister} className="text-sm font-pbold text-secondary" />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
};

export default MechanicRegistration;
