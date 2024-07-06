import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useApi } from '../context/ApiContext'; // Importer useApi depuis votre contexte ApiContext

const TestRoute = () => {
    const [responseData, setResponseData] = useState(null);
    const apiUrl = useApi(); // Utiliser useApi pour obtenir l'URL de votre API

    const handleTestRoute = async () => {
        try {
            const response = await fetch(apiUrl + '/test', { // Utiliser l'URL de l'API obtenue depuis useApi
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Ajoutez des headers supplémentaires si nécessaire
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResponseData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Failed to fetch data. Please try again later.');
        }
    };

    useEffect(() => {
        // Appeler la fonction pour charger les données au montage du composant
        handleTestRoute();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Test Route</Text>
            {responseData ? (
                <View style={styles.dataContainer}>
                    <Text>Status: {responseData.status}</Text>
                    <Text>Message: {responseData.message}</Text>
                    <Text>Data: {JSON.stringify(responseData.data)}</Text>
                </View>
            ) : (
                <Text>Loading...</Text>
            )}
            <Button title="Reload Data" onPress={handleTestRoute} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dataContainer: {
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        width: '100%',
    },
});

export default TestRoute;
