import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "../context/UserContext";
import Logo from "./Logo";

export default function ProfileScreen({ route, navigation }) {
  const { user } = useUser();
  const [successMessage, setSuccessMessage] = useState("");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  useEffect(() => {
    if (route.params?.successMessage) {
      setSuccessMessage(route.params.successMessage);
      setShowWelcomeMessage(true);
    }
  }, [route.params?.successMessage]);

  useEffect(() => {
    if (showWelcomeMessage) {
      const timer = setTimeout(() => {
        setShowWelcomeMessage(false);
        setSuccessMessage("");
        navigation.setParams({ successMessage: null });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeMessage]);

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Mon compte </Text>
      {showWelcomeMessage && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeMessage}>{successMessage}</Text>
        </View>
      )}
      {user ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Nom: {user.nom}</Text>
          <Text style={styles.dataText}>Prénom: {user.prenom}</Text>
          <Text style={styles.dataText}>Email: {user.email}</Text>
          <Text style={styles.dataText}>IBAN: {user.iban}</Text>
          <Text style={styles.dataText}>Solde: {user.solde}€</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Chargement des informations...</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CommandCheck")}
      >
        <Text style={styles.buttonText}>Demander un chéquier</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddTransfer")}
      >
        <Text style={styles.buttonText}>Effectuer un virement</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#056177",
    textAlign: "center",
    textTransform: "uppercase",
  },
  dataContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#056177",
    padding: 10,
    width: "100%",
    borderRadius: 5,
    marginBottom: 20,
  },
  dataText: {
    color: "#056177",
    fontSize: 16,
    marginBottom: 10,
  },
  loadingText: {
    color: "#056177",
    fontSize: 16,
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
  welcomeContainer: {
    marginBottom: 20,
    backgroundColor: "#DFF2BF",
    borderWidth: 1,
    borderColor: "#4F8A10",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  welcomeMessage: {
    color: "#4F8A10",
    fontSize: 16,
  },
});
