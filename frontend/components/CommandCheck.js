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
import Logo from "./Logo";

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
      <Logo style={styles.logo}/>
      <Text style={styles.title}>Commander un chéquier</Text>
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
      <TextInput
        style={styles.input}
        value={ibanInput}
        readOnly={selectedUser !== null}
        onChangeText={(text) => handleUserSelection(text)}
        placeholder="Saisir l'IBAN de l'utilisateur"
        placeholderTextColor="#133CB3"
        keyboardType="default"
      />

      <Button title="Commander" onPress={handleOrderCheckbook} color="#FE09C4" />

      {successMessage !== "" && (
        <Text style={styles.successMessage}>{successMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  input: {
    height: 40,
    borderColor: "#056177",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#056177",
    borderRadius: 5,
    width: "100%",
  },
  picker: {
    height: 40,
    borderColor: "#056177",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    color: "#056177",
    width: "100%",
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
    marginBottom: 8,
    color: "#056177",
    fontSize: 16,
  },
  successMessage: {
    marginTop: 10,
    color: "#056177",
    fontSize: 16,
    textAlign: "center",
  },
});
