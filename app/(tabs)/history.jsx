import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { getBookings } from '../../lib/appwrite'; // Assuming you have a function to fetch bookings
import { StatusBar } from 'expo-status-bar';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings when the page loads
    const fetchBookings = async () => {
      try {
        const result = await getBookings(); // Fetch bookings from the database
        setBookings(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-xl text-black font-bold mb-4">Your Bookings</Text>

          {/* Iterate through bookings */}
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <TouchableOpacity
                key={booking.id}
                className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm"
              >
                <View>
                  <Text className="text-lg font-semibold text-gray-800">
                    Mechanic: {booking.mechanicName}
                  </Text>
                  <Text className="text-sm text-gray-600">Service: {booking.service}</Text>
                  <Text className="text-sm text-gray-600">Date: {booking.date}</Text>
                  <Text className="text-sm text-gray-600">Status: {booking.status}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-center text-gray-500">No bookings found</Text>
          )}
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Bookings;
