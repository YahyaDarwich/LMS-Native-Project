import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Reports() {
  return (
    <View>
      <Text style={styles.Text}>Reports</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  Text: {
    fontWeight: "bold",
  },
});
