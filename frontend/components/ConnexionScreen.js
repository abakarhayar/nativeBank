import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useApi } from "../context/ApiContext";
import { useUser } from "../context/UserContext";
import Logo from "../components/Logo";

export default function LoginScreen({ navigation }) {
  const apiUrl = useApi();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleSubmit = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        Alert.alert("Success", "Login successful!");
        navigation.navigate("ProfileScreen", {
          successMessage: "Connexion réussie!",
        });
      } else {
        const errorData = await response.json();
        console.log("Login failed", errorData.error);
        setErrorMessage(errorData.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <View style={styles.container}>
      <Logo />

      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Adresse email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#133CB3"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Mot de passe"
        secureTextEntry={true}
        placeholderTextColor="#133CB3"
      />

      <View style={styles.buttonContainer}>
        <Button title="S'inscrire" onPress={handleRegister} color="#6CA5D3" />
        <Button title="Se connecter" onPress={handleSubmit} color="#FE09C4" />
      </View>

      {errorMessage !== "" && (
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#056177",
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#056177",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#056177",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  errorContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#FE09C4",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  errorMessage: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
