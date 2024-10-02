import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, Button, ActivityIndicator, Modal, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Link } from 'expo-router';
import { getMechanics } from '../../lib/appwrite';

const MapPage = () => {
    const [mechanics, setMechanics] = useState([]);
    const [filteredMechanics, setFilteredMechanics] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [region, setRegion] = useState({
        latitude: 7.75,
        longitude: -0.5,
        latitudeDelta: 5,
        longitudeDelta: 5,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedMechanic, setSelectedMechanic] = useState(null);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); // State for Modal visibility

    useEffect(() => {
        const fetchMechanics = async () => {
            setLoading(true);
            try {
                const fetchedMechanics = await getMechanics();
                setMechanics(fetchedMechanics);
                setFilteredMechanics(fetchedMechanics);
                
                if (fetchedMechanics.length > 0) {
                    setNotificationVisible(true);
                    setTimeout(() => setNotificationVisible(false), 3000);
                }
            } catch (error) {
                setError('Failed to fetch mechanics. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMechanics();
    }, []);

    const handleSearch = async () => {
        if (searchQuery) {
            const fetchedMechanics = await getMechanics(searchQuery);
            setFilteredMechanics(fetchedMechanics);
        } else {
            setFilteredMechanics(mechanics);
        }
    };

    const handleMechanicSelect = (mechanic) => {
        setSelectedMechanic(mechanic);
        setModalVisible(true); // Show the modal when a mechanic is selected
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedMechanic(null);
    };

    return (
        <SafeAreaView className="flex-1 p-4 bg-white">
            <View className="flex-row justify-between items-center mb-5">
                <Text className="text-2xl font-bold">Find Mechanics Nearby</Text>
                <Link href="/profile" className="p-2 bg-blue-500 rounded">
                    <Text className="text-white">Profile</Text>
                </Link>
            </View>

            <TextInput
                className="h-10 border border-gray-400 rounded p-2 mb-5"
                placeholder="Search Mechanics..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <Button title="Search" onPress={handleSearch} />

            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text className="text-red-500">{error}</Text>}
            {notificationVisible && <Text className="absolute top-12 left-0 right-0 bg-green-500 text-white text-center p-2 rounded">Mechanics Found Nearby!</Text>}

            <MapView
                style={{ flex: 1 }}
                region={region}
                showsUserLocation={true}
            >
                {filteredMechanics.map((mechanic) => (
                    <Marker
                        key={mechanic.$id}
                        coordinate={{ latitude: mechanic.latitude, longitude: mechanic.longitude }}
                        title={mechanic.mechanicname}
                        description={`Email: ${mechanic.mechanic_email}`}
                        onPress={() => handleMechanicSelect(mechanic)}
                    />
                ))}
            </MapView>

            {filteredMechanics.length === 0 && !loading && <Text>No mechanics found.</Text>}

            {/* Modal for Mechanic Details */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View className="flex-1">
                    {selectedMechanic ? (
                        selectedMechanic.image ? (
                            // Show mechanic's image in full size if available
                            <Image 
                                source={{ uri: selectedMechanic.image }} 
                                className="w-full h-2/3"
                            />
                        ) : (
                            // Fallback to map if no image is available
                            <MapView
                                style={{ flex: 1 }}
                                initialRegion={{
                                    latitude: selectedMechanic.latitude,
                                    longitude: selectedMechanic.longitude,
                                    latitudeDelta: 0.05,
                                    longitudeDelta: 0.05,
                                }}
                                showsUserLocation={true}
                            >
                                <Marker
                                    coordinate={{ 
                                        latitude: selectedMechanic.latitude, 
                                        longitude: selectedMechanic.longitude 
                                    }}
                                    title={selectedMechanic.mechanicname}
                                    description={`Rating: ${selectedMechanic.rating}`}
                                />
                            </MapView>
                        )
                    ) : (
                        // Fallback UI while no mechanic is selected
                        <View className="flex-1 justify-center items-center">
                            <Text>Select a mechanic to see details</Text>
                        </View>
                    )}

                    {/* Mechanic Details at the bottom */}
                    {selectedMechanic && (
                        <View className="bg-white p-5 rounded-t-lg">
                            <Text className="font-bold text-lg mb-2">{selectedMechanic.mechanicname}</Text>
                            <Text className="mb-2">Rating: {selectedMechanic.rating}</Text>
                            <Button title="Book Now" onPress={() => { /* Add booking logic */ }} />
                            <Button title="Close" onPress={closeModal} />
                        </View>
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default MapPage;
