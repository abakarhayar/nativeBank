import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useApi } from "../context/ApiContext";
import Logo from "./Logo";

export default function RegisterScreen({ navigation }) {
  const apiUrl = useApi();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [solde, setSolde] = useState("");

  const clearForm = () => {
    setNom("");
    setPrenom("");
    setEmail("");
    setPassword("");
    setSolde("");
  };

  const handleSubmit = async () => {
    const user = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
      solde: solde,
    };

    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        clearForm();
        Alert.alert("Succès", "Compte créé avec succès");
        navigation.navigate("login");
      } else {
        const errorData = await response.json();
        console.error("Error adding user:", errorData);
        Alert.alert("Erreur", "Erreur lors de la création du compte");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la création du compte"
      );
    }
  };

  const handleCancel = () => {
    navigation.navigate("login");
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.textInput}
        value={nom}
        onChangeText={setNom}
        placeholder="Nom"
        placeholderTextColor="#133CB3"
      />

      <TextInput
        style={styles.textInput}
        value={prenom}
        onChangeText={setPrenom}
        placeholder="Prénom"
        placeholderTextColor="#133CB3"
      />

      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
        placeholder="test@test.com"
        keyboardType="email-address"
        placeholderTextColor="#133CB3"
      />

      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        placeholder="Mot de passe"
        secureTextEntry={true}
        placeholderTextColor="#133CB3"
      />

      <TextInput
        style={styles.textInput}
        value={solde}
        onChangeText={setSolde}
        placeholder="Solde"
        keyboardType="numeric"
        placeholderTextColor="#133CB3"
      />

      <View style={styles.buttonContainer}>
        <Button title="Connexion" onPress={handleCancel} color="#6CA5D3" />
        <Button title="Ouverture de compte" onPress={handleSubmit} color="#FE09C4" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    
    backgroundColor: "#FFFFFF", // White background
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#056177",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#056177",
  },
  textInput: {
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
    marginTop: 20,
  },
});
