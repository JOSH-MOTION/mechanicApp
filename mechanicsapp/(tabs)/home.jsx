// screens/HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import RegistrationForm from '../components/RegistrationForm';
import BookingForm from '../components/BookingForm';
import Chat from '../components/Chat';

const HomeScreen = () => {
    return (
        <View>
            <Text>Welcome to the Mechanics App!</Text>
            <RegistrationForm />
            <BookingForm mechanicId="123" /> {/* Replace with actual mechanic ID */}
            <Chat />
        </View>
    );
};

export default HomeScreen;
