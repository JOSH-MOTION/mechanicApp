// components/RegistrationForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { registerMechanic } from '../api/api';
import { useAuth } from '../context/AuthContext';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleRegister = async () => {
        try {
            const response = await registerMechanic({ name, email, password });
            login(response.data); // Assuming the API returns user data
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <View>
            <TextInput placeholder="Name" onChangeText={setName} />
            <TextInput placeholder="Email" onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

export default RegistrationForm;
