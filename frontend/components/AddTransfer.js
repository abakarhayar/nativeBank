import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { useApi } from '../context/ApiContext';

export default function AddTransaction({ navigation }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [amount, setAmount] = useState('');
    const apiUrl = useApi();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/users`);
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async () => {
        if (!selectedUser || !amount) {
            console.error('Please fill all the fields');
            return;
        }

        const transferData = {
            sender_iban: 'YOUR_SENDER_IBAN',  
            receiver_iban: selectedUser.iban,
            amount: parseFloat(amount),
        };

        try {
            const response = await fetch(`${apiUrl}/api/transfer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(transferData),
            });
            if (response.ok) {
                console.log('Transfer successful');
                // Clear form or navigate to another screen if needed
            } else {
                const errorData = await response.json();
                console.error('Error making transfer:', errorData);
            }
        } catch (error) {
            console.error('Error making transfer:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Effectuer un virement</Text>

            <Text>Destinataire</Text>
            <Picker
                selectedValue={selectedUser}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedUser(itemValue)}
            >
                <Picker.Item label="Sélectionner un destinataire" value="" />
                {users.map((user) => (
                    <Picker.Item key={user.iban} label={`${user.nom} ${user.prenom}`} value={user} />
                ))}
            </Picker>

            <Text>Montant</Text>
            <TextInput
                style={styles.textInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="Montant"
                keyboardType="numeric"
            />

            <Button title="Effectuer le virement" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    textInput: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
});
