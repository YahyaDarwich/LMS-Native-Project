import * as React from "react";
import { Appbar } from "react-native-paper";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
const AppBar = () => (
  <Appbar.Header style={styles.container}>
    <Appbar.Content title="LMS System" />
    <Appbar.Action icon="magnify" onPress={() => {}} />
    <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
  </Appbar.Header>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
  },
});

export default AppBar;
