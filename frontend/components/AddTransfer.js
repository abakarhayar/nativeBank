import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker,
  Alert,
} from "react-native";
import { useApi } from "../context/ApiContext";
import { useUser } from "../context/UserContext";
import Logo from "./Logo";

export default function AddTransfer({ route, navigation }) {
  const { successMessage } = route.params || {};
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [ibanInput, setIbanInput] = useState("");
  const [amount, setAmount] = useState("");
  const [alertMessage, setAlertMessage] = useState(successMessage || "");
  const apiUrl = useApi();
  const { user, setUser } = useUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

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

  const handleSubmit = async () => {
    if (!selectedUser || !amount) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    const transferData = {
      sender_iban: user.iban,
      receiver_iban: selectedUser.iban,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch(`${apiUrl}/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(transferData),
      });
      if (response.ok) {
        const data = await response.json();
        const updatedUser = { ...user, solde: user.solde - parseFloat(amount) };
        setUser(updatedUser);
        const message = `Virement de ${amount} euros effectué avec succès à ${selectedUser.nom} ${selectedUser.prenom}`;
        setAmount("");
        navigation.navigate("ProfileScreen", { successMessage: message });
      } else {
        const errorData = await response.json();
        Alert.alert("Échec", errorData.error);
      }
    } catch (error) {
      console.error("Error making transfer:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors du virement");
    }
  };

  return (
    <View style={styles.container}>
      {alertMessage !== "" && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertMessage}>{alertMessage}</Text>
        </View>
      )}
      <Logo />
      <Text style={styles.title}>Effectuer un virement</Text>

      <Picker
        selectedValue={ibanInput}
        style={styles.picker}
        onValueChange={handlePickerChange}
      >
        <Picker.Item label="-- Sélectionner un destinataire --" value="" />
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
        value={amount}
        onChangeText={setAmount}
        placeholder="Montant"
        keyboardType="numeric"
        placeholderTextColor="#133CB3"
      />

      <Button
        title="Effectuer le virement"
        onPress={handleSubmit}
        color="#FE09C4"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
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
  input: {
    height: 40,
    borderColor: "#056177",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#056177",
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
  alertContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#FE09C4",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  alertMessage: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
