import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, Button, Image } from 'react-native';
import { getCurrentUser } from '../../lib/appwrite'; // Import your getCurrentUser function
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null); // State to hold the selected image

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData); // Set the user data
          setImage(userData.profilePicture); // Set the initial profile picture if available
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Function to handle image picking
  const pickImage = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access the camera roll is required!');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update the state with the selected image
      // Here you would typically upload the new image to your server or database
      // await uploadImage(result.assets[0].uri); // Implement this function as needed
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <View className="flex items-center mb-6">
            {/* Display the selected profile image */}
            <Image
              source={image ? { uri: image } : require('../../assets/icons/profile.png')} // Fallback to default profile image
              className="w-24 h-24 rounded-full"
            />
            <Button title="Change Profile Picture" onPress={pickImage} />
          </View>

          <Text className="text-white text-3xl font-bold text-center mb-6">Profile</Text>

          {user ? (
            <View className="space-y-4">
              <View className="bg-gray-800 p-4 rounded-lg">
                <Text className="text-white text-xl font-semibold">Username:</Text>
                <Text className="text-white text-lg mt-2">{user.username}</Text>
              </View>

              <View className="bg-gray-800 p-4 rounded-lg">
                <Text className="text-white text-xl font-semibold">Email:</Text>
                <Text className="text-white text-lg mt-2">{user.email}</Text>
              </View>

              <View className="bg-gray-800 p-4 rounded-lg">
                <Text className="text-white text-xl font-semibold">Account ID:</Text>
                <Text className="text-white text-lg mt-2">{user.accountId}</Text>
              </View>
            </View>
          ) : (
            <Text className="text-white text-lg text-center mt-4">No user data found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
