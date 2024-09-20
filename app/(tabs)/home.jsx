import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Link } from 'expo-router'; // For navigation
import { getCurrentUser } from '../../lib/appwrite'; // Assuming you're using the Appwrite function to fetch user
import { images } from '../../constants'; // Assuming you have images imported for services

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser(); // Fetch current user
        setUser(currentUser); // Set the user state with the fetched user details
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false); // Stop loading after fetching user data
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 bg-white">
      {/* Header with Welcome Message */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-xl font-bold">
          {user ? `Welcome, ${user.username}` : 'Welcome to MechanicWik'}
        </Text>
        <Link href="/profile" className="p-2 bg-blue-500 rounded">
          <Text className="text-white">Profile</Text>
        </Link>
      </View>

      {/* Search Bar */}
      <TextInput 
        className="h-10 border border-gray-300 rounded px-3 mb-5"
        placeholder="Search for mechanics or services..."
      />

      {/* Hero Section */}
      <View className="items-center mb-5">
        <Text className="text-lg mb-3">Find the best mechanics near you!</Text>
        <View className="flex-row justify-between w-full">
          <TouchableOpacity className="flex-1 bg-blue-500 py-3 rounded mx-1 items-center">
            <Text className="text-white">Find a Mechanic</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-blue-500 py-3 rounded mx-1 items-center">
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
          <View key={service.name} className="bg-gray-200 p-5 rounded-lg mr-3 items-center">
            {/* Service Image */}
            <Image source={service.image} className="w-24 h-24 mb-3" />
            <Text className="font-bold">{service.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
