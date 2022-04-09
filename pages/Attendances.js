import React, { component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Attendances() {
  return (
    <View>
      <Text style={styles.Text}>Attendances</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontWeight: "bold",
  },
});
