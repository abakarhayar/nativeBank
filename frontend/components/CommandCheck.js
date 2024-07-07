import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Picker,
  TouchableOpacity,
} from "react-native";
import { useApi } from "../context/ApiContext";
import { useUser } from "../context/UserContext";
import Logo from "./Logo";
import UserInfo from "./UserInfo";

export default function CommandCheck({ navigation }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [ibanInput, setIbanInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user, setUser } = useUser();
  const apiUrl = useApi();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

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

  const handleOrderCheckbookForSelf = async () => {
    try {
      const response = await fetch(`${apiUrl}/checkbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ iban: user.iban }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedUser = { ...user, solde: user.solde - 15 };
        setUser(updatedUser);
        navigation.navigate("ProfileScreen", {
          successMessage: "Commande de chéquier effectuée avec succès",
        });
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

  const handleOrderCheckbookForOther = async () => {
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
          `Commande de chéquier pour ${selectedUser.nom} ${selectedUser.prenom} effectuée avec succès`
        );
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
      <Logo style={styles.logo} />
      <Text style={styles.title}>Commander un chéquier</Text>
      {user ? (
        <>
          <UserInfo user={user} />
          <TouchableOpacity
            style={styles.button}
            onPress={handleOrderCheckbookForSelf}
          >
            <Text style={styles.buttonText}>
              Demander un chéquier pour moi-même
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loadingText}>Chargement des informations...</Text>
      )}
      <View style={styles.check}>
        <Text style={styles.commande}>
          Commander un chéquier pour un autre utilisateur
        </Text>
        <Picker
          selectedValue={ibanInput}
          style={styles.picker}
          onValueChange={handlePickerChange}
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
          onChangeText={handleUserSelection}
          placeholder="Saisir l'IBAN de l'utilisateur"
          placeholderTextColor="#133CB3"
          keyboardType="default"
        />
        <Button
          title="Commander pour un autre utilisateur"
          onPress={handleOrderCheckbookForOther}
          color="#FE09C4"
        />
      </View>

      {successMessage !== "" && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.successMessage}>{successMessage}</Text>
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
  successMessage: {
    color: "#4F8A10",
    fontSize: 16,
  },
  welcomeContainer: {
    marginTop: 10,
    backgroundColor: "#DFF2BF",
    borderWidth: 1,
    borderColor: "#4F8A10",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#056177",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  check: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#056177",
    padding: 10,
    width: "100%",
    borderRadius: 5,
    marginBottom: 20,
  },
  commande: {
    color: '#056177',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'right',
    
  },
  loadingText: {
    color: "#056177",
    fontSize: 16,
  },
});
