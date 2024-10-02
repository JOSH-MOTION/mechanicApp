// components/Chat.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import io from 'socket.io-client';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socket = io('http://your-socket-url.com'); // Replace with your actual socket URL

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const sendMessage = () => {
        socket.emit('message', newMessage);
        setNewMessage('');
    };

    return (
        <View>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
            <TextInput value={newMessage} onChangeText={setNewMessage} />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

export default Chat;
