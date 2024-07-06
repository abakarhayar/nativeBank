import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useApi } from '../context/ApiContext';  
import Logo from './Logo';

const TestRoute = () => {
    const [responseData, setResponseData] = useState(null);
    const apiUrl = useApi();  

    const handleTestRoute = async () => {
        try {
            const response = await fetch(apiUrl + '/test', {  
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
        handleTestRoute();
    }, []);

    return (
        <View style={styles.container}>
            <Logo />
            <Text style={styles.title}>Test Route</Text>
            {responseData ? (
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>Status: {responseData.status}</Text>
                    <Text style={styles.dataText}>Message: {responseData.message}</Text>
                    <Text style={styles.dataText}>Data: {JSON.stringify(responseData.data)}</Text>
                </View>
            ) : (
                <Text style={styles.loadingText}>Loading...</Text>
            )}
            <Button title="Reload Data" onPress={handleTestRoute} color="#056177"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#056177',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    dataContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#056177',
        padding: 10,
        width: '100%',
        borderRadius: 5,
        marginBottom: 20,
    },
    dataText: {
        color: '#056177',
        fontSize: 16,
        marginBottom: 10,
    },
    loadingText: {
        color: '#056177',
        fontSize: 16,
    },
});

export default TestRoute;
