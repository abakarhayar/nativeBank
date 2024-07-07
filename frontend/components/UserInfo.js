import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserInfo({ user }) {
    return (
        <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Nom: {user.nom}</Text>
            <Text style={styles.dataText}>Prénom: {user.prenom}</Text>
            <Text style={styles.dataText}>Email: {user.email}</Text>
            <Text style={styles.dataText}>IBAN: {user.iban}</Text>
            <Text style={styles.dataText}>Solde: {user.solde}€</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
});
