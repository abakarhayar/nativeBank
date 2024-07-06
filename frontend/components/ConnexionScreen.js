import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useApi } from '../context/ApiContext';

export default function LoginScreen({ navigation }) {
  const apiUrl = useApi(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleRegister = () => {
    navigation.navigate('RegisterScreen'); 
  };

  const handleSubmit = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${apiUrl}/users/login`, {
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
        navigation.navigate('AddTransfer', { successMessage: 'Connexion réussie!' });
      } else {
        const errorData = await response.json();
        console.log('Login failed', errorData.error);
        setErrorMessage(errorData.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred while logging in.');
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

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
        title="S'inscrire"
        onPress={handleRegister}
      />
      
      <Button
        title="Se connecter"
        onPress={handleSubmit}
      />

      {errorMessage !== '' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      )}
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
  errorContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  errorMessage: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
