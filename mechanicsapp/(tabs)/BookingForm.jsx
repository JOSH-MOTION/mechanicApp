// components/BookingForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { bookService } from '../api/api';

const BookingForm = ({ mechanicId }) => {
    const [serviceDetails, setServiceDetails] = useState('');

    const handleBook = async () => {
        try {
            await bookService({ mechanicId, serviceDetails });
            alert('Booking successful!');
        } catch (error) {
            console.error('Booking failed:', error);
        }
    };

    return (
        <View>
            <TextInput placeholder="Service Details" onChangeText={setServiceDetails} />
            <Button title="Book Now" onPress={handleBook} />
        </View>
    );
};

export default BookingForm;
