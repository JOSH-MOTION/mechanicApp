import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { getCurrentUser } from '../../lib/appwrite'; // Import your getCurrentUser function
import { Image } from 'react-native';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData); // Set the user data
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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
            {/* Placeholder Profile Image */}
            <Image
              source={require('../../assets/icons/profile.png')} // Your default profile image
              className="w-24 h-24 rounded-ful"
            />
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
