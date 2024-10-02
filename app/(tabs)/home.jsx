import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Link, router } from 'expo-router'; // For navigation
import { getCurrentUser, getMechanics, logout } from '../../lib/appwrite'; // Function to fetch mechanics and logout
import { images } from '../../constants'; // Assuming you have images imported for services
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mechanics, setMechanics] = useState([]);
  const [originalMechanics, setOriginalMechanics] = useState([]); // New state to hold the original mechanics list

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
        setOriginalMechanics(allMechanics); // Store the original mechanics list
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

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours >= 12 && hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleSearch = (text) => {
    // Filter mechanics based on search input
    const filteredMechanics = originalMechanics.filter(mechanic => 
      mechanic.mechanicname.toLowerCase().includes(text.toLowerCase())
    );
    setMechanics(filteredMechanics); // Update the mechanics state with filtered results
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="p-5">
        {/* Header with Greeting Message, Profile Icon, and Signout Button */}
        <View className="flex-row items-center mb-5">
          {/* Profile Image (Rounded Avatar) */}
          <Link href="/profile" className="p-2">
            <Image 
              source={{ uri: user?.avatar || 'https://via.placeholder.com/150' }} 
              className="w-12 h-12 rounded-full mr-4" 
            />
          </Link>
          {/* Greeting and Username */}
          <View>
            <Text className="text-xl font-bold">{getGreeting()}</Text>
            <Text className="text-lg ">{user?.username || 'Guest'}</Text>
          </View>
          {/* Signout Icon */}
          <TouchableOpacity onPress={handleSignOut} className="ml-auto p-2">
            <FontAwesomeIcon icon={faSignOutAlt} size={24} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TextInput 
          className="h-15 border border-gray-400 rounded-lg p-2 mb-5 text-white bg-gray-800"
          placeholder="Search for mechanics or services..."
          placeholderTextColor="#aaa"
          onChangeText={handleSearch} // Use the new handleSearch function
        />

        {/* Landscape Image */}
        <View className="mb-5">
          <Image 
            source={images.mecha}
            className="w-full h-60 object-cover rounded-lg"
          />
        </View>

        {/* Car Type Logos Section */}
        <View className="mb-5">
          <Text className="text-lg mb-2">Car Types</Text>
          <View className="flex-row flex-wrap justify-between">
            {[
              { name: 'Volkswagen', image: images.Volkswagen },
              { name: 'HYUNDAI', image: images.cars },
              { name: 'Chevrolet', image: images.Chevrolet },
              { name: 'BMW', image: images.bmw },
              { name: 'Honda', image: images.honda },
              { name: 'Benz', image: images.Benz },
              { name: 'Toyota', image: images.toyota },
              { name: 'Nissan', image: images.nissan },
              { name: 'Kia', image: images.Kia },
            ].map((carType, index) => (
              <View key={index} className="w-1/4 p-2 items-center">
                <View className="bg-gray-200 p-3 rounded-full items-center w-20 h-20">
                  <Image source={carType.image} className="w-14 h-14 mb-4" resizeMode='contain'/>
                </View>
                <Text className="font-bold text-center">{carType.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
};

export default HomeScreen;
