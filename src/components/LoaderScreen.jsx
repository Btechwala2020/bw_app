import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function LoaderScreen({ text = "Loading..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#22c55e" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#9ca3af",
    marginTop: 14,
    fontSize: 14,
  },
});
