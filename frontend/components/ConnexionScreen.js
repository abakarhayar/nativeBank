import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useApi } from '../context/ApiContext'; // Importer useApi depuis votre contexte API

export default function LoginScreen() {
  const apiUrl = useApi(); // Utiliser useApi pour obtenir l'URL de l'API

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${apiUrl}/users/login`, { // Utiliser apiUrl obtenu via useApi
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Login successful!', data);
        Alert.alert('Success', 'Login successful!');
        // Redirection vers une autre page ou traitement supplémentaire si nécessaire
      } else {
        const errorData = await response.json();
        console.log('Login failed', errorData.error);
        Alert.alert('Login failed', errorData.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'An error occurred while logging in.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Adresse email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Mot de passe"
        secureTextEntry={true}
      />
      
      <Button
        title="Se connecter"
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
