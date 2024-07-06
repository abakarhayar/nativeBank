import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, Alert } from 'react-native';
import { useApi } from '../context/ApiContext';

export default function AddTransfer({ navigation }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Utilisation de null pour initialiser selectedUser
    const [selectedSender, setSelectedSender] = useState(null); // Utilisation de null pour initialiser selectedSender
    const [ibanInput, setIbanInput] = useState(''); // State pour la saisie de l'IBAN
    const [amount, setAmount] = useState('');
    const [senderIban, setSenderIban] = useState(''); // State pour l'IBAN de l'expéditeur
    const [successMessage, setSuccessMessage] = useState(''); // State pour le message de succès
    const apiUrl = useApi(); // Assurez-vous d'utiliser correctement votre contexte API

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/users`);
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

    const handleUserSelection = (iban) => {
        const selected = users.find(user => user.iban === iban);
        if (selected) {
            setSelectedUser(selected);
            setIbanInput(iban);
        } else {
            setSelectedUser(null);
            setIbanInput('');
        }
    };

    const handlePickerChange = (itemValue) => {
        const selected = users.find(user => user.iban === itemValue);
        if (selected) {
            setSelectedUser(selected);
            setIbanInput(itemValue);
        } else {
            setSelectedUser(null);
            setIbanInput('');
        }
    };

    const handleSenderSelection = (itemValue) => {
        const selected = users.find(user => user.iban === itemValue);
        if (selected) {
            setSelectedSender(selected);
            setSenderIban(itemValue);
        } else {
            setSelectedSender(null);
            setSenderIban('');
        }
    };

    const handleSenderIbanChange = (text) => {
        setSenderIban(text);
    };

    const handleSubmit = async () => {
        if (!selectedUser || !selectedSender || !amount) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        const transferData = {
            sender_iban: senderIban,  // Utilisation de l'IBAN de l'expéditeur saisi
            receiver_iban: selectedUser.iban,
            amount: parseFloat(amount),
        };

        try {
            const response = await fetch(`${apiUrl}/transfer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(transferData),
            });
            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(`Virement de ${amount} euros effectué avec succès à ${selectedUser.nom} ${selectedUser.prenom}`);
                Alert.alert('Succès', 'Virement effectué avec succès');
                // Clear form or navigate to another screen if needed
            } else {
                const errorData = await response.json();
                Alert.alert('Échec', errorData.error);
            }
        } catch (error) {
            console.error('Error making transfer:', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors du virement');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Effectuer un virement</Text>

            <Text style={styles.label}>Sélectionner un destinataire</Text>
            <Picker
                selectedValue={ibanInput}
                style={styles.picker}
                onValueChange={(itemValue) => handlePickerChange(itemValue)}
            >
                <Picker.Item label="Sélectionner un utilisateur" value="" />
                {users.map((user) => (
                    <Picker.Item
                        key={user.iban}
                        label={`${user.nom} ${user.prenom}`}
                        value={user.iban}
                    />
                ))}
            </Picker>

            <Text style={styles.label}>Ou saisir l'IBAN du destinataire</Text>
            <TextInput
                style={styles.input}
                value={ibanInput}
                onChangeText={(text) => handleUserSelection(text)}
                placeholder="Saisissez l'IBAN du destinataire"
                keyboardType="default"
            />

            <Text style={styles.label}>Sélectionner l'IBAN de l'expéditeur</Text>
            <Picker
                selectedValue={senderIban}
                style={styles.picker}
                onValueChange={(itemValue) => handleSenderSelection(itemValue)}
            >
                <Picker.Item label="Sélectionner un utilisateur" value="" />
                {users.map((user) => (
                    <Picker.Item
                        key={user.iban}
                        label={`${user.nom} ${user.prenom}`}
                        value={user.iban}
                    />
                ))}
            </Picker>

            <Text style={styles.label}>Ou saisir l'IBAN de l'expéditeur</Text>
            <TextInput
                style={styles.input}
                value={senderIban}
                onChangeText={handleSenderIbanChange}
                placeholder="Saisissez l'IBAN de l'expéditeur"
                keyboardType="default"
            />

            <Text style={styles.label}>Montant du virement</Text>
            <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="Montant"
                keyboardType="numeric"
            />

            <Button title="Effectuer le virement" onPress={handleSubmit} />

            {/* Affichage du message de succès */}
            {successMessage !== '' && (
                <Text style={styles.successMessage}>{successMessage}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    picker: {
        height: 40,
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
    label: {
        marginBottom: 8,
    },
    successMessage: {
        marginTop: 10,
        color: 'green',
        fontSize: 16,
        textAlign: 'center',
    },
});
