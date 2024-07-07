import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";

export default function Logo() {
  return (
    <View>
      <Image source={require("../assets/logo.png")} style={styles.logoImage} />
      <Text style={styles.logoText}>NativeBank</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#056177",
    textAlign: "center",
    marginBottom: 50,
  },
});
// mail@test.com
