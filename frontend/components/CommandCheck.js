import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Picker,
} from "react-native";
import { useApi } from "../context/ApiContext";

export default function CommandCheck() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [ibanInput, setIbanInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const apiUrl = useApi();

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
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserSelection = (iban) => {
    const selected = users.find((user) => user.iban === iban);
    if (selected) {
      setSelectedUser(selected);
      setIbanInput(iban);
    } else {
      setSelectedUser(null);
      setIbanInput("");
    }
  };

  const handlePickerChange = (itemValue) => {
    const selected = users.find((user) => user.iban === itemValue);
    if (selected) {
      setSelectedUser(selected);
      setIbanInput(itemValue);
    } else {
      setSelectedUser(null);
      setIbanInput("");
    }
  };

  const handleOrderCheckbook = async () => {
    if (!selectedUser) {
      Alert.alert("Erreur", "Veuillez sélectionner un utilisateur");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/checkbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ iban: selectedUser.iban }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(
          `Votre commande de chéquier a été effectuée et vous êtes réduit de 15 euros. Merci`
        );
        Alert.alert("Succès", data.message);
      } else {
        const errorData = await response.json();
        Alert.alert("Échec", errorData.error);
      }
    } catch (error) {
      console.error("Error ordering checkbook:", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la commande du chéquier."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Commander un chéquier</Text>
      <Text style={styles.label}>Sélectionner un utilisateur</Text>
      <Picker
        selectedValue={ibanInput}
        style={styles.picker}
        onValueChange={(itemValue) => handlePickerChange(itemValue)}
      >
        <Picker.Item label="Sélectionner un utilisateur" value="" />
        {users.map((user) => (
          <Picker.Item
            key={user.iban}
            label={`${user.nom} ${user.prenom} (${user.iban})`}
            value={user.iban}
          />
        ))}
      </Picker>
      <Text style={styles.label}>Ou Saisir l'IBAN de l'utilisateur</Text>
      <TextInput
        style={styles.input}
        value={ibanInput}
        onChangeText={(text) => handleUserSelection(text)}
        placeholder="Saisir l'IBAN de l'utilisateur"
        keyboardType="default"
      />

      <Button title="Commander" onPress={handleOrderCheckbook} />

      {successMessage !== "" && (
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
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  label: {
    marginBottom: 8,
  },
  successMessage: {
    marginTop: 10,
    color: "green",
    fontSize: 16,
    textAlign: "center",
  },
});
