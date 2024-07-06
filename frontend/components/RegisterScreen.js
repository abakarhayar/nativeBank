import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useApi } from "../context/ApiContext";

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
      <Text style={styles.title}>Créer un compte</Text>

      <Text>Nom</Text>
      <TextInput
        style={styles.textInput}
        value={nom}
        onChangeText={setNom}
        placeholder="Nom"
      />

      <Text>Prénom</Text>
      <TextInput
        style={styles.textInput}
        value={prenom}
        onChangeText={setPrenom}
        placeholder="Prénom"
      />

      <Text>Email</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
        placeholder="test@test.com"
        keyboardType="email-address"
      />

      <Text>Mot de passe</Text>
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        placeholder="Mot de passe"
        secureTextEntry={true}
      />

      <Text>Solde</Text>
      <TextInput
        style={styles.textInput}
        value={solde}
        onChangeText={setSolde}
        placeholder="Solde"
        keyboardType="numeric"
      />

      <Button title="Ouverture de compte" onPress={handleSubmit} />
      <Button title="Connexion" onPress={handleCancel} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textInput: {
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
