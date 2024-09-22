import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Link, router } from 'expo-router'; // For navigation
import { getCurrentUser, getMechanics, logout } from '../../lib/appwrite'; // Function to fetch mechanics and logout
import { images } from '../../constants'; // Assuming you have images imported for services
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar'

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser(); // Fetch current user
        setUser(currentUser); // Set the user state with the fetched user details
      } catch (error) {
        console.log('Error fetching user:', error);
      } finally {
        setLoading(false); // Stop loading after fetching user data
      }
    };

    const fetchMechanics = async () => {
      try {
        const allMechanics = await getMechanics(); // Fetch all mechanics from Appwrite
        setMechanics(allMechanics); // Set the mechanics state
      } catch (error) {
        console.log('Error fetching mechanics:', error);
      }
    };

    fetchUser();
    fetchMechanics();
  }, []);

  const handleSignOut = async () => {
    try {
      await logout(); // Sign out the user
      router.replace('/sign-in'); // Redirect to sign-in page after logging out
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
        {/* Header with Welcome Message, Profile Icon and Signout Button */}
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-2xl font-bold text-white">
            {user ? `Welcome, ${user.username}` : 'Welcome to MechanicWik'}
          </Text>
          <View className="flex-row items-center">
            {/* Profile Icon */}
            <Link href="/profile" className="p-2">
              <FontAwesomeIcon icon={faUser} size={24} color="#fff" />
            </Link>
            {/* Signout Icon */}
            <TouchableOpacity onPress={handleSignOut} className="ml-5">
              <FontAwesomeIcon icon={faSignOutAlt} size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <TextInput 
          className="h-10 border border-gray-400 rounded-lg p-2 mb-5 text-white bg-gray-800"
          placeholder="Search for mechanics or services..."
          placeholderTextColor="#aaa"
        />

        {/* Hero Section */}
        <View className="items-center mb-5">
          <Text className="text-lg mb-2 text-white">Find the best mechanics near you!</Text>
          <View className="flex-row justify-between w-full">
          <TouchableOpacity
  className="flex-1 bg-secondary p-4 rounded-lg mr-2 items-center"
  onPress={() => router.push('/map')} // Navigate to the map screen
>
  <Text className="text-white">Find a Mechanic</Text>
</TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-secondary p-4 rounded-lg ml-2 items-center"
              onPress={() => console.log('Book a Service')}
            >
              <Text className="text-white">Book a Service</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Services Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
          {[
            { name: 'Oil Change', image: images.oilChange },
            { name: 'Tire Rotation', image: images.tireRotation },
            { name: 'Brake Service', image: images.brakeService },
            { name: 'Battery Replacement', image: images.batteryReplacement },
            { name: 'Car Wash', image: images.carWash },
          ].map((service) => (
            <View key={service.name} className="bg-gray-800 p-4 rounded-lg mr-2 items-center">
              {/* Service Image */}
              <Image source={service.image} className="w-20 h-20 mb-2" />
              <Text className="font-bold text-white">{service.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <StatusBar backgroundColor='#161622' 
    style='light'/>
    </SafeAreaView>
  );
};
export default HomeScreen;
